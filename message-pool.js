// message pool will work similarly to the other two pools. the only differnce would be extra message it takes with it
// message-pool will hold NEW-ROUND messages

const ChainUtil = require("./chain-util");

class MessagePool {
  constructor() {
    this.list = {}; // list object is mapping that hold a list messages for a hash of a block
    this.message = "INITIATE NEW ROUND";
  }

  // creates a round change message for the given block hash

  createMessage(blockHash, wallet) {
    let roundChange = {
      publicKey: wallet.getPublicKey(),
      message: this.message,
      signature: wallet.sign(ChainUtil.hash(this.message + blockHash)),
    };
    this.list[blockHash] = roundChange;
    return roundChange;
  }

  // check if the message is already exists

  existingMessage(message) {
    if (this.list[message.blockHash]) {
      let exists = this.list[message.blockHash].find(
        (p) => p.publicKey === message.publicKey
      );
      return exists;
    } else {
      return false;
    }
  }
  // check if the message is valid or not
  isValidMessage(message) {
    console.log("in valid here");
    return ChainUtil.verifySignature(
      message.publicKey,
      message.signature,
      ChainUtil.hash(message.message + message.blockHash)
    );
  }

  // pushes the message for a block hash into the list

  addMessage(message) {
    this.list[message.blockHash].push(message);
  }
}
module.exports = MessagePool;
