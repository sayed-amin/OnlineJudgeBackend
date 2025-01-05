const bcrypt = require('bcryptjs');
const { User } = require('../DataBase/database');

const loginValidatorHelper = async (req, res, next, credential, credentialName, password) => {
    let existingUser = undefined;
    credentialName === 'email' && (existingUser = await User.findOneUser({ email: credential }));
    credentialName === 'username' && (existingUser = await User.findOneUser({ username: credential }));

    if (!existingUser)
        return res.status(401).json({ error: `Wrong ${credentialName} or password.` });

    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect)
        return res.status(401).json({ error: `Wrong ${credentialName} or password.` });

    req.existingUser = existingUser;
    next();
};

const loginValidator = async (req, res, next) => {
    let { email, username, password } = req.body;

    username = username ? username.trim() : '';

    try {
        if (!password || !(email || username))
            return res.status(400).json({ error: `Please enter all required fields. Missing : (email or username)${!password ? ', password' : ''}` });

        await loginValidatorHelper(req, res, next, (email ? email : username), (email ? 'email' : 'username'), password);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Error" });
    }
};

module.exports = loginValidator;
