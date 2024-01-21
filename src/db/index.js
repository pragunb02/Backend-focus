// import mongoose from "mongoose";
// import {DB_NAME} from "../constants.js";

// const connectDB= async ()=>{
//     try{
//         console.log("pp");
//         const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log(`\n MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`);
//     }catch(error){
//         console.log("MONGODB CONNECTION FAILED",error);
//         process.exit(1);
//     }
// }
// export default connectDB;


import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
import express from "express";

const app=express();

const connectDB= async ()=>{
    try{
        // console.log("pp");
        // console.log(DB_NAME);
        // console.log(process.env.MONGODB_URI);
        // console.log("PPPPPP");
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`);
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch(error){
        // console.log("zdfghj");
        console.log("MONGODB CONNECTION FAILED",error);
        // console.log("bc");
        process.exit(1);
    }
}
export default connectDB;
