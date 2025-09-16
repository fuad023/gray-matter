import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.SECRET);

      // get user from the token
      req.user = await User.findById(decoded._id).select("_id");

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: "Not authorized, token failed!" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token!" });
  }
};

export default requireAuth;
