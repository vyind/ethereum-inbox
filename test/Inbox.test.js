const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const { abi, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let fetchedAccounts;
let inbox;

const INITIAL_MESSAGE = "Hello World!";
const NEW_MESSAGE = "Hi Everyone";

beforeEach(async () => {
	fetchedAccounts = await web3.eth.getAccounts();
	inbox = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi)))
		.deploy({
			data: bytecode,
			arguments: [INITIAL_MESSAGE]
		})
		.send({
			from: fetchedAccounts[0],
			gas: "1000000"
		});
});

describe("Inbox", () => {
	it("has fetched accounts", () => {
		assert.ok(fetchedAccounts);
	});
	it("has deployed a contract", () => {
		assert.ok(inbox.options.address);
	});
	it("has initial message", async () => {
		const message = await inbox.methods.getMessage().call();
		assert.equal(message, INITIAL_MESSAGE);
	});
	it("can set message", async () => {
		await inbox.methods.setMessage(NEW_MESSAGE).send({ from: fetchedAccounts[0] });
		const message = await inbox.methods.getMessage().call();
		assert.equal(message, NEW_MESSAGE);
	});
});
