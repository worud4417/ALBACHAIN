/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is employer's mongodb schema
 */

var mongoose = require("mongoose");
//mongodb plugin for primary key's auto increment
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/main");
autoIncrement.initialize(connection);

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
        type:String,
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
    }
});

employerSchema.plugin(autoIncrement.plugin,'employer');
module.exports = connection.model("employer",employerSchema);