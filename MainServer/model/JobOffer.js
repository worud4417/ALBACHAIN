/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is offred job's mongodb schema
 */

var mongoose = require("mongoose");
//mongodb plugin for primary key's auto increment
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/main");
autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var jobOfferSchema = new Schema({
    ID:{
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
    TEXT:{
        type:String
    },
    STARTDATE:{
        type:Date,
        required:true
    },
    ENDDATE:{
        type:Date,
        required:true
    },
    PAY:{
        type:Number,
        required:true
    }
});

jobOfferSchema.plugin(autoIncrement.plugin,'jobOffer');
module.exports = connection.model("jobOffer",jobOfferSchema);