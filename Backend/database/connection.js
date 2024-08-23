import mongoose from "mongoose";

const dbConnection =  async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected using mongoose");
      } catch (err) {
        console.log("Some error while connecting to db: " + err);
      }
}

export default dbConnection