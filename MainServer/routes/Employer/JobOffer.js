var express = require("express");
var router = express.Router();

var Employer = require('../../model/Employer');
var JobOffer = require('../../model/JobOffer');

router.post('/',function(req,res,next){

    var jobOffer = new JobOffer();
    var status = "0";

    var id = req.body.ID;
    var startdate = req.body.STARTDATE;
    var period = req.body.PERIOD;
    var text = req.body.TEXT;

    Employer.findOne({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else{
            jobOffer.ID = id;
            jobOffer.NAME = obj.NAME;
            jobOffer.REGISTRATION = obj.REGISTRATION;
            jobOffer.CALLNUMBER = obj.CALLNUMBER;
            jobOffer.ADDRESS = obj.ADDRESS;
            jobOffer.TEXT = text;
            jobOffer.STARTDATE = startdate;
            jobOffer.PERIOD = period;
    
            jobOffer.save(function(err){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(201).send({status:"1"});
            })
        }
    })
})

router.get('/',function(req,res,next){
    var id = req.query.ID;
    
    JobOffer.find({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else{
            return res.status(200).send(obj);
        }
    })
})

router.delete('/',function(req,res,next){
    var _id = req.body._id;

    JobOffer.findOne({_id:_id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else{
            JobOffer.deleteOne({_id:_id},function(err){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(200).send({status:"1"});
            })
        }
    })
})

module.exports = router;