
const Card = require("../models/cardModel")
const User = require("../models/customerModel")
const check = require("../utility/validator")
  

const createCard = async function (req, res) {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "enter data in body to create card" })
        }

        let { cardType, customerName, customerID } = data

        if (!cardType) {
            return res.status(400).send({ status: false, message: "enter cardType" })
        }

        if (!["REGULAR", "SPECIAL"].includes(cardType)) {
            return res.status(400).send({ status: false, message: "cardType only REGULAR/SPECIAL" })
        }
        if (!customerName) {
            return res.status(400).send({ status: false, message: "enter customerName" })
        }
        if (!check.isValidFullname(customerName)) {
            return res.status(400).send({ status: false, message: "customerName only should be valid" })

        }
        let customer = await User.findOne({ customerID: customerID })
        if (!customer) {
            return res.status(404).send({ status: false, message: `customerID not found ${customerID}` })
        }
        let checkCustomer = await Card.findOne({ customerID: customerID })
        if (checkCustomer) {
            return res.status(400).send({ status: false, message: `Card already present with this customerID ${customerID}` })
        }

        let cards = await Card.find()
        data.cardNumber = "C" + (cards.length + 1).toString().padStart((4 - cards.length.toString().length), '0');

        let createdCard = await Card.create(data)
        return res.status(201).send({ status: true, message: "Card Created successfully", data: createdCard })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-

const getAllCardList = async (req, res) => {
    try {
        let allCards = await Card.find()
        if (allCards.length == 0) {
            return res.status(404).send({ status: false, message: "Cards not found" })
        }

        return res.status(200).send({ status: true, message: "All cards Details", data: allCards })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createCard, getAllCardList }