// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ForeverWave {

    uint256 totalWaves;

    // used to generate random no

    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }


    Wave[] waves;

    // to check when user last waved at us

    mapping(address => uint256) public lastWavedAt;
    
    constructor() payable {
        console.log("Greetings! Your contract is good to go!");

        // set initial seed

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        // check at least 5 mins have passed between waves

        require(lastWavedAt[msg.sender] + 5 minutes < block.timestamp, "Please Wait 5 minutes between waves");

        // update timestamp for user

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved and says: %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // generate new seed for next user

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        // 20% chance to win

        if (seed <= 20) {
            console.log("%s has won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Not enough funds in contract");

        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw funds from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);

        
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        if (totalWaves < 1) {
            console.log("We have %d waves. So sad...", totalWaves);
            return totalWaves;
        }
        else {
            console.log("We have a grand total of %d waves. Wahoo!", totalWaves);
            return totalWaves;
        }
    }
}

