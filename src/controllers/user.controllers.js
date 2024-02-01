import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";


const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db  // nosql mai object 
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body  // get datra from fontend in form of "form" or "json" not "url"
    // console.log("email: ", email);
    // console.log(req);
    // console.log(req.body);

     
    if (username==="" && email==="") {
        throw new ApiError(400, "username or email is required")
    }

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // console.log(req);
    // console.log(req.files);
    if(!(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0)){
        // console.log("oooooo");
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
           let  coverImageLocalPath = req.files.coverImage[0].path
            fs.unlinkSync(coverImageLocalPath)
        }
        throw new ApiError(400, "bla bla bla Avatar file is required")
        console.log("gkjggjc");
        return;
    }
    console.log("gc");
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log(avatarLocalPath);
    // req.files (.files provided by middleware (multer))
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath="";
    // scope
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    // console.log(coverImageLocalPath);
    if (!avatarLocalPath) {
        // console.log("fdfrxc")
        throw new ApiError(400, "Avatar file is required")
    }

    // await ??
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    

    if (!avatar) {
        // console.log("notdone");
        throw new ApiError(400, "Avatar file is required")
    }else{
        // console.log("done");
    }
   
   // awaut ?? 
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    // https://youtu.be/VKXnSwNm_lE?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&t=2517 ?? watch history ?? refreastoken

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    /// why api response ??
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    // return res.status(201).json({createdUser})

} )



// const registerUser = asyncHandler(async (req, res) => {
//     console.log("zxgv");
//     res.status(200).json({
//         message:"ok"
//     })
// } )

export {
    registerUser
}

