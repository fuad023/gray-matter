import mongoose from "mongoose";

const studentschema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String, require: true, unique: true}
    }
);

const Student = mongoose.model('Student', studentschema);

export default Student;