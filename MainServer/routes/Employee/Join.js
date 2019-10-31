/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employee join process
 * fort number is 3000
 * http://(ipaddress):3000/employeejoin
 */

//get caver-js for create new address
var caver = require('../../utils/caver');
var web3 = require('../../utils/Web3');
var express = require("express");
var router = express.Router();
var message = require('../../utils/ErrorMessage');

//get employee's mongodb schema
var Employee = require('../../model/Employee');

/**
 * join employee
 * use POST
 * use JSON
 * @param ID is employee's id
 * @param PASSWORD is employee's password
 * @param NAME is employee's name
 * @param CALLNUMBER is employee's callnumber
 * @param SOCIALSECURITY is employee's socialsecurity number
 */
router.post('/',function(req,res,next){

    //create new address
    var newAccount = caver.createAddress();

    var status ="0";
    var employee = new Employee();

    var id = req.body.ID;
    var password = req.body.PASSWORD;
    var name = req.body.NAME;
    var callnumber = req.body.CALLNUMBER;
    var socialsecurity = req.body.SOCIALSECURITY;
    var joindate = new Date();

    if(id == undefined || password == undefined || name == undefined
        || callnumber == undefined || socialsecurity == undefined){
            res.status(400).send({status:"2",errormessage:message.nullParam});
    }
    else{
        Employee.findOne({ID:id},function(err,obj){
            if(err){
                status = "3";
            }
    
            if(obj != null){
                status = "2"
            }
        }).then(Employee.findOne({SOCIALSECURITY:socialsecurity},function(err,obj){
            if(err){
                status = "3";
            }
    
            if(obj != null){
                status = "2"
            }
        })).then(function(){
            if(status == "2"){
                return res.status(400).send({status:status,errormessage:message.duplicatedParam});
            }
            else if(status == "3"){
                return res.status(500).send({status:status,errormessage:message.serverError});
            }
            else{
                employee.ID = id;
                employee.PASSWORD = password;
                employee.NAME = name;
                employee.SOCIALSECURITY = socialsecurity;
                employee.CALLNUMBER = callnumber;
                employee.JOINDATE = joindate;
                employee.KLAYTNPRIVATEKEY = newAccount.privateKey;
    
                employee.save(function(err){
                    if(err){
                        return res.status(500).send({status:"3",errormessage:message.serverError});
                    }
                    return res.status(201).send({status:"1"});
                })
            }
        })
    }
})

/**
 * delete employee
 * use DELETE
 * use JSON
 * @param ID is employee's id
 */
router.delete('/',function(req,res,next){
    Employee.findOne({ID:req.body.ID},function(err,obj){
        if(err){
            return res.status(500).send({status:"3",errormessage:message.serverError});
        }
        else if(obj == null){
            return res.status(400).send({status:"2",errormessage:message.idNotFounded});
        }
        else{
            Employee.deleteOne({ID:req.body.ID},function(err){
                if(err){
                    return res.status(500).send({status:"3",errormessage:message.serverError});
                }
                return res.status(200).send({status:"1"});
            })
        }
    })
})

/**
 * update employee's info
 * use POST
 * use JSON
 * @param ID is employee's id
 * @param PASSWORD is employee's password
 * @param CALLNUMBER is employee's callnumber
 * @param NAME is employee's name
 */
router.post('/update',function(req,res,next){

    var id = req.body.ID;
    var password = req.body.PASSWORD;
    var callnumber = req.body.CALLNUMBER;
    var name = req.body.NAME;

    if(password == undefined || callnumber == undefined || name == undefined){
        return res.status(400).send({status:"2",errormessage:message.nullParam});
    }
    else{
        Employee.findOne({ID:id},function(err,obj){
            if(err){
                return res.status(500).send({status:message.serverError});
            }
            else if(obj == null){
                return res.status(400).send({status:"2",errormessage:message.idNotFounded});
            }
            else{
                Employee.updateOne({ID:id},{PASSWORD:password,CALLNUMBER:callnumber,NAME:name},function(err,result){
                    if(err){
                        return res.status(500).send({status:"3",errormessage:message.serverError});
                    }
                    else{
                        return res.status(201).send({status:"1",result});
                    }
                })
            }
        })
    }
})

module.exports = router;