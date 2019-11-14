/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is offered the utils that using web3-js
 */

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var contract = new web3.eth.Contract(
    [{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_employerAddress","type":"address"},{"name":"_employeeAddress","type":"address"},{"name":"startDate","type":"uint256"}],"name":"setRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_employeeAddress","type":"address"}],"name":"getEmployeeRecord","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_employerAddress","type":"address"}],"name":"getEmployerRecord","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}],
    "0xe0ebd7775a96904ab81408692ff769b1af28ea52"
);

// var address = web3.eth.accounts.wallet.add({privateKey:"e4a8e4c74f439fd040a677d7b088044d97d636eb40c535bc25fec7187e342099",address:"0x11eFBEA3618576a0815a24Cb341d5BcaD1Ca59Dc"});

exports.setRecord = async function setRecord(_employerAddress, _employeeAddress, _startDate){
    await contract.methods.setRecord(_employerAddress,_employeeAddress,_startDate).send({from:"0x11eFBEA3618576a0815a24Cb341d5BcaD1Ca59Dc",gas:2500000}).then(function(receipt){
        console.log(receipt);
    }).catch(e=>console.log(e))
}

exports.getEmployeeRecord = async function getEmployeeRecord(_employeeAddress){
    var result =  await contract.methods.getEmployeeRecord(_employeeAddress).call({from:"0x11eFBEA3618576a0815a24Cb341d5BcaD1Ca59Dc",gas:2500000},function(error,response){
        if(error){
            console.log(error);
        }
        return response;
    });
    return result;
}

exports.getEmployerRecord = async function getEmployerRecord(_employerAdderss){
    var result =  await contract.methods.getEmployerRecord(_employerAdderss).call({from:"0x11eFBEA3618576a0815a24Cb341d5BcaD1Ca59Dc",gas:25000000},function(error,response){
        if(error){
            console.log(error);
        }
        return response;
    });
    return result;
}

exports.getAddress = function getAddress(_pk){
    return web3.eth.accounts.privateKeyToAccount(_pk).address;
}

exports.createAddress = function createAddress(){
    return web3.eth.accounts.create();
}

exports.test = function test(){
    console.log(address);
    return null;
}