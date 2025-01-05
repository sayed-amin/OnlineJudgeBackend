const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
require('dotenv').config();


// Register a new user
const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role: 'user', 
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "1d" });
        user.token = token;
        user.password = undefined;

        res.status(201).json({ message: "You have successfully registered!", user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering user.");
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token =generateToken(user.id,user.password);
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error logging in.");
    }
};

module.exports = { registerUser, loginUser };
const fs = require('fs');
const path = require("path");
const { Authorization } = require('../DataBase/database');
const { dateTimeNowFormated, logger } = require('../utils/logging');

const stdoutDir = path.join(__dirname, "../server.log");
const stderrDir = path.join(__dirname, "../server.error");

const defaultNLines = 2000;

const readLastNLines = (filePath, start, nLines = defaultNLines) => {
    const fileBuffer = fs.readFileSync(filePath).toString().split('\n').reverse()
    const end = (start + nLines <= fileBuffer.length) ? (start + nLines) : undefined;
    return fileBuffer.slice(start, end).reverse().join('\n');
}

const getLogsController = (req, res) => {
    try {
        const pageNo = (req.query && req.query.pageNo && req.query.pageNo >= 1) ? req.query.pageNo : 1;
        if (!Authorization.isAdmin(req.username))
            return res.status(401).json({ msg: "Unautherized", error: 'Only admin can view this page' });
        const stdoutTxt = readLastNLines(stdoutDir, (pageNo - 1) * defaultNLines);
        const stderrTxt = readLastNLines(stderrDir, (pageNo - 1) * defaultNLines);
        return res.status(200).json({ stdoutTxt, stderrTxt });
    } catch (error) {
        logger.error(error, dateTimeNowFormated());
        return res.status(400).json({ msg: 'Internal Error', error });
    }
}

const logFromClient = (req, res) => {
    try {
        logger.log("Username:", req.username);
        logger.log("LOG:", req.body.msg);
        res.status(200).json('logged');
    } catch (err) {
        logger.error(err, dateTimeNowFormated());
        res.status(500).json(err);
    }
}


module.exports = {
    getLogsController, logFromClient
}
