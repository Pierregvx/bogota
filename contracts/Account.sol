// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Account is ERC721 {
    address owner;
    uint96 tokenId = 0;
    struct User {
        string pseudo;
        uint256 weights;
        uint96 tokenId;
    }
    mapping(address => User) accounts;
    mapping(address => bool) whitelistStates;
    // mapping(address => uint256) weights;

    constructor() ERC721("Account", "ACC") {
        owner = msg.sender;
    }

    function createAccount(string calldata username) external {
        require(accounts[msg.sender].tokenId == 0, "Account already minted");
        _mint(msg.sender, tokenId);
        accounts[msg.sender] = User(username,100,tokenId);
        whitelistStates[msg.sender] = false;
    }

    function whitelist(address user) external {
        require(msg.sender == owner, "not owner");
        require(whitelistStates[user] == false, "already wl");
        require(accounts[user].tokenId == 0, "Account already minted");
        whitelistStates[user] = true;
    }

    function givefeedBack(
        bool isPositive,
        uint256 tokenID,
        uint96 percentage
    ) external {
        uint256 weightReviewer = accounts[msg.sender].weights;
        owner = ownerOf(tokenID);
        uint256 powerVote = (weightReviewer * percentage) / 10000;
        accounts[owner].weights = isPositive
            ? accounts[owner].weights + powerVote
            : accounts[owner].weights > powerVote
            ? accounts[owner].weights - powerVote
            : 0;
    }
}
