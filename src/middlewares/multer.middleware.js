import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // express m file nhi hoti iss liye multer use karte hai 
                                            // req handle by express json data
                                          // cb call back
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.originalname)
      // localpath return 
    }
  })
  
export const upload = multer({ 
    storage, 
})