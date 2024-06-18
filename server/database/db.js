import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"newsapp",
    }).then((c)=> console.log(`Datebase Connected ${c.connection.host}`))
      .catch((e)=> console.log(e))
}