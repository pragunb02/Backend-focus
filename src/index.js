// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
// import {DB_NAME} from "../constants.js";
// import express from "express";

// const app=express();
import {app} from './app.js'

dotenv.config({
    path:'./.env'
})

// asysnc return promises then catch
// connectDB();
connectDB()
  .then(() => {
    // console.log("ighar");
    app.on("error",(error)=>{   // listeners erro on express app  // express not mighht connect but mongo os connected
        console.log("ERR:",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // console.log("igharw");
    console.error("MongoDB Connection Error hai!!!", error);
  });




// 1st approach
/*
import mongoose from "mongoose";
import {DB_NAME} from "./constants"
import express from "express"
const app=express();

// function connectDB(){}
// connectDB()

// automated return
;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // db connect
        app.on("error",(error)=>{   // listeners erro on express app  // express not mighht connect but mongo os connected
            console.log("ERR:",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port $ {process.env.PORT}`);
        })
    }catch(error){
        console.log("ERROR:",error);
        throw err;
    }
})()

*/