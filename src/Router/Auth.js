const express = require("express");
const router = express.Router();

const authController = require("../App/Controllers/AuthController");

// register
router.post("/register", authController.register);
router.get("/register", authController.ViewRegister);

// auth.js
router.post("/login", authController.login);
router.get("/login", authController.ViewLogin);

module.exports = router;
