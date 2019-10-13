var express = require("express");
var router = express.Router();

var Employer = require('../../model/Employer');

router.post('/',function(req,res,next){
    var id = req.body.ID;
    var password = req.body.PASSWORD;

    Employer.findOne({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }

        if(obj == null){
            return res.status(400).send({status:"2"});
        }

        if(obj.PASSWORD != password){
            return res.status(400).send({status:"2"});
        }

        return res.status(200).json({
            status:"1",
            ID:obj.ID,
            NAME:obj.NAME,
            REGISTRATION:obj.REGISTRATION,
            CALLNUMBER:obj.CALLNUMBER,
            ADDRESS:obj.ADDRESS
        });
    })
});

module.exports = router;