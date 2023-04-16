import express from "express";
import { createArticle, getArticles } from "../controllers/articleController.js";

const router = express.Router();

router.post("/", createArticle); // http://localhost:5000/article
router.get("/", getArticles); // http://localhost:5000/article

export default router;
