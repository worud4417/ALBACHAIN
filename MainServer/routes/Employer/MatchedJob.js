var express = require('express');
var router = express.Router();

var Employer = require('../../model/Employer');
var MatchedJob = require('../../model/MatchedJob');
var JobOffer = require('../../model/JobOffer');

router.get('/',function(req,res,next){
    var id = req.query.ID;

    Employer.findOne({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else{
            MatchedJob.find({REGISTRATION:obj.REGISTRATION,STATUS:1},function(err,matchedJob){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(200).send(matchedJob);
            })
        }
    })
})

router.post('/',function(req,res,next){
    var _id = req.body._id;

    MatchedJob.updateOne({_id:_id},{STATUS:2},function(err){
        if(err){
            return res.status(500).send({status:"3"});
        }
        return res.status(201).send({status:"1"});
    })
})

router.delete('/',function(req,res,next){
    var _id = req.body._id;
    var jobOffer = new JobOffer();

    MatchedJob.findOne({_id:_id},function(err,matchedJob){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(matchedJob == null){
            return res.status(400).send({status:"2"});
        }
        else{
            Employer.findOne({REGISTRATION : matchedJob.REGISTRATION},function(err,employer){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                else{
                    jobOffer.ID = employer.ID;
                    jobOffer.NAME = employer.NAME;
                    jobOffer.REGISTRATION = matchedJob.REGISTRATION;
                    jobOffer.CALLNUMBER = employer.CALLNUMBER;
                    jobOffer.ADDRESS = employer.ADDRESS;
                    jobOffer.TEXT = matchedJob.TEXT;
                    jobOffer.STARTDATE = matchedJob.STARTDATE;
                    jobOffer.PERIOD = matchedJob.PERIOD;

                    jobOffer.save(function(err){
                        if(err){
                            return res.status(500).send({status:"3"});
                        }
                        MatchedJob.deleteOne({_id:_id},function(err){
                            if(err){
                                return res.status(500).send({status:500});
                            }
                            return res.status(201).send({status:"1"});
                        })
                    })
                }
            })
        }
    })
})

module.exports = router;