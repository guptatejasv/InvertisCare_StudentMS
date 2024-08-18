import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose
      .connect(
        "mmongodb+srv://guptatejasv86086:IHiNa09sVQaCgM9N@cluster0.6etxq2u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => {
        console.log("Connected to the database.");
      });
  } catch (error) {
    console.log(`Database not Connected: ${error}`);
  }
};

export default connectDB;
