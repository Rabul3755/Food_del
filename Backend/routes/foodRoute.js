import express from "express"   
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter =express.Router()

// Image sotrage Engine, Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. 

const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload= multer ({storage:storage})
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post ("/remove",removeFood)







export default foodRouter
