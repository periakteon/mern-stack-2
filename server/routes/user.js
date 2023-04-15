import express from "express";
import { signup, signin } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup); // http://localhost:5000/user/signup
router.post("/signin", signin);  // http://localhost:5000/user/signin

export default router;
