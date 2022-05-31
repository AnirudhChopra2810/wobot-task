const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.logIn);

module.exports = router;