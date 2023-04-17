import express from "express";
import { createArticle, getArticles } from "../controllers/articleController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createArticle); // http://localhost:5000/article
router.get("/", getArticles); // http://localhost:5000/article

export default router;
