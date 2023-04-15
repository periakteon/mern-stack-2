import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

/**
 *
 * Signup API
 * POST: /user/signup
 *
 */

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "Bu e-mail kullanılmaktadır." });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Üye kaydı yapılırken bir hata oluştu." });
    console.log("Üye kaydı yapılırken bir hata oluştu: ", err);
  }
};

/**
 * Login(Sign In) API
 * GET: /user/signin
 */

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Hatalı parola." });

    if (isPasswordCorrect) {
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ result: oldUser, token });
    }
  } catch (err) {
    res.status(500).json({ message: "Giriş yapılırken bir hata oluştu." });
    console.log("Giriş yapılırken bir hata oluştu: ", err);
  }
};
