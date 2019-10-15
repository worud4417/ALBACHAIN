var Caver = require('caver-js');
var express = require("express");
var router = express.Router();

var Employer = require('../../model/Employer');

router.post('/',function(req,res,next){

    var caver = new Caver();
    var newAccount = caver.klay.accounts.create();

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