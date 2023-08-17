// we need a place to store transactions received from other nodes.

const Transaction = require("./transaction"); // used for verification

const { TRANSACTION_THRESHOLD } = require("./config"); // transaction threshold is the limit or the holding capacity of the nodes , once this exceeds a new block is generated

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  // in addTransaction function we push transactions in this list name transactions
  // if list full this function return true          else return false
  addTransaction(transaction) {
    this.transactions.push(transaction);
    if (this.transactions.length >= TRANSACTION_THRESHOLD) {
      return true;
    } else {
      return false;
    }
  }

  // Wrapper function to verify transactions

  verifyTransaction(transaction) {
    return Transaction.verifyTransaction(transaction);
  }

  // check if trahsaction exists or not

  transactionExists(transaction) {
    let exists = this.transactions.find((t) => t.id === transaction.id);
    return exists;
  }

  // empty the pool i.e, remove all transaction

  clear() {
    console.log("TRANSACTION POOL CLEARED");
    this.transactions = [];
  }
}

module.exports = TransactionPool;
