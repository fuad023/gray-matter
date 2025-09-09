import Student from "../model/Student";
export const getStudents = async(req, res) =>
{
    try{
        const students = await Student.find();
        res.json(students);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const newStudent = async (req, res) => 
{
    try {
        const {name, email} = req.body;
        const student = new Student({name, email});
        await student.save();
        res.status(201).json(student);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}