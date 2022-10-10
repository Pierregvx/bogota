pragma solidity ^0.8.0;

interface Lib {
    function registerPlace(uint256 _placeType, uint256 _questType, string memory _ipfsuri) external;

    function whitelist(address user) external;
}
