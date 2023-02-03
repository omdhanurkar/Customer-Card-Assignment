const express = require('express');
const router = express.Router();
const { createUser, getUser, deleteUser } = require("../controllers/userController")


router.post("/createUser", createUser)
router.get("/getUser", getUser)
router.delete("/deleteUser", deleteUser)

 


module.exports = router