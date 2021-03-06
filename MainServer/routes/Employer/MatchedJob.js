/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employer matched job process
 * fort number is 3000
 * http://(ipaddress):3000/employermatchedjob
 */

var express = require('express');
var router = express.Router();

//get caver-js from utils/caver
var caver = require('../../utils/caver');

//get employer's mongodb schema
var Employer = require('../../model/Employer');
//get matchedjob's mongodb schema
var MatchedJob = require('../../model/MatchedJob');
//get joboffer's mongodb schema
var JobOffer = require('../../model/JobOffer');
//get employee's mongodb schema
var Employee = require('../../model/Employee');

/**
 * get matched job between employer and employee
 * use GET
 * @param ID is employer's id
 */
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

/**
 * get information about the job being processed.
 * http://(ipaddress):3000/employermatchedjob/working
 * use GET
 * @param ID is employer's id
 */
router.get('/working',function(req,res,next){
    var id = req.query.ID;

    Employer.findOne({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else{
            MatchedJob.find({REGISTRATION:obj.REGISTRATION,STATUS:2},function(err,matchedJob){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                return res.status(200).json({status:"1",matchedJob});
            })
        }
    })
})

/**
 * if matched job is approved, change matched job's state
 * use POST
 * use JSON
 * @param _id is matchedjob's id
 */
router.post('/',function(req,res,next){
    var _id = req.body._id;
    var employerAddress = null;
    var employeeAddress = null;

    MatchedJob.updateOne({_id:_id},{STATUS:2},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else{
            MatchedJob.findOne({_id:_id},function(err,obj){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                else if(!obj){
                    return res.status(400).send({status:"2"});
                }
                else{
                    Employer.findOne({REGISTRATION:obj.REGISTRATION},function(err,employer){
                        if(err){
                            return res.status(500).send({status:"3"});
                        }
                        else{
                            //get employer's klaytn address
                            employerAddress = caver.getAddress(employer.KLAYTNPRIVATEKEY);
                            Employee.findOne({SOCIALSECURITY:obj.SOCIALSECURITY},function(err,employee){
                                if(err){
                                    return res.status(500).send({status:"3"});
                                }
                                else{
                                    //get employee's klaytn address
                                    employeeAddress = caver.getAddress(employee.KLAYTNPRIVATEKEY);
                                    console.log(employeeAddress)
                                    try{
                                        //record part time job info to klaytn blockchain
                                        caver.setRecord(employerAddress,employeeAddress,new Date(obj.STARTDATE).getTime());
                                        return res.status(201).send({status:"1"});
                                    }
                                    catch(err){
                                        console.log(err);
                                        return res.status(500).send({status:"3"});
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

/**
 * if matched job is rejected, delete matched job and save to joboffer
 * use DELETE
 * use JSON
 * @param _id is matchedjob's id
 */
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