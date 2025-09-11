import User from '../models/userMode'
import jwt from "jsonwebtoken"

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.GRAY_CODE, {expiresIn: '5d'})
}

const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signupUser(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch(error) {
     res.status(400).json()({error: error.mssg})
  }
  res.json({mssg: 'signup user'})
}

module.exports = {loginUser, signupUser}

