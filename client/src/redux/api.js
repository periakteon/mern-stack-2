import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const signIn = (formData) => API.post("/user/signin", formData); // POST request to /user/signin with formData parameter
export const signUp = (formData) => API.post("/user/signup", formData); // POST request to /user/signup with formData parameter

