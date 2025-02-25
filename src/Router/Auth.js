const express = require("express");
const router = express.Router();

const authController = require("../App/Controllers/AuthController");

// register
router.post("/register", authController.register);
router.get("/register", authController.ViewRegister);

// auth.js
router.post("/login", authController.login);
router.get("/login", authController.ViewLogin);

// auth.js
const jwt = require('jsonwebtoken');

// Hàm để đăng nhập người dùng
function login(req, res) {
    // Giả sử bạn đã xác thực người dùng thành công
    const userId = 123; // Lấy ID người dùng từ cơ sở dữ liệu

    // Lấy secret key từ biến môi trường
    const secretKey = process.env.SECRET_KEY || 'your-default-secret-key';

    if (!secretKey) {
        return res.status(500).send("Server error: secretOrPrivateKey must have a value");
    }

    // Tạo token
    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '1h' });

    // Trả token về cho người dùng
    res.json({ token });
}

module.exports = { login };
module.exports = router;
