import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// asenkron bir işlem yapacağımız için "createAsyncThunk" kullanıyoruz
export const login = createAsyncThunk(
  // createAsyncThunk takes two arguments: a string (action) and an async function.

  // "auth/login" adında bir action oluşturuyoruz (bu action'ı "authSlice" içerisinde kullanacağız) || buradaki "auth" tamamen keyfidir, bir namespace oluşturur. "login" ise action'ın adıdır
  "auth/login",

  // Async function that handles the logic of the action
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    // "formValue", "navigate" ve "toast" değerlerini parametre olarak alıyoruz || rejectWithValue is a special function that is provided by the createAsyncThunk() function. It is used to reject the promise returned by the async thunk with a specific value. When the async operation fails, you can use rejectWithValue to reject the promise with a specific error value. This value will be available in the action.payload property of the rejected action.
    try {
      const response = await api.signIn(formValue); // /redux/api.js içerisindeki "signin" fonksiyonunu çağırıyoruz ve parametre olarak /pages/Login.js içerisindeki "formValue" değerini parametre olarak gönderiyoruz
      toast.success("Giriş başarılı!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // "error.response.data" değerini aşağıdaki "login.rejected" fonksiyonunda kullanmak üzere "rejectWithValue" ile döndürüyoruz
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Üye kaydı başarılı!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  // Slice name
  name: "auth",
  // Initial state
  initialState: {
    user: null,
    error: "",
    loading: false,
  },

  extraReducers: {
    // login life-cycle
    [login.pending]: (state, action) => {
      state.loading = true;
    },

    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    [login.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },

    // register life-cycle
    [register.pending]: (state, action) => {
      state.loading = true;
    },

    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    [register.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
