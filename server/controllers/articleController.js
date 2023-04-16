import express from "express";
import Article from "../models/articleModel.js";

export const createArticle = async (req, res) => {
  const article = req.body;
  const newArticle = new Article({
    ...article,
    createdAt: new Date().toISOString(),
  });
  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json({ message: "Makale oluşturulurken bir hata oluştu." });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: "Makaleler sunucudan çekilirken bir hata oluştu." });
  }
};
