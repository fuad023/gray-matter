import { User } from "../models/User.js";

// @route   GET /api/user
// @desc    Get an user matching with email
export async function getUsers(req, res) {
    try {
        const email = req.body;
        const users = await User.find(email);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @route   POST /api/user
// @desc    Create a new user
export async function postUser(req, res) {
    try {
        const user = new User(req.body);

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
