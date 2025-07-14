import mongoose from "mongoose";
import dotenv from 'dotenv'
import { User } from "./models.js";

dotenv.config()
export const connectDB = async () =>{
    await mongoose.connect(process.env.MONGODB_URL!)
    console.log(process.env.MONGODB_URL)
}
