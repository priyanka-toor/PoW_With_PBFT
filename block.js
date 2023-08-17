// Import SHA256 used for hashing and ChainUtil for verifying signature
const hexToBinary = require("hex-to-binary");
const SHA256 = require("crypto-js/sha256");
const ChainUtil = require("./chain-util");

const MIN_RATE = 1000;
const INITIAL_DIFFICULTY = 2;
class Block {
  constructor(
    timestamp,
    lastHash,
    hash,
    data,
    proposer,
    signature,
    sequenceNo,
    nonce,
    difficulty
  ) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.proposer = proposer;
    this.signature = signature;
    this.sequenceNo = sequenceNo;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // A function to print the block
  toString() {
    return `Block - 
        Timestamp   : ${this.timestamp}
        Last Hash   : ${this.lastHash}
        Hash        : ${this.hash}
        Data        : ${this.data}
        proposer    : ${this.proposer}
        Signature   : ${this.signature}
        Sequence No : ${this.sequenceNo}
        Nonce       : ${this.nonce}
        Difficulty  : ${this.difficulty}`;
  }

  // The first block by default will the genesis block
  // this function generates the genesis block with random values
  static genesis() {
    return new this(
      `genesis time`,
      "----",
      "genesis-hash",
      [],
      "P4@P@53R",
      "SIGN",
      0,
      0,
      2
    );
  }

  // creates a block using the passed lastblock, transactions and wallet instance
  static createBlock(lastBlock, data, wallet) {
    let hash, hash1, h;
    let timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      });
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      hash1 = hash1.from(hash, "utf8");
      h = hash1.toString("hex");
    } while (
      hexToBinary(h).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    let proposer = wallet.getPublicKey();
    let signature = Block.signBlockHash(hash, wallet);
    return new this(
      timestamp,
      lastHash,
      hash,
      data,
      proposer,
      signature,
      1 + lastBlock.sequenceNo,
      nonce,
      difficulty
    );
  }

  // hashes the passed values
  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(
      JSON.stringify(`${timestamp}${lastHash}${data}${nonce},${difficulty}`)
    ).toString();
  }

  // returns the hash of a block
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  // signs the passed block using the passed wallet instance
  static signBlockHash(hash, wallet) {
    return wallet.sign(hash);
  }

  // checks if the block is valid
  static verifyBlock(block) {
    return ChainUtil.verifySignature(
      block.proposer,
      block.signature,
      Block.hash(
        block.timestamp,
        block.lastHash,
        block.data,
        block.nonce,
        block.difficulty
      )
    );
  }

  // verifies the proposer of the block with the passed public key
  static verifyProposer(block, proposer) {
    return block.proposer == proposer ? true : false;
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MIN_RATE) {
      return difficulty - 1;
    }
    return difficulty + 1;
  }
}

module.exports = Block;
