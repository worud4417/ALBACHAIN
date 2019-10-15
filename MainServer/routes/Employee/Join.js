var Caver = require('caver-js');
var express = require("express");
var router = express.Router();

var Employee = require('../../model/Employee');

router.post('/',function(req,res,next){

    var caver = new Caver();
    var newAccount = caver.klay.accounts.create();

    var status ="0";
    var employee = new Employee();

    var id = req.body.ID;
    var password = req.body.PASSWORD;
    var name = req.body.NAME;
    var callnumber = req.body.CALLNUMBER;
    var socialsecurity = req.body.SOCIALSECURITY;
    var joindate = new Date();

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
            return res.status(400).send({status:status});
        }
        else if(status == "3"){
            return res.status(500).send({status:status});
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
                    return res.status(500).send({status:"3"});
                }
                return res.status(201).send({status:"1"});
            })
        }
    })
})

router.delete('/',function(req,res,next){
    Employee.findOne({ID:req.body.ID},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else{
            Employee.deleteOne({ID:req.body.ID},function(err){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(200).send({status:"1"});
            })
        }
    })
})

module.exports = router;