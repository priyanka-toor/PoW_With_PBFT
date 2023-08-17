// to store a blockchain temporarily also make block pool. In which BlockPool class holds the blocks until it is added to the chain. A block is added to the block pool when a PRE-PREPARE message is recieved

// Here proposer creates a block proposal and broadcast it to the network.
// the state of the proposer now changes to PRE-PREPARED state

const Block = require("./block");

class BlockPool {
  constructor() {
    this.list = [];
  }

  // check if the block exisits or not
  exisitingBlock(block) {
    let exists = this.list.find((b) => b.hash === block.hash);
    return exists;
  }

  // pushes block to the chain
  addBlock(block) {
    this.list.push(block);
    console.log("added block to pool");
  }

  // returns the blcok for the given hash
  getBlock(hash) {
    let exists = this.list.find((b) => b.hash === hash);
    return exists;
  }
}

module.exports = BlockPool;
