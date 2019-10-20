/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * use REST api
 * employee login process
 * fort number is 3000
 * http://(ipaddress):3000/employeelogin
 */


var express = require("express");
var router = express.Router();

//get employee's mongodb schema
var Employee = require('../../model/Employee');

/**
 * login employee
 * use POST
 * use JSON
 * @param ID is employee's id
 * @param PASSWORD is employee's password
 */
router.post('/',function(req,res,next){
    var id = req.body.ID;
    var password = req.body.PASSWORD;

    Employee.findOne({ID:id},function(err,obj){
        if(err){
            return res.status(500).send({status:"3"});
        }
        else if(obj == null){
            return res.status(400).send({status:"2"});
        }
        else if(obj.PASSWORD != password){
            return res.status(400).send({status:"2"});
        }
        else{
            //return employee's info
            return res.status(200).json({
                status:"1",
                ID:obj.ID,
                NAME:obj.NAME,
                SOCIALSECURITY:obj.SOCIALSECURITY,
                CALLNUMBER:obj.CALLNUMBER,
            });
        }
    })
});

module.exports = router;