/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employer login process
 * fort number is 3000
 * http://(ipaddress):3000/employerlogin
 */

var express = require("express");
var router = express.Router();
var message = require('../../utils/ErrorMessage');

//get employer's mongodb schema
var Employer = require('../../model/Employer');

/**
 * login employer
 * use POST
 * use JSON
 * @param ID is employer's id
 * @param PASSWORD is employer's password
 */
router.post('/',function(req,res,next){

    var id = req.body.ID;
    var password = req.body.PASSWORD;

    Employer.findOne({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3",errormessage:message.serverError});
        } 
        else if(obj == null){
            return res.status(400).send({status:"2",errormessage:message.idNotFounded});
        } 
        else if(obj.PASSWORD != password){
            return res.status(400).send({status:"2",errormessage:message.invalidPassword});
        } 
        else {
            //return employer's info
            return res.status(200).json({
                status:"1",
                ID:obj.ID,
                NAME:obj.NAME,
                REGISTRATION:obj.REGISTRATION,
                CALLNUMBER:obj.CALLNUMBER,
                ADDRESS:obj.ADDRESS,
                RATING : obj.RATING
            });
        }
    })
});

/**
 * search employer
 * use GET
 * use JSON
 * @param ID is employer's id
 */
router.get('/',function(req,res,next){
    var id = req.query.ID;
    if(id == undefined){
        return res.status(400).send({status:"2",errormessage:message.idNotFounded});
    }
    else{
        Employer.findOne({ID:id},function(err,employer){
            if(err){
                return res.status(500).send({status:'3',errormessage:message.serverError});
            }
            else{
                return res.status(200).send({status:"1",employer});
            }
        })
    }
})

module.exports = router;