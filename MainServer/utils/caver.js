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
    [{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_employer","type":"uint256"},{"name":"_employee","type":"uint256"},{"name":"_startDate","type":"uint256"},{"name":"_endDate","type":"uint256"},{"name":"_pay","type":"uint32"}],"name":"setRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"uint256"}],"name":"getCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllRecord","outputs":[{"name":"","type":"uint32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_employee","type":"uint256"}],"name":"getEmployeeRecord","outputs":[{"name":"","type":"uint32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_employer","type":"uint256"}],"name":"getEmployerRecord","outputs":[{"name":"","type":"uint32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}],
    //contract address
    "0x247e01bc645fb94ae5a593f320cf84b76faafd30",{from:"0x2646b19bdd8d42cef490f736bcd35d2d1c565296",gasPrice:"25000000000"});

//add the contract owner address that created from privatekey to klaytn wallet to use the contract 
var address = caver.klay.accounts.wallet.add('0x547903cc1e9bec5fe4e6f0e47249328a43a94f68098d0982b97002109920bf86').address;

/**
 * save job's record to klaytn blockchain network
 * @param _employerRegistration is employer's registration
 * @param _employeeSocialsecurity is employee's socialsecurity
 * @param _startDate is job's start date
 * @param _endDate is job's end date
 * @param _pay is job's pay
 */
exports.setRecord = async function setRecord(_employerRegistration, _employeeSocialsecurity, _startDate,_endDate,_pay){
    return await contract.methods.setRecord(Number.parseInt(_employerRegistration),Number.parseInt(_employeeSocialsecurity),new Date(_startDate).getTime(),new Date(_endDate).getTime(),Number.parseInt(_pay)).send({from:address,gas:250000}).then(function(receipt){
        console.log(receipt);
    }).catch(e=>console.log(e))
}

/**
 * get employee's job record from klaytn block chain network
 * @param _employeeSocialsecurity is employee's socialsecurity
 */
exports.getEmployeeRecord = async function getEmployeeRecord(_employeeSocialsecurity){
    var result =  await contract.methods.getEmployeeRecord(Number.parseInt(_employeeSocialsecurity)).call({from:address,gas:2500000},function(error,response){
        if(error){
            console.log(error);
        }
        return response;
    });
    return result;
}

/**
 * get employer's hire record from klaytn block chain network
 * @param _employerRegistration is employer's registration
 */
exports.getEmployerRecord = async function getEmployerRecord(_employerRegistration){
    var result =  await contract.methods.getEmployerRecord(Number.parseInt(_employerRegistration)).call({from:address,gas:25000000},function(error,response){
        if(error){
            console.log(error);
        }
        return response;
    });
    return result;
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

exports.getAllRecord = async function getAllRecord(){
    var result = await contract.methods.getAllRecord().call({from:address,gas:25000000},function(error,response){
        if(error){
            console.log(error);
        }
        return response;
    });
    return result;
}