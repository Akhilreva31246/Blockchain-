const SHA256 = require("crypto-js/sha256");

class Block{
    constructor (index,timestamp,data,previousHash = ''){
        this.index=index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"04/02/2024","This is the first created block","0");
    }
    
getLatestBlock(){
    return this.chain[this.chain.length-1];
}
addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    }

    checkBlockChainValid(){
        for (let i=1; i<this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];
    
        if(currentBlock.hash != currentBlock.calculateHash()){
            return false;
        }
        if(currentBlock.previousHash != previousBlock.hash){
            return false;
        }
        return true;
     }
    }
}


//creating two new blocks
let Block1 = new Block(1,"05/02/2024",{mybalance: 100});
let Block2 = new Block(2,"06/02/2024",{mybalance: 5000});
let Block3 = new Block(3,"24/02/2024",{mybalance:10});

//create a new Blockchain
let myBlockchain = new Blockchain();

//adding the new blocks to the Blockchain
myBlockchain.addBlock(Block1);
myBlockchain.addBlock(Block2);
myBlockchain.addBlock(Block3);

console.log(JSON.stringify(myBlockchain,null,4));
console.log("validation check for the block chain:"+myBlockchain.checkBlockChainValid());