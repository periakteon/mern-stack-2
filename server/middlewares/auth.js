import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // Google ile giriş yapan kullanıcıların tokeni genelde 500'den fazla oluyor, onun kontrolünü yapıyoruz
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log("Decoded data: ", decodedData);
      req.userId = decodedData?.id;
      console.log("req.userId: ", req.userId)
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await User.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log("Auth middleware'ında bir hata oluştu: ", error);
  }
};

export default auth;