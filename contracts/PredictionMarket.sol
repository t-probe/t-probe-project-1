// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PredictionMarket {
    struct Market {
        string question;
        uint256 yesShares;
        uint256 noShares;
        uint256 endTime;
        bool resolved;
        bool outcome;
    }

    address public owner;
    Market[] public markets;

    mapping(uint256 => mapping(address => uint256)) public yesBets;
    mapping(uint256 => mapping(address => uint256)) public noBets;

    event MarketCreated(uint256 marketId, string question, uint256 endTime);
    event BetPlaced(uint256 marketId, address better, bool betOnYes, uint256 amount);
    event MarketResolved(uint256 marketId, bool outcome);

    constructor() {
        owner = msg.sender;
    }

    function createMarket(string memory _question, uint256 _endTime) public {
        require(msg.sender == owner, "Only owner can create markets");
        require(_endTime > block.timestamp, "End time must be in the future");

        markets.push(Market({
            question: _question,
            yesShares: 0,
            noShares: 0,
            endTime: _endTime,
            resolved: false,
            outcome: false
        }));

        emit MarketCreated(markets.length - 1, _question, _endTime);
    }

    function placeBet(uint256 _marketId, bool _betOnYes) public payable {
        require(_marketId < markets.length, "Invalid market");
        require(block.timestamp < markets[_marketId].endTime, "Betting is closed");

        if (_betOnYes) {
            yesBets[_marketId][msg.sender] += msg.value;
            markets[_marketId].yesShares += msg.value;
        } else {
            noBets[_marketId][msg.sender] += msg.value;
            markets[_marketId].noShares += msg.value;
        }

        emit BetPlaced(_marketId, msg.sender, _betOnYes, msg.value);
    }

    function resolveMarket(uint256 _marketId, bool _outcome) public {
        require(msg.sender == owner, "Only owner can resolve");
        require(block.timestamp >= markets[_marketId].endTime, "Market still open");
        require(!markets[_marketId].resolved, "Already resolved");

        markets[_marketId].resolved = true;
        markets[_marketId].outcome = _outcome;

        emit MarketResolved(_marketId, _outcome);
    }
}
