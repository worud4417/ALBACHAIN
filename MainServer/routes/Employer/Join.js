/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employer join process
 * fort number is 3000
 * http://(ipaddress):3000/employerjoin
 */

 //get caver-js for create address
var caver = require('../../utils/caver');
var express = require("express");
var router = express.Router();

//get employer's mongodb schema
var Employer = require('../../model/Employer');

/**
 * set employer
 * use POST
 * use JSON
 * @param ID is employer's id
 * @param PASSWORD is employer's password
 * @param NAME is employer's name
 * @param REGISTRATION is employer's registration.
 * @param CALLNUMBER is employer's callnumber
 * @param ADDRESS is employer's address
 */
router.post('/',function(req,res,next){

    //create new address
    var newAccount = caver.createAddress();

    var status ="0";
    var employer = new Employer();

    var id = req.body.ID;
    var password = req.body.PASSWORD;
    var name = req.body.NAME;
    var registration = req.body.REGISTRATION;
    var callnumber = req.body.CALLNUMBER;
    var address = req.body.ADDRESS;
    var joindate = new Date();

    Employer.findOne({ID:id},function(err,obj){
        if(err){
            status = "3";
        }

        if(obj != null){
            status = "2"
        }
    }).then(Employer.findOne({REGISTRATION:registration},function(err,obj){
        if(err){
            status = "3";
        }

        if(obj != null){
            status = "2"
        }
    })).then(function(){
        if(status == "2"){
            return res.status(400).send({status:status});
        }
        else if(status == "3"){
            return res.status(500).send({status:status});
        }
        else{
            employer.ID = id;
            employer.PASSWORD = password;
            employer.NAME = name;
            employer.REGISTRATION = registration;
            employer.CALLNUMBER = callnumber;
            employer.ADDRESS = address;
            employer.JOINDATE = joindate;
            employer.KLAYTNPRIVATEKEY = newAccount.privateKey;

            employer.save(function(err){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(201).send({status:"1"});
            })
        }
    })
})

/**
 * delete employer
 * use DELETE
 * use JSON
 * @param ID is employer's id
 */
router.delete('/',function(req,res,next){
    Employer.findOne({ID:req.body.ID},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else{
            Employer.remove({ID:req.body.ID},function(err,obj){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(200).send({status:"1"});
            })
        }
    })
})

module.exports = router;