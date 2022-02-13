import Web3 from "web3";
//import ERC20 from './USDToken.json';

let web3 = new Web3('https://alfajores-forno.celo-testnet.org')

let accounts = '0xe1B45838a172E3641B9f1Ce0b3ce2589046FFADB'
let pvt_key = ''
let other = "0x95B7FbdCAfEBF2434119816C037c80Cbf0519403"
let contract = new web3.eth.Contract(ERC20.abi, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9')
//let balance = await contract.methods.balanceOf(accounts).call()
let tx = await contract.methods.transfer(other, web3.utils.toWei('1', 'ether'))
let sign_tx = await web3.eth.accounts.signTransaction(tx, pvt_key)
let trans = sign_tx.send({from: accounts})
console.log(trans)