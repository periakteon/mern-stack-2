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
      const response = await api.signin(formValue); // /redux/api.js içerisindeki "signin" fonksiyonunu çağırıyoruz ve parametre olarak /pages/Login.js içerisindeki "formValue" değerini parametre olarak gönderiyoruz
      toast.success("Giriş başarılı!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // "error.response.data" değerini aşağıdaki "login.rejected" fonksiyonunda kullanmak üzere "rejectWithValue" ile döndürüyoruz
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
  // Reducers that handle state changes
  extraReducers: {
    // The extraReducers object has three reducers for the login action.

    // First reducer: Handles the state change when login action is pending
    [login.pending]: (state, action) => {
      state.loading = true;
    },

    // Second reducer: Handles the state change when login action is fulfilled
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload })); // "localStorage" içerisinde "profile" adında bir key oluşturup, "action.payload" değerini atıyoruz (action.payload değerini "login" fonksiyonunda "return response.data;" ile döndürdük)
      // Update the user state with the response payload data (action.payload)
      state.user = action.payload;
    },

    // Third reducer: Handles the state change when login action is rejected
    [login.rejected]: (state, action) => {
      state.error = action.payload.message; // "action.payload.message" değerini "login" fonksiyonunda (yukarıdaki) "return rejectWithValue(error.response.data);" ile döndürdük
      state.loading = false; // "loading" değerini false yapıyoruz
    },
  },
});

export default authSlice.reducer;
