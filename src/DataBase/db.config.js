import mongoose from "mongoose";

export const dataBaseConnection = async()=>{
    const connecation = await mongoose.connect(process.env.MONGO_URL)
}