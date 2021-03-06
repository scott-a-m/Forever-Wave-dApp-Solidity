const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("ForeverWave");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.002"),
    });
    await waveContract.deployed();

    console.log("ForeverWave address: ", waveContract.address);
    
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
