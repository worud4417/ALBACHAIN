/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is employee's mongodb schema
 */

 //module for using mongodb
var mongoose = require("mongoose");
//mongodb plugin for primary key's auto increment
var autoIncrement = require('mongoose-auto-increment');

//set connection to db
var connection = mongoose.createConnection("mongodb://localhost/main");
autoIncrement.initialize(connection);

//make schema
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    ID:{
        type:String,
        required:true
    },
    PASSWORD:{
        type:String,
        required:true
    },
    NAME:{
        type:String,
        required:true
    },
    CALLNUMBER:{
        type:String
    },
    JOINDATE:{
        type:Date,
    },
    SOCIALSECURITY:{
        type:Number,
        required:true
    },
    KLAYTNPRIVATEKEY:{
        type:String
    },
    RATING:{
        type:Number,
        default:0
    },
    IMAGESOURCE : {
        type:String
    }
});

employeeSchema.plugin(autoIncrement.plugin,'employee');
module.exports = connection.model("employee",employeeSchema);