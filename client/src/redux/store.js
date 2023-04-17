import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import articleReducer from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
  },
});
