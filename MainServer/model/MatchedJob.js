/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is matched job's mongodb schema
 */

 //module for using mongodb
var mongoose = require("mongoose");
//mongodb plugin for primary key's auto increment
var autoIncrement = require('mongoose-auto-increment');

//set connection to db
var connection = mongoose.createConnection("mongodb://localhost/main");
autoIncrement.initialize(connection);

//mack schema
var Schema = mongoose.Schema;

var MatchedJobSchema = new Schema({
    REGISTRATION:{
        type:String,
        required:true
    },
    SOCIALSECURITY:{
        type:String,
        required:true
    },
    STARTDATE:{
        type:Date,
        required:true
    },
    ENDDATE:{
        type:Date,
        required:true
    },
    TEXT:{
        type:String
    },
    STATUS:{
        type:Number,
        required:true
    },
    JOINDATE:{
        type:Date,
        required:true
    },
    EMPLOYEENAME:{
        type:String,
        required:true
    },
    EMPLOYERNAME:{
        type:String,
        required:true
    },
    PAY:{
        type:Number,
        required:true
    }
});

MatchedJobSchema.plugin(autoIncrement.plugin,'matchedJob');
module.exports = connection.model("matchedJob",MatchedJobSchema);