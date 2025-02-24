//  /db/
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 

export const connectDb = async () => {    
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Mongodb connected !! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1);
    }
};
