const jwt = require("jsonwebtoken");

const authValidator = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        req.username = verified.username;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" });
    }
};

const authProvider = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) new Error("Unauthorized");

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        req.username = verified.username;
    } catch (err) {
        req.user = undefined;
        req.username = 'guest';
    }

    next();
};

module.exports = { authValidator, authProvider };
