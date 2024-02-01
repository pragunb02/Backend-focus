//#used file ghandling 
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";  // file system directly provided
          
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  
  const uploadOnCloudinary = async (localFilePath) => {
      try {
          if (!localFilePath){ 
            fs.unlinkSync(localFilePath)
            return null
          }

          //upload the file on cloudinary
          // console.log("heheh1");
          const response = await cloudinary.uploader.upload(localFilePath, {
              resource_type: "auto"
          })
          // console.log("heheh1");
        //   await cloudinary.uploader.upload(localFilePath, {
        //     resource_type: "auto"
        // })
          // file has been uploaded successfull
          // console.log("file is uploaded on cloudinary ", response.url);
        //   console.log("abcd",response);
        console.log("file uploaded",localFilePath)
          fs.unlinkSync(localFilePath)
          return response;
  
      } catch (error) {
          fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
          return null;
      }
  }
  
  
  
  export {uploadOnCloudinary}