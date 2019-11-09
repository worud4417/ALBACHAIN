/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is employer's mongodb schema
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

var employerSchema = new Schema({
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
    REGISTRATION:{
        type:Number,
        required:true
    },
    CALLNUMBER:{
        type:String
    },
    ADDRESS:{
        type:String
    },
    JOINDATE:{
        type:Date,
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

employerSchema.plugin(autoIncrement.plugin,'employer');
module.exports = connection.model("employer",employerSchema);