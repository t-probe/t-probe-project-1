const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PredictionMarket", function () {
  let PredictionMarket, predictionMarket, owner, user1, user2;

  beforeEach(async function () {
    // Get signers (accounts)
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy contract
    PredictionMarket = await ethers.getContractFactory("PredictionMarket");
    predictionMarket = await PredictionMarket.deploy();
    await predictionMarket.deployed();
  });

  it("Should create a market", async function () {
    const endTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

    await predictionMarket.createMarket("Will ETH reach $5000?", endTime);
    
    const market = await predictionMarket.markets(0);
    expect(market.question).to.equal("Will ETH reach $5000?");
    expect(market.endTime).to.equal(endTime);
  });

  it("Should allow users to place bets", async function () {
    const endTime = Math.floor(Date.now() / 1000) + 3600;

    await predictionMarket.createMarket("Will BTC hit $100K?", endTime);

    await predictionMarket.connect(user1).placeBet(0, true, { value: ethers.parseEther("1") });
    await predictionMarket.connect(user2).placeBet(0, false, { value: ethers.parseEther("2") });

    const market = await predictionMarket.markets(0);
    expect(market.yesShares).to.equal(ethers.parseEther("1"));
    expect(market.noShares).to.equal(ethers.parseEther("2"));
  });

  it("Should resolve a market", async function () {
    const endTime = Math.floor(Date.now() / 1000) + 1;

    await predictionMarket.createMarket("Will Tesla launch a robot?", endTime);

    // Wait for the market to end
    await new Promise(resolve => setTimeout(resolve, 2000));

    await predictionMarket.resolveMarket(0, true);

    const market = await predictionMarket.markets(0);
    expect(market.resolved).to.equal(true);
    expect(market.outcome).to.equal(true);
  });
});
