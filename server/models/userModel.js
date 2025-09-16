import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  // authentication
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, trim: true, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hash string

  // profile
  bio: { type: String, default: "", maxlength: 120, trim: true },
  birthday: { type: Date },
  website: { type: String, default: "" },
  
  // relations
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ids of users following the user
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ids of users being followed
  
  // interactions
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // ids of posts created by the user

  // status
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.register = async function (name, surname, email, password) {
  if (!name || !surname || !email || !password) {
    throw Error("Please fill all the fields.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use!");
  }

  // hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // save doc on database
  const user = await this.create({ name, surname, email, password: hash });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all the fields.");
  }

  const user = await this.findOne({ email });
  if (!user) throw Error("Email not found!");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password!");

  return user;
};

// search users by name or email
userSchema.statics.searchUsers = async function(query) {
  return this.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { surname: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ]
  }).select("name surname email profilePic");
};

const User = mongoose.model("User", userSchema);
export default User;