var express = require("express");
var router = express.Router();

var JobOffer = require('../../model/JobOffer');
var Employee = require('../../model/Employee');
var MatchedJob = require('../../model/MatchedJob');

router.get("/",function(req,res,next){
    JobOffer.find({},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else{
            return res.status(200).send(obj);
        }
    })
})

router.post('/',function(req,res,next){
    var _id = req.body._id;
    var ID = req.body.ID;

    var matchedJob = new MatchedJob();

    JobOffer.findOne({_id:_id},function(err,jobOffer){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(jobOffer == null){
            return res.status(400).send({status:"2"});
        }
        else{
            Employee.findOne({ID:ID},function(err,employee){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                else if(employee == null){
                    return res.status(400).send({status:"2"});
                }
                else{
                    matchedJob.REGISTRATION = jobOffer.REGISTRATION;
                    matchedJob.SOCIALSECURITY = employee.SOCIALSECURITY;
                    matchedJob.STARTDATE = jobOffer.STARTDATE;
                    matchedJob.PERIOD = jobOffer.PERIOD;
                    matchedJob.TEXT = jobOffer.TEXT;
                    matchedJob.STATUS = 1,
                    matchedJob.JOINDATE = new Date();

                    matchedJob.save(function(err){
                        if(err){
                            return res.status(500).send({status:"3"});
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
                }
            })
        }
    })
})



module.exports = router;