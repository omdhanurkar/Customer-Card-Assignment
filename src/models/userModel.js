const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        require: true
    },
    DOB: {
        type: Date,
        require: true
    },
    emailID: {
        type: String,
        require: true
    },
    address: { 
        type: String,
        require: true
    },
    customerID: {
        type: String
    },
    status: {
        type: String,
        require: true,
        enum: ["ACTIVE", "INACTIVE"]
    }, 
    isDeleted:{
        type:String,
        default:false
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema)