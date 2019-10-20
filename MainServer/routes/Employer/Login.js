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
            return res.status(500).send({status:"3"});
        } 
        else if(obj == null){
            return res.status(400).send({status:"2"});
        } 
        else if(obj.PASSWORD != password){
            return res.status(400).send({status:"2"});
        } 
        else {
            //return employer's info
            return res.status(200).json({
                status:"1",
                ID:obj.ID,
                NAME:obj.NAME,
                REGISTRATION:obj.REGISTRATION,
                CALLNUMBER:obj.CALLNUMBER,
                ADDRESS:obj.ADDRESS
            });
        }
    })
});

module.exports = router;