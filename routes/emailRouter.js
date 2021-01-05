const express = require("express");

const authController = require("../controllers/emailController");

const router = express.Router();

router.post("/send", authController.sendEmail);

module.exports = router;
