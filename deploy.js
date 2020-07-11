const { account, networkUrl } = require("./settings");
const { abi, bytecode } = require("./compile");
const WalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const provider = new WalletProvider(account, networkUrl);
const web3 = new Web3(provider);

let accounts;
let INITIAL_MESSAGE = "Hello, World!";
let NEW_MESSAGE = "Hi, everyone!";

const deploy = async () => {
	accounts = await web3.eth.getAccounts();
	console.log("Deploying contract from " + accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi)))
		.deploy({ data: "0x" + bytecode, arguments: [INITIAL_MESSAGE] })
		.send({ from: accounts[0], gas: "1000000" });
	console.log("Contract deployed to " + result.options.address);
};

deploy();
