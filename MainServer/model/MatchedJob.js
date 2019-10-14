var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/main");
autoIncrement.initialize(connection);

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
    PERIOD:{
        type:Number,
        required:true
    },
    TEXT:{
        type:String
    },
    JOINDATE:{
        type:Date,
        required:true
    }
});

MatchedJobSchema.plugin(autoIncrement.plugin,'matchedJob');
module.exports = connection.model("matchedJob",MatchedJobSchema);