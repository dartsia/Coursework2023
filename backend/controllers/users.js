const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/users.models');
const auth = require('../utils/auth');

SECRET_KEY = auth.key;

class UserController {
    static async register(req,res) {
        //input validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //check if the user already exists
            const existingUser = await User.getUserByEmail(email);
            if(existingUser) {
                return res.status(400).json({ error: 'User already exists '});
            }

            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //create a new user
            const userID = await User.createUser(email, hashedPassword);

            //respond with success
            res.status(201).send('User registered successfully', userID);
        } catch (err) {
            console.error(err);
            res.status(500).send('Sever error');
        }
    }

    static async login(req,res) {
        //input validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //fetch the user from the database
            const user = await User.getUserByEmail(email);
            if(!user) {
                return res.status(401).send('Invalid credentials');
            }

            //check if the password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                return res.status(401).send('Invalid credentials');
            }

            //generate access token
            const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
                expiresIn: '15m',
            });

            //generate refresh token
            const refreshToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
                expiresIn: '7d',
            });

            //respond with tokens
            res.status(200).json({ accessToken, refreshToken });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
}

module.exports = UserController;