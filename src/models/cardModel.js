const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
        require: true,
        default: "ACTIVE",
        enum: ["ACTIVE", "INACTIVE"]

    },
    vision: { 
        type: String,
        require: true
    },
    customerID: {
        type: ObjectId,
        ref: 'User',
        require: true
    },
  
}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema)