/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is offered the utils that using caver-js
 */

 //get caver-js that klaytn's javascript sdk
var Caver = require('caver-js');
var caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));

//get klaytn contract using with abi and contract address
var contract = new caver.klay.Contract(
    //contract abi
    [{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_employerAddress","type":"address"},{"name":"_employeeAddress","type":"address"},{"name":"startDate","type":"uint256"}],"name":"setRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_employeeAddress","type":"address"}],"name":"getEmployeeRecord","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_employerAddress","type":"address"}],"name":"getEmployerRecord","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}],
    //contract address
    "0x6459245af6e7fa2a65deefb7ebd4787b6c78e813")

//add the contract owner address that created from privatekey to klaytn wallet to use the contract 
var address = caver.klay.accounts.wallet.add('0x547903cc1e9bec5fe4e6f0e47249328a43a94f68098d0982b97002109920bf86').address;

/**
 * save job's record to klaytn blockchain network
 * @param _employerAdderss is employer's klaytn address
 * @param _employeeAddress is employee's klaytn address
 * @param _startDate is job's start date
 */
exports.setRecord = function setRecord(_employerAddress, _employeeAddress, _startDate){
    contract.methods.setRecord(_employerAddress,_employeeAddress,_startDate).send({from:address,gas:25000000}).then(function(receipt){
        console.log(receipt);
    }).catch(e=>console.log(e))
}

/**
 * get employee's job record from klaytn block chain network
 * @param _employeeAdderss is employee's klaytn address
 */
exports.getEmployeeRecord = function getEmployeeRecord(_employeeAddress){
    return contract.methods.getEmployeeRecord(_employeeAddress).call({from:address,gas:25000000}).then(function(receipt){
        //return javascript array
        return receipt;
    })
}

/**
 * get employer's hire record from klaytn block chain network
 * @param _employerAdderss is employee's klaytn address
 */
exports.getEmployerRecord = function getEmployerRecord(_employerAdderss){
    return contract.methods.getEmployerRecord(_employerAdderss).call({from:address,gas:25000000}).then(function(receipt){
        //return javascript array
        return receipt;
    })
}

/**
 * get address from klaytn's private key
 * @param _pk is private key to find for the address
 */
exports.getAddress = function getAddress(_pk){
    return caver.klay.accounts.privateKeyToAccount(_pk).address;
}

/**
 * create new account and return
 */
exports.createAddress = function createAddress(){
    return caver.klay.accounts.create();
}