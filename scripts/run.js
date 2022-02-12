const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("ForeverWave");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();     
    console.log("Contract deployed to:", waveContract.address);

    // get contract balance

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(`Your contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`)

    // get wave count

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    // send wave

    let waveTxn = await waveContract.wave("");
    await waveTxn.wait();

    // check to see if balance changed:

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(`Your contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`)

    waveTxn = await waveContract.wave("");
    await waveTxn.wait();

    // check to see if balance changed:

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(`Your contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`)


    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves)

    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
};

runMain();