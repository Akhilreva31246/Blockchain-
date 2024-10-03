const SHA256 = require("crypto-js/sha256");

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor (timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previoushash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.timestamp+this.previoushash+JSON.stringify(this.transactions)+this.nonce).toString();
    }
    mineNewBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();

        }
        console.log("A new block was mined:"+this.hash)
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendinTransactions = [];
        this.miningReward = 10;
    }

    createGenesisBlock(){
        return new Block("14/01/2024","This is a genesis block","0");
    }


getLatestBlock(){
    return this.chain[this.chain.length-1];
}

MinePendingTransactions(miningRewardAddress){
    let block = new Block(Date.now(), this.pendinTransactions, this.getLatestBlock().hash);
    block.mineNewBlock(this.difficulty);
    console.log("Block mined succesfully");

    this.chain.push(block);
    this.pendinTransactions = [
        new Transaction(null , miningRewardAddress, this.miningReward)
    ];
}

createTransaction(transaction){
    this.pendinTransactions.push(transaction);
}

GetBalanceofAdress(address){
    let balance = 0;
    for(const block of this.chain){
        for(const trans of block.transactions){
            if (trans.fromAddress === address){
                balance = balance - trans.amount;
            }
            if (trans.toAddress === address){
                balance = balance + trans.amount
              
                }
            }
       }
       return balance;
    }
   checkBlockchainvalid(){
    for (let i =1; i<this.chain.length; i++){
    const currentBlock = this.chain[i];
    const previousBlock = this.chain[i-1];
    if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
}
    if (currentBlock.previoushash !== previousBlock.hash){
        return false;
             }
    }
    return true;
   }
}


let bitcoin = new Blockchain();

transaction1 = new Transaction("tom","jerry",100);
bitcoin.createTransaction(transaction1);

transaction2 = new Transaction("jerry","tom",30);
bitcoin.createTransaction(transaction2);


console.log("Mining started by the Miner....")
bitcoin.MinePendingTransactions("Akhil")

console.log("Balance for tom is:"+bitcoin.GetBalanceofAdress("tom"));
console.log("Balance for jerry is:"+bitcoin.GetBalanceofAdress("jerry"));
console.log("Balance for miner Akhil is:"+bitcoin.GetBalanceofAdress("Akhil"));

console.log("Mining started again by the Miner....")
bitcoin.MinePendingTransactions("Akhil")
console.log("Balance for miner Akhil is:"+bitcoin.GetBalanceofAdress("Akhil"));