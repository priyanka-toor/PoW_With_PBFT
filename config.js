const TRANSACTION_THRESHOLD = 5; // maximum no. of transaction that can be present in a block and transaction pool

const NUMBER_OF_NODES = 3; // total number of nodes in the network

const MIN_APPROVALS = 2 * (NUMBER_OF_NODES / 3) + 1; // minimum no. of positive vote required for the message/block to be valid

module.exports = {
  TRANSACTION_THRESHOLD,
  NUMBER_OF_NODES,
  MIN_APPROVALS,
};
