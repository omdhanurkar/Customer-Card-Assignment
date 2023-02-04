const express = require('express');
const router = express.Router();
const { createCustomer, getCustomer, deleteCustomer } = require("../controllers/customerController")
const { createCard,getAllCardList } = require("../controllers/cardController")


router.post("/createCustomer", createCustomer)
router.get("/getCustomer", getCustomer)
router.delete("/deleteCustomer", deleteCustomer)

router.post("/createCard", createCard)
router.get("/getAllCardList", getAllCardList)
 





module.exports = router