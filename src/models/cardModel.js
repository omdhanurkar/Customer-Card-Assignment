const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        require: true  
    },
    cardType: {
        type: String,
        require: true,
        enum: ["REGULAR", "SPECIAL"]
    },
    customerName: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "INACTIVE"]
    },
    vision: {
        type: String,
    },
    customerID: {
        type: String,
        ref: "User",
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema)