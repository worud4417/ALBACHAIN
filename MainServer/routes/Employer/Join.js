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
var web3 = require('../../utils/Web3');
var express = require("express");
var router = express.Router();
var message = require('../../utils/ErrorMessage');
var multer = require('multer');
var path = require('path');

//get employer's mongodb schema
var Employer = require('../../model/Employer');

const storage = multer.diskStorage({destination:function(req,file,callback){
    callback(null,'../public/images');
},
filename:function(req,file,callback){
    callback(null,file.originalname+"-er.jpg");
}});

let upload = multer({storage:storage});

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
router.post('/',upload.single("image"),function(req,res,next){

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
    var imagesource = req.file.destination+"/"+req.file.filename;

    if(id == undefined || password == undefined || name == undefined ||
        registration == undefined || callnumber == undefined || address ==undefined){
            return res.status(400).send({status:"2",errormessage:message.nullParam});
    }
    else{
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
                return res.status(400).send({status:status,errormessage:message.duplicatedParam});
            }
            else if(status == "3"){
                return res.status(500).send({status:status,errormessage:message.serverError});
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
                employer.IMAGESOURCE = imagesource;
    
                employer.save(function(err){
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
 * delete employer
 * use DELETE
 * use JSON
 * @param ID is employer's id
 */
router.delete('/',function(req,res,next){
    Employer.findOne({ID:req.body.ID},function(err,obj){
        if(err){
            return res.status(500).send({status:"3",errormessage:message.serverError});
        }
        else if(obj == null){
            return res.status(400).send({status:"2",errormessage:message.idNotFounded});
        }
        else{
            Employer.remove({ID:req.body.ID},function(err,obj){
                if(err){
                    return res.status(500).send({status:"3",errormessage:message.serverError});
                }
                return res.status(200).send({status:"1"});
            })
        }
    })
})

/**
 * update employer's info
 * use POST
 * use JSON
 * @param ID is employer's id
 * @param PASSWORD is employer's password
 * @param CALLNUMBER is employer's callnumber
 * @param NAME is employer's name
 * @param ADDRESS is employer's address
 */
router.post('/update',function(req,res,next){
    var id = req.body.ID;
    var password = req.body.PASSWORD;
    var callnumber = req.body.CALLNUMBER;
    var name = req.body.NAME;
    var address = req.body.ADDRESS;

    if(password == undefined || callnumber == undefined || name == undefined || address == undefined){
        return res.status(400).send({status:"2",errormessage:message.nullParam});
    }
    else{
        Employer.findOne({ID:id},function(err,obj){
            if(err){
                return res.status(500).send({status:message.serverError});
            }
            else if(obj == null){
                return res.status(400).send({status:"2",errormessage:message.idNotFounded});
            }
            else{
                Employer.updateOne({ID:id},{PASSWORD:password,CALLNUMBER:callnumber,NAME:name,ADDRESS:address},function(err,result){
                    if(err){
                        return res.status(500).send({status:"3",errormessage:message.serverError});
                    }
                    else{
                        return res.status(200).send({status:"1",result});
                    }
                })
            }
        })
    }
})

module.exports = router;