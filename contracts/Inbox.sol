//SPDX-License-Identifier: MIT
pragma solidity <0.7;

contract Inbox {
    string private message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
