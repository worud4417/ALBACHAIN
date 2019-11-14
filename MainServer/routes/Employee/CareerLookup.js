/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * search the record to employee's job 
 * fort number is 3000
 * http://(ipaddress):3000/employeecareerlookup
 */

var express = require("express");
var router = express.Router();
var message = require("../../utils/ErrorMessage");

//get caver-js utils to search the job record
var caver = require('../../utils/caver');
//get web3-js utils
var web3 = require('../../utils/Web3');

//get employee's mongodb schema
var Employee = require('../../model/Employee');
//get matchedjob's mongodb schema
var MatchedJob = require('../../model/MatchedJob');

/**
 * search the employee's record from klaytn block chain network
 * use GET
 * use JSON
 * @param ID is employee's id
 */
router.get('/',function(req,res,next){
    var id = req.query.ID;

    Employee.findOne({ID:id},async function(err,obj){
        if(err){
            return res.status(500).send({status:"3",errormessage:message.serverError});
        }
        else if(obj == null){
            return res.status(400).send({status:"2",errormessage:message.idNotFounded});
        }
        else{
            try{
                // var record = await caver.getEmployeeRecord(obj.SOCIALSECURITY);
                var record = await caver.getAllRecord();
                var recordArray = record[0].map(function(e,i){
                    return [e,record[1][i],record[2][i],record[3][i],record[4][i]];
                });

                console.log(recordArray);

                return res.status(200).send({status:"1",recordArray});
            }
            catch(e){
                console.log(e);
                return res.status(500).send({status:"3",errormessage:message.serverError});
            }
        }
    })
})

module.exports = router;