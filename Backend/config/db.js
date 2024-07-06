import mongoose from "mongoose"

export  const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://rahulbandgar3737:Rahul3755@cluster0.mnxajni.mongodb.net/food-del').then(()=>{
        console.log("DB connected");
    })
}

