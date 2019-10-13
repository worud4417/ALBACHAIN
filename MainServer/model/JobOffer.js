var mongoose = require("mongoose");
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
    Text:{
        type:String
    },
    STARTDATE:{
        type:Date,
        required:true
    },
    PERIOD:{
        type:Number,
        required:true
    }
});

jobOfferSchema.plugin(autoIncrement.plugin,'jobOffer');
module.exports = connection.model("jobOffer",jobOfferSchema);