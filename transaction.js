const ChainUtil = require("./chain-util"); //used for hashing and verification

class Transaction {
  // the wallet instance will be passed as a parameter to the constructor along with the data to be stored

  constructor(data, wallet) {
    this.id = ChainUtil.id(); // for identificaiton
    this.from = wallet.publicKey; // the sender address
    this.input = { data: data, timestamp: Date.now() }; // an object that further contains data to be stores and timestamp
    this.hash = ChainUtil.hash(this.input); // the SHA256 of input
    this.signature = wallet.sign(this.hash); // the hash signed by the sender
  }
  //this method verifies whether the transaciton is valid
  static verifyTransaction(transaciton) {
    return ChainUtil.verifySignature(
      transaciton.from,
      transaciton.signature,
      ChainUtil.hash(transaciton.input)
    );
  }
}
module.exports = Transaction;
