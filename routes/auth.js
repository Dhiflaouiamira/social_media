const express = require("express");
const { User } = require("../models/User");
const Jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");

const router = express.Router();


// Add new user
router.post("/register", async (req, res) => {
    // #swagger.tags = ['users']
    // #swagger.description = 'Add new user.'
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await Bcrypt.genSalt(10);
        const hashedPassword = await Bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            // ... other user properties ...
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});
// User login
router.post("/login", async (req, res) => {
    // #swagger.tags = ['users']
    // #swagger.description = 'User login.'
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const passwordMatch = await Bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = Jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while logging in" });
    }
});

module.exports = router;

module.exports = router;
