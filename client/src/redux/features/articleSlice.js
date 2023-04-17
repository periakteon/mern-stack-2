import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createArticle = createAsyncThunk(
  "article/create",
  async ({ articleData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createArticle(articleData);
      toast.success("Makale başarıyla eklendi!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: null, // single article
    articles: [], // all articles
    userArticles: [], // user's articles to be displayed on Dashboard
    error: "",
    loading: false,
  },

  // Asenkron işlemler için extraReducers
  extraReducers: {
    // login life-cycle
    [createArticle.pending]: (state, action) => {
      state.loading = true;
    },

    [createArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = [action.payload];
    },

    [createArticle.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});


export default articleSlice.reducer;