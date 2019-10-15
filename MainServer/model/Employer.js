var mongoose = require("mongoose");
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
    }
});

employerSchema.plugin(autoIncrement.plugin,'employer');
module.exports = connection.model("employer",employerSchema);