import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

export const signin = (formData) => API.post('/user/signin', formData); // POST request to /user/signin with formData parameter

