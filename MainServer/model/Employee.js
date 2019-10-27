/**
 * main server 
 * @project ALBACHAIN
 * @author JaeGyeong Lee
 * this module is employee's mongodb schema
 */

var mongoose = require("mongoose");
//mongodb plugin for primary key's auto increment
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/main");
autoIncrement.initialize(connection);

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
        type:String,
        required:true
    },
    KLAYTNPRIVATEKEY:{
        type:String
    },
    RATING:{
        type:Number,
        default:0
    }
});

employeeSchema.plugin(autoIncrement.plugin,'employee');
module.exports = connection.model("employee",employeeSchema);