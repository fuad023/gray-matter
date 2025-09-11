import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator"

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signupUser = async function(email, password) {

    if(!email || !password) {
        throw Error("All fields must be field")
    }

    if(!validator.isEmail(email)) {
        throw Error("Email is not valid!")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error("Email is already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

userSchema.statics.loginUser = async function(email, password) {
    if(!email || !password) {
        throw Error("All fields must be field")
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error("Icorrect email!")
    }    

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incurrect credentials")
    }

    return user
}

export default mongoose.model('User', userSchema)