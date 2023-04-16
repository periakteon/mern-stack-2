import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/dbConnection.js";
import userRouter from "./routes/user.js";
import articleRouter from "./routes/article.js";
dotenv.config();

const app = express();

const startApp = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Uygulama ${process.env.PORT} portunda çalışıyor.`);
    });
  } catch (err) {
    console.log("Uygulama başlatılırken bir hata oluştu:", err);
  }
};

startApp();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/user", userRouter); // http://localhost:5000/user/
app.use("/article", articleRouter); // http://localhost:5000/article/

app.get("/", (req, res) => {
  res.send("Hello World!");
});
