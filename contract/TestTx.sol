// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

error NotOwner();

contract TestTx {
    address public immutable i_owner;

    string name = "TestTx";

    constructor() {
        i_owner = msg.sender;
    }

    event SendETH();

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

    function getContractName() public view returns (string memory) {
        return name;
    }

    function getBalanceOfCurrentContract() public view returns (uint256) {
        return address(this).balance;
    }

    // only owner can send ETH
    function sendETH() public payable onlyOwner {
        emit SendETH();
    }

    function withdraw() public onlyOwner {
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");

        require(callSuccess, "Call failed!");
    }

    receive() external payable {
        sendETH();
    }

    fallback() external payable {
        sendETH();
    }
}
