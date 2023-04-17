import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  creator: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  imageFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;