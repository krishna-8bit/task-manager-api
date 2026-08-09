// import dns from "node:dns/promises";

// dns.setServers(["1.1.1.1", "1.0.0.1"]);

import mongoose from "mongoose";
async function connectDB(){  
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected DB");
    }
    catch(error){
        console.error("Database connection failed:", error);
        throw error;
    }
}
export default connectDB;