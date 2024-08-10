import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/student.db";
import router from "./routes/student.routes";

dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
