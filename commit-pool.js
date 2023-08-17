// commit messages are added after 2f+1 prepare message are received, therefore we use the prepare message to get the block hash instead of passing the entire block

const ChainUtil = require("./chain-util");

class CommitPool {
  constructor() {
    this.list = {}; // list object is mapping that holds a list commit messages for hash of a block
  }

  // commit function initalize a list of commit message for a prepare message
  // and add adds the commit message for the current node and return it
  commit(prepare, wallet) {
    let commit = this.createCommit(prepare, wallet);
    this.list[prepare.blockHash] = [];
    this.list[prepare.blockHash].push(commit);
    return commit;
  }

  // creates a commit message for the given prepare message

  createCommit(prepare, wallet) {
    let commit = {};
    commit.blockHash = prepare.blockHash;
    commit.publicKey = wallet.getPublicKey();
    commit.signature = wallet.sign(prepare.blockHash);
    return commit;
  }

  // checks if commit message already exists
  existingCommit(commit) {
    let exists = this.list[commit.blockHash].find(
      (p) => p.publicKey === commit.publicKey
    );
    return exists;
  }

  // check if the commit message is valid or not

  isValidCommit(commit) {
    return ChainUtil.verifySignature(
      commit.publicKey,
      commit.signature,
      commit.blockHash
    );
  }
  // pushes the commit message for block hash into the list
  addCommit(commit) {
    this.list[commit.blockHash].push(commit);
  }
}
module.exports = CommitPool;
