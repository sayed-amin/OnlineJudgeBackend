const { User } = require('../DataBase/database');

const registerValidator = async (req, res, next) => {
    let { name, username, email, password, passwordVerify } = req.body;

    name = name ? name.trim() : '';
    username = username ? username.trim() : '';

    try {
        if (!name || !username || !email || !password || !passwordVerify)
            return res.status(400).json({
                error: `Please enter all required fields. Missing :${!name ? ' name' : ''}${!username ? ' username' : ''}${!email ? ' email' : ''}${!password ? ' password' : ''}${!passwordVerify ? ' passwordVerify' : ''}`
            });

        if (name.length >= 10)
            return res.status(400).json({ error: "Name should be less than 10 characters" });

        if (username.length >= 10 || username.length < 4)
            return res.status(400).json({
                error: "Username should be less than 10 characters and greater than or equal to 4 characters"
            });

        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)))
            return res.status(400).json({ error: "Email is not valid" });

        if (password.length < 6)
            return res.status(400).json({ error: "Please enter a password of at least 6 characters." });

        if (password !== passwordVerify)
            return res.status(400).json({ error: "Please enter the same password twice." });

        if (username.toLowerCase().includes('amin'))
            return res.status(400).json({ error: "These Usernames (including 'amin') are reserved for Admin Only!" });

        const existingUserE = await User.findOneUser({ email });
        if (existingUserE)
            return res.status(400).json({ error: "An account with this email already exists." });

        const existingUserU = await User.findOneUser({ username });
        if (existingUserU)
            return res.status(400).json({ error: "An account with this username already exists." });

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Error" });
    }
};

module.exports = registerValidator;
