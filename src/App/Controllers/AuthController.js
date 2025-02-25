const bcrypt = require("bcrypt");
const User = require("../Model/User_data/User");
const path = require("path");
const jwt = require("jsonwebtoken");

class AuthController {
  ViewRegister(req, res) {
    res.sendFile(
      path.join(__dirname, "../../Resources/Views/Auth/register.html")
    );
  }
  ViewLogin(req,res){
    res.sendFile(
      path.join(__dirname, "../../Resources/Views/Auth/login.html")
    );
  
  }

  async register(req, res) {
    try {
      // check data from request
      const { username, password, email, phone, surname } = req.body;
      if (!username || !password || !email || !phone || !surname) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // check email from request
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // hash password
      console.log("Received request:", req.body);
      const salt = await bcrypt.genSalt(10);
      const hasherPassword = await bcrypt.hash(password, salt);
      console.log("Hashed password:", hasherPassword);

      // create new user
      const newUser = new User({
        username,
        password: hasherPassword,
        email,
        phone,
        surname,
      });
      console.log("New user:", newUser);
      
      // save user
      await newUser.save();
      console.log("User:", newUser);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();