// since PBFT is permissioned blockchain consensus algorithm we need to store the address of all the nodes in each node system. we can do this manually by choosing a secret , creating a wallet , getting its public key and storing this key into file and when we run our project it reads this file for key

// but instead of doing this manually we can automate this by creating a class and adding a function that can return a list of public keys of N number of nodes.

const Wallet = require("./wallet");

// now we will create Validator class and it will generate a list of public keys known to every node. In this project we used the secret phrase for each node as - Node1, Node2, Node3.....

class Validators {
  // constructor will take an argument which is the number of nodes in the network

  constructor(numberOfValidators) {
    // here numberOfValidators is no. of nodes
    this.list = this.generateAddresses(numberOfValidators);
  }

  // below function generates wallets and their public key. The secret key has been known for demonstration purposes . secret key will be passed from command line to generate the same wallet again , as a result the same public key will be generated

  generateAddresses(numberOfValidators) {
    let list = [];
    for (let i = 0; i < numberOfValidators; i++) {
      list.push(new Wallet("Node" + i).getPublicKey()); // here we pass argument in Wallet class is `"Node" +i` and it is known to secret . secret phrase should never be made public . here used it for only demonstration purpose
    }
    return list;
  }
  // below function verifies if the passed public key is a known validator or not
  isValidValidator(validator) {
    return this.list.includes(validator); // this include function whether this validator include or not
  }
}

module.exports = Validators;
