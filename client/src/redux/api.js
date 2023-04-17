import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => { // req işlemleri başlamadan önce yapılacak işlemler (mongoDB'deki creator şemasını doldurmak için)
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token // localStorage'dan gelen tokeni header'da bulunan Authorization'a ekliyoruz
    }`;
  }
  return req; // request'i bu şekilde döndürüyoruz, yani request bu şekilde yoluna devam ediyor.
});

export const signIn = (formData) => API.post("/user/signin", formData); // POST request to /user/signin with formData parameter
export const signUp = (formData) => API.post("/user/signup", formData); // POST request to /user/signup with formData parameter
export const googleSignIn = (result) => API.post("/user/googleSignIn", result); // POST request to /user/signup with formData parameter

export const createArticle = (articleData) => API.post("/article", articleData); // POST request to /article with articleData parameter

