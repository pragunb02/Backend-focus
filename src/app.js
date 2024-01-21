// express 
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// no use of body parser already imported nowadays
const app=express();

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true,
}));

app.use(express.json({
  limit:"16kb",
}));

app.use(expresss.urlencoded({
    extended:true,
    limit:"16kb",
}));  // " " %20 encoded in url
// objects k ander bhi objects

app.use(express.static("public"));
// public assest

app.use(cookieParser());


export {app};

// (req,res)
// (err,req,res,next)