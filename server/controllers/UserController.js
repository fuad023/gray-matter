import User from '../models/userMode.js'
import jwt from "jsonwebtoken"

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.GRAY_CODE, {expiresIn: '5d'})
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.loginUser(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch(error) {
     res.status(400).json({error: error.message})
  }

}

const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signupUser(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch(error) {
     res.status(400).json({error: error.message})
  }

}

export {loginUser, signupUser}

