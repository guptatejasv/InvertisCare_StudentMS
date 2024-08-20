import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/student.db";
import router from "./routes/student.routes";
import bodyParser from "body-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();

// Templates
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
// Templates
app.get("/", (req, res) => {
  res.status(200).render("base");
});
app.get("/register", (req, res) => {
  res.status(200).render("register");
});
app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
