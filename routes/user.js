const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();



// Get all users (protected)
router.get("/", authenticateJWT, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from results
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID (protected)
router.get("/:id", authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password from result
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user (protected)
router.put("/:id", authenticateJWT, async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const updatedData = {};
        if (firstname) updatedData.firstname = firstname;
        if (lastname) updatedData.lastname = lastname;
        if (email) updatedData.email = email;

        if (password) {
            // Hash new password if provided
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user (protected)
router.delete("/:id", authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = { router };
