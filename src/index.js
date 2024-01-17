import mongoose from "mongoose";
import {DB_NAME} from "./constants"
import express from "express"
const app=express();










// 1st approach

/*
// function connectDB(){}
// connectDB()

;(async ()=>{
    try{
        await mongoose.connect('${process.env.MONGODV_URI}/${DB_NAME}'); // db connect
        app.on("error",(error)=>{   // listeners erro on express app
            console.log("ERR:",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log('App is listening on port $ {process.env.PORT}');
        })
    }catch(error){
        console.log("ERROR:",error);
        throw err;
    }
})()

*/