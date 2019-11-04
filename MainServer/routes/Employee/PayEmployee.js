var express = require('express');
var router = express.Router();
var message = require('../../utils/ErrorMessage');

var Employee = require('../../model/Employee');
var MatchedJob = require('../../model/MatchedJob');

router.get('/',function(req,res,next){
    id = req.query.ID;

    if(id == undefined){
        return res.status(400).send({status:"2",errormessage:message.nullParam});
    }
    else{
        Employee.findOne({ID:id},function(err,obj){
            if(err){
                return res.status(500).send({status:"3",errormessage:message.serverError});
            }
            else if(obj == null){
                return res.status("400").send({status:"2",errormessage:message.idNotFounded});
            }
            else{
                var socialsecurity = obj.SOCIALSECURITY;
                MatchedJob.find({SOCIALSECURITY:socialsecurity},function(err,matchedJob){
                    if(err){
                        return res.status(500).send({status:"3",errormessage:message.serverError});
                    }
                    else{
                        var resultArray = new Array();
                        matchedJob.forEach(function(result){
                            var period = result.ENDDATE-result.STARTDATE;

                            resultArray.push({
                                TOTALPAY : (Math.round(period/1000/60/60*10))/10*result.PAY,
                                PAY : result.PAY,
                                STARTDATE:result.STARTDATE,
                                ENDDATE : result.ENDDATE,
                                EMPLOYEENAME: result.EMPLOYEENAME,
                                EMPLOYERNAME : result.EMPLOYERNAME,
                                _id : result._id
                            })
                        })

                        return res.status(200).send({status:"1",resultArray});
                    }
                })
            }
        })
    }
})

module.exports = router;