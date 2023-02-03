const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (!value) return false
    return true;
};

//------------------------------- ObjectId validation --------------------------------------------//

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId);

}

//------------------------------- name regex --------------------------------------------//

const isValidname = function (name) {
    return /^[a-z ,.'-]+$/i.test(name);
};
//------------------------------- email regex --------------------------------------------//

const isVAlidEmail = function (email) {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(email)
}

//------------------------------- phone regex --------------------------------------------//

const isValidPhone = function (phone) {
    return (/^[6-9]\d{9}$/).test(phone)

}

const isValidDOB = function (value) {
    return (/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/).test(value)

}

const isValidStatus = function (value) {
    return ["ACTIVE", "INACTIVE"].indexOf(value) !== -1
}

module.exports = {
    isValid,
    isValidname,
    isVAlidEmail,
    isValidPhone,
    isValidObjectId,
    isValidDOB,
    isValidStatus
}