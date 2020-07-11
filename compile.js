const fs = require("fs");
const path = require("path");
const solc = require("solc");

const filePath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(filePath, "utf-8");

var input = {
	language: "Solidity",
	sources: {
		"Inbox.sol": {
			content: source
		}
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"]
			}
		}
	}
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports.abi = output.contracts["Inbox.sol"].Inbox.abi;
module.exports.bytecode = output.contracts["Inbox.sol"].Inbox.evm.bytecode.object;
