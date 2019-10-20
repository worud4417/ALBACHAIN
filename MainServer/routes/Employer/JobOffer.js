/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employer job offer process
 * fort number is 3000
 * http://(ipaddress):3000/employerjoboffer
 */

var express = require("express");
var router = express.Router();

//get employer's mongodb schema
var Employer = require('../../model/Employer');
//get joboffer's mongodb schema
var JobOffer = require('../../model/JobOffer');

/**
 * set employer joboffer
 * use POST
 * use JSON
 * @param ID is employer's id
 * @param STARTDATE is job's start date
 * @param PERIOD is job's period
 * @param TEXT is description for job
 */
router.post('/',function(req,res,next){

    var jobOffer = new JobOffer();

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

/**
 * get employer joboffer list
 * use GET
 * @param ID is employer's id
 */
router.get('/',function(req,res,next){
    var id = req.query.ID;

    JobOffer.find({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj.length ==0){
            return res.status(400).send({status:"2"});
        }
        else{
            return res.status(200).send(obj);
        }
    })
})

/**
 * delete employer joboffer
 * use DELETE
 * use JSON
 * @param ID is employer's id
 */
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