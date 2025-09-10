import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed: ", error);
        process.exit(1);
    }
}
