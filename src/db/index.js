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
        console.log("zdxfghj");
    }catch(error){
        // console.log("zdfghj");
        console.log("MONGODB CONNECTION FAILED",error);
        // console.log("bc");
        process.exit(1);
    }
}
export default connectDB;
