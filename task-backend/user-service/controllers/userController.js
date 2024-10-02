// controllers/usercontrollers.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




// Register new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Register request received:", req.body);

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists");
            return res.status(400).json({ message: 'User already exists' });
        }
        console.log('Creating new user...');

        try {
            // Hash password before saving
            console.log("Generating Salt...");
            const salt = await bcrypt.genSalt(5);
            console.log("Generated Salt:", salt);

            console.log("Hashing password for:", password);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log("Hashed password:", hashedPassword);

            user = new User({
                name,
                email,
                password: hashedPassword,
            });

            // Save user to database
            await user.save();
            console.log("User registered successfully");

            // Create JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            res.status(201).json({ token, user });
        }
        catch (err) {
            console.error('Error during password hashing:', err);
            res.status(500).json({ message: 'Error in password hashing', err });
        }
    }
    catch (err) {
        console.error('Server error during registration:', err);
        res.status(500).json({ message: 'Server Error', err });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request received:", req.body);

        const user = await User.findOne({ email });
        console.log("user", user);
        if (!user) {
            console.log("Invalid Credentials");
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        console.log("Comparing Hashpassword");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Hashing not matched");
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        console.log("Updating last login time.. ");
        // Update last login
        user.lastLogin = Date.now();
        await user.save();
        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        req.session.token = token;
        console.log("Login Successfully with token", token);
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err });
    }
};

// Get User details
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err });
    }
};
