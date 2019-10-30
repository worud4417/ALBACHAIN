/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * process that search the job
 * fort number is 3000
 * http://(ipaddress):3000/employeejobsearch
 */

var express = require("express");
var router = express.Router();
var message = require('../../utils/ErrorMessage');

//get joboffer's mongodb schema
var JobOffer = require('../../model/JobOffer');
//get employee's mongodb schema
var Employee = require('../../model/Employee');
//get matchedjob's mongodb schema
var MatchedJob = require('../../model/MatchedJob');

/**
 * get all offred job
 * use GET
 * use JSON
 */
router.get("/",function(req,res,next){
    var result = JobOffer.find({}).sort({_id:-1});
    result.exec(function(err,jobOffer){
        if(err){
            return res.status(500).send({status:"3",errormessage:message.serverError});
        }
        else{
            return res.status(200).send({status:"1",jobOffer});
        }
    })
})

/**
 * employee request the job to employer
 * use POST
 * use JSON
 * @param _id is job id in the joboffer
 * @param ID is employee's ID
 */
router.post('/',function(req,res,next){
    var _id = req.body._id;
    var ID = req.body.ID;

    var matchedJob = new MatchedJob();

    JobOffer.findOne({_id:_id},function(err,jobOffer){
        if(err){
            return res.status(500).send({status:"3",errormessage:message.serverError});
        }
        else if(jobOffer == null){
            return res.status(400).send({status:"2",errormessage:"can't find joboffer"});
        }
        else{
            Employee.findOne({ID:ID},function(err,employee){
                if(err){
                    return res.status(500).send({status:"3",errormessage:message.serverError});
                }
                else if(employee == null){
                    return res.status(400).send({status:"2",errormessage:message.idNotFounded});
                }
                else{
                    matchedJob.REGISTRATION = jobOffer.REGISTRATION;
                    matchedJob.SOCIALSECURITY = employee.SOCIALSECURITY;
                    matchedJob.STARTDATE = jobOffer.STARTDATE;
                    matchedJob.ENDDATE = jobOffer.ENDDATE;
                    matchedJob.TEXT = jobOffer.TEXT;
                    matchedJob.STATUS = 1,
                    matchedJob.JOINDATE = new Date();
                    matchedJob.EMPLOYEENAME = employee.NAME;
                    matchedJob.EMPLOYERNAME = jobOffer.NAME;
                    matchedJob.PAY = jobOffer.PAY;

                    matchedJob.save(function(err){
                        if(err){
                            return res.status(500).send({status:"3",errormessage:message.serverError});
                        }
                        else{
                            JobOffer.deleteOne({_id:_id},function(err){
                                if(err){
                                    return res.status(500).send({status:"3",errormessage:message.serverError});
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