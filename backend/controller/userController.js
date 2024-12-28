const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken');

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({ message: "Please fill all detail" });
        }
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send({ message: "Incorrect Password or Username" });
        }
        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return res.status(200).send({
            message: "User is login",
            userName: user.userName,
            token
        });
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
}

const signupUserController = async (req, res) => {
    try {
        const { userName, password, email, phone, address, securityAnswer } = req.body;
        if (!userName || !password || !email || !phone || !address || !securityAnswer) {
            return res.status(401).send({ message: "Please fill all detail" });
        }
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(401).send({ message: "Already User" });
        }
        const user = await userModel.create({ userName, email, password, phone, address, securityAnswer });

        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(201).send({
            message: "User is Created",
            token
        });
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
}

const updateUserController = async (req, res) => {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
        return res.status(400).send({ message: "Please fill all details" });
    }

    // Validate the email and security answer
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.securityAnswer !== answer) {
        return res.status(400).json({ message: "Incorrect answer" });
    }
    user.password = newPassword;
    await user.save();

    // Optionally, send an email notification for the password change

    res.status(200).json({ message: "Password updated successfully" });
};

const getUserNameController = async (req, res) => {
    try {
        // Extract user ID from the token payload
        const userId = req.user.id;

        // Fetch user details from the database
        const user = await userModel.findById(userId); // Replace with your DB query

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send username in response
        res.status(200).json({ success: true, userName: user.userName }); // Assuming your DB has 'username' field
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
module.exports = {
    loginUserController,
    signupUserController,
    updateUserController,
    getUserNameController
}