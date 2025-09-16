import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// generate JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

// register a user
export const register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const user = await UserModel.register(name, surname, email, password);
    const token = createToken(user._id);

    res.status(200).json({ message: "User registered successfully", _id: user._id, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ message: "Login successful", _id: user._id, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// logout a user
export const logout = (req, res) => {
  // frontend to simply delete token from localStorage/cookies
  res.status(200).json({ message: "Logout successful" });
};
