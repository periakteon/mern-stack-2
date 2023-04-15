import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // google login yapacağımız için false
  },
  googleId: {
    type: String,
    required: false,
  },
  id: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
