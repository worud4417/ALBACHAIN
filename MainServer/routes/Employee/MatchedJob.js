/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employee search the matched job info
 * fort number is 3000
 * http://(ipaddress):3000/employeematchedjob
 */

var express = require('express');
var router = express.Router();

//get the matchedjob's mongodb schema
var MatchedJob = require('../../model/MatchedJob');
//get the employee's mongodb schema
var Employee = require('../../model/Employee');

/**
 * get the pending approval job
 * use GET
 * @param ID is employee's id
 */
router.get('/',function(req,res,next){
    var id = req.query.ID

    Employee.findOne({ID:id},function(err,employee){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(employee == null){
            return res.status(400).send({status:"2"});
        }
        else{
            MatchedJob.find({SOCIALSECURITY:employee.SOCIALSECURITY,STATUS:"1"},function(err,obj){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                else{
                    return res.status(200).json({status:"1",obj})
                }
            })
        }
    })
})

/**
 * get the approval job
 * use GET
 * http://(ipaddress):3000/employeematchedjob/matched
 * @param ID is employee's id
 */
router.get('/matched',function(req,res,next){
    var id = req.query.ID

    Employee.findOne({ID:id},function(err,employee){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(employee == null){
            return res.status(400).send({status:"2"});
        }
        else{
            MatchedJob.find({SOCIALSECURITY:employee.SOCIALSECURITY,STATUS:"2"},function(err,obj){
                if(err){
                    return res.status(500).send({status:"3"});
                }
                else{
                    return res.status(200).json({status:"1",obj})
                }
            })
        }
    })
})

module.exports = router;