const Customer = require("../models/customerModel");
const check = require("../utility/validator")
const uuid = require("uuid");
const uniqeId = uuid.v4()

const createCustomer = async function (req, res) {
    try {
        let data = req.body
        const { firstName, lastName, mobileNumber, DOB, emailID, address, status } = data

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "provide some data in body" });

        if (!(firstName))
            return res.status(400).send({ status: false, message: "title is required" });
        if (!(check.isValidname(firstName)))
            return res.status(400).send({ status: false, message: "fistname should be valid" });

        if (!(lastName))
            return res.status(400).send({ status: false, message: "lastName is required" });
        if (!(check.isValidname(lastName)))
            return res.status(400).send({ status: false, message: "lastName should be valid" });

        if (!(mobileNumber))
            return res.status(400).send({ status: false, message: "mobileNumber is required" });
        if (!check.isValidPhone(mobileNumber))
            return res.status(400).send({ status: false, message: "mobileNumber should be valid" });
        const checkUsedMobile = await Customer.findOne({ mobileNumber: mobileNumber });
        if (checkUsedMobile) {
            return res.status(400).send({ status: false, message: "mobile Number already used" });
        }

        if (!(DOB))
            return res.status(400).send({ status: false, message: "DOB is required" });
        if (check.isValidDOB(DOB))
            return res.status(400).send({ status: false, message: "DOB should be valid" });

        if (!(emailID))
            return res.status(400).send({ status: false, message: "emailID is required" });
        if (!(check.isVAlidEmail(emailID)))
            return res.status(400).send({ status: false, message: "emailID should be valid" });
        const checkusedEmail = await Customer.findOne({ emailID: emailID });
        if (checkusedEmail) {
            return res.status(400).send({ status: false, message: "email already used" });
        }
  
        if (!(address))
            return res.status(400).send({ status: false, message: "address is required" });

        if (!(status))
            return res.status(400).send({ status: false, message: "status is required" });
        if (!(check.isValidStatus(status)))
            return res.status(400).send({ status: false, message: "status should be ACTIVE or INACTIVE only" });

        const customerDetails = { firstName, lastName, mobileNumber, DOB, emailID, address, customerID: uniqeId, status }

        const newCustomer = await Customer.create(customerDetails);
        return res.status(201).send({ status: true, message: "customer created successfully", data: newCustomer });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const getCustomer = async function (req, res) {
    try {
        const activeCustomer = await Customer.find({ status: "ACTIVE", isDeleted: false })
        if (activeCustomer.length == 0) {
            return res.status(404).send({ status: false, message: "customer not found" })
        }
        return res.status(200).send({ status: true, message: 'customer profile details', data: activeCustomer })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const deleteCustomer = async function (req, res) {
    try {
        let data = req.body

        let tobedeleted = await Customer.findOneAndUpdate(
            { data, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true })

        if (!tobedeleted) {
            return res.status(404).send({ status: false, message: "customer not found" })
        }

        return res.status(200).send({ status: true, message: 'Customer  deleted successfully' })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

module.exports = { createCustomer, getCustomer, deleteCustomer }