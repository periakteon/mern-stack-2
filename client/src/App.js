import {useEffect} from 'react';
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from 'react-redux';
import { setUserPersisted } from './redux/features/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUserPersisted(user)); // Local storage'dan gelen user bilgilerini authSlice.js içerisindeki setUserPersisted reducer'ına dispatch ediyoruz. Bu sayede kullanıcı giriş yaptıktan sonra sayfayı yenilediğinde kullanıcı bilgileri kaybolmuyor. 
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
