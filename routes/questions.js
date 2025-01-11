const express = require('express');
const router = express.Router();
const Question = require('../DataBase/Model/Question'); // Adjust the path to your Question model

// Route to insert a new question
router.post('/', async (req, res) => {
    try {
        const {
            difficulty,
            name,
            description,
            examples,
            noOfSubm,
            noOfSuccess,
            testcase
        } = req.body;

        // Validate the required fields
        if (!difficulty || !name || !description || !examples || !testcase) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newQuestion = new Question({
            difficulty,
            name,
            description,
            examples,
            noOfSubm: noOfSubm || 0, // Default to 0 if not provided
            noOfSuccess: noOfSuccess || 0, // Default to 0 if not provided
            testcase
        });

        // Save to database
        const savedQuestion = await newQuestion.save();
        res.status(201).json({ message: "Question added successfully.", question: savedQuestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while adding the question." });
    }
});

module.exports = router;
