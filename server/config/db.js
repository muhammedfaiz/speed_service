import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// Load environment variables from.env file

configDotenv();

// Connect to MongoDB
const connect = async () => {
    try{
        await mongoose
        .connect(process.env.MONGO_URI,{
            ssl:false
        });
        console.log("MongoDB Connected")
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
};

export default connect;