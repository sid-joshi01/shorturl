const User = require('../models/users');
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const { set } = require('mongoose');

async function handleUserSignUp(req,res) {
    try{
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

async function handleUserLogIn(req,res) {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).render("login", { error: "Invalid email or password" });
        }

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uuid", sessionId);
        res.status(200).redirect("/url");
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}




module.exports = {
    handleUserSignUp,
    handleUserLogIn
};