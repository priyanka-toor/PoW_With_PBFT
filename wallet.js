// wallet holds the public key and key pair. It is also responsible for signing data hashes and creating signed transactions

const ChainUtil = require("./chain-util"); // used hashing and verification

const Transaction = require("./transaction"); // used for creating transaction

class Wallet {
  // The secret phase is passed an argument when creating a wallet . the keypair genrated for a secret phrase is always the same
  constructor(secret) {
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic("hex");
  }
  // used for printing the wallet details

  toString() {
    return `Wallet - publicKey : ${this.publicKey.toString()}`;
  }

  //used for signing data hashes

  sign(dataHash) {
    return this.keyPair.sign(dataHash).toHex();
  }

  // create and returns transactions

  createTransaction(data) {
    return new Transaction(data, this);
  }

  // return public key
  getPublicKey() {
    return this.publicKey;
  }
}
module.exports = Wallet;
