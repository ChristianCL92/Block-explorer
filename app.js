import { validateAccountNotEmpty } from "./utilities/testBalance.js";

const accountInput = document.querySelector("#accountStart");
const checkBalanceButton = document.querySelector("#checkBalance");
const currentBalance = document.querySelector("#balanceDisplayed");

const amountToSend = document.querySelector("#amountSend");
const receivingAccount = document.querySelector("#accountReceive");
const sendButton = document.querySelector("#sendCrypto");

const transactionDetails = document.querySelector("#transactions");

const totalBlocksButton = document.querySelector('#allBlocksButton');
const currentChainBlocks = document.querySelector("#checkAllBlocks");

  //const rpc = new Web3('HTTP://127.0.0.1:7545');
  const rpc = new Web3(window.ethereum); 

let account;

async function initApp() {
  console.log(rpc);

  if(window.ethereum){
    try {
        const accounts = await window.ethereum.request({
          method : "eth_requestAccounts"
        })
      console.log("wallet account", accounts);
    } catch (error) {
        console.error("Eth browser not detected");
    }
  }

}

async function checkBalance() {
  account = accountInput.value;
  validateAccountNotEmpty(account)
  const balance = await rpc.eth.getBalance(account);
  currentBalance.innerHTML = rpc.utils.fromWei(balance, 'ether');
  accountInput.value = "";
  
}

async function sendTransaction () {

  const toAddress = receivingAccount.value;
  const amount = amountToSend.value;
try {
  
   const transaction = await rpc.eth.sendTransaction({
     from: account,
     to: toAddress,

     value: Number(rpc.utils.toWei(amount, 'ether')),
    gas: 30000
   });

   console.log("transaktionen:",transaction);
   displayTransactionDetails(transaction.transactionHash)

}   catch (error) {
    console.log(error);
}
} 

async function displayTransactionDetails(transactionHash) {
  const transaction = await rpc.eth.getTransaction(transactionHash);
  createTransactionList(transaction);
}

function createTransactionList(transaction) {
  transactionDetails.innerHTML += `
     <span>${transaction.from}</span>
     <span>${transaction.to}</span>
    <span>${rpc.utils.fromWei(transaction.value, 'ether')}ETH</span>
  `;
}

async function totalAmountOfBlocks () {
  const totalBlocks = await rpc.eth.getBlockNumber();
  currentChainBlocks.innerHTML = totalBlocks;
  
}

document.addEventListener("DOMContentLoaded", initApp)
checkBalanceButton.addEventListener("click", checkBalance);
sendButton.addEventListener("click", sendTransaction)
totalBlocksButton.addEventListener("click",totalAmountOfBlocks);



