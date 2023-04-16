import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../../src/redux/features/authSlice";
import jwt_decode from "jwt-decode";

const google = window.google;

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth })); // authSlice içerisindeki "loading" ve "error" değerlerini kullanmak üzere parametre olarak alıyoruz // "auth" adındaki state'e erişmek için "useSelector" kullanıyoruz
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error); // "error" değeri varsa "toast.error" ile ekrana yazdırıyoruz (authSlice içerisindeki "login" fonksiyonunda "return rejectWithValue(error.response.data);" ile döndürdüğümüz "error.response.data" değerini alıyoruz - buradaki "error.response.data" değeri backend tarafından döndürülen "message" değeridir)
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast })); // authSlice içerisindeki "login" fonksiyonunda kullanmak üzere props geçiyoruz
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // ------------ GOOGLE LOGIN START ------------
  /* global google */

  const [googleUser, setGoogleUser] = useState({});

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token:  ", response?.credential);
    const googleUserObject = jwt_decode(response?.credential);
    console.log("Decoded JWT ID Token:  ", googleUserObject);
    setGoogleUser(googleUserObject);
    const email = googleUserObject?.email;
    const name = googleUserObject?.name;
    const token = response?.credential;
    const googleId = googleUserObject?.sub;
    const result = {
      email,
      name,
      token,
      googleId,
    };
    console.log("Result: ", result);
    dispatch(googleSignIn({ result, navigate, toast }));

  };

  const handleGoogleSignOut = (event) => {
    setGoogleUser({});
  };

  const initializeGoogleButton = async () => {
    await google?.accounts.id.initialize({
      client_id:
        "923883066110-qh90kfeaccm48sibu9tkr3a0ndnl5551.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    await google?.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        width: "375",
        shape: "rectangular",
        size: "large",
        logo_alignment: "center",
      }
    );
  };

  useEffect(() => {
    initializeGoogleButton();
  }, []);

  // ------------ GOOGLE LOGIN END ------------

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      {Object?.keys(googleUser).length > 0 ? (
        <MDBCard alignment='center'>
          <MDBIcon fab icon='google' className='fa-4x p-4' />
          <MDBCardBody>
            <h3>{googleUser.name}</h3>
            <p>{googleUser.email}</p>
            <img src={googleUser.picture} alt='Google user avatar'></img>
            <MDBBtn
              className='btn btn-danger'
              style={{
                width: "100%",
                marginTop: "30px",
                padding: "15px",
                fontSize: "18px",
              }}
              onClick={(e) => handleGoogleSignOut(e)}
            >
              Çıkış Yap
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      ) : (
        <MDBCard alignment='center'>
          <MDBIcon fas icon='user-lock' className='fa-2x p-4' />
          <h5>Üye Girişi</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className='row g-3'
            >
              <MDBValidationItem
                className='col-md-12'
                feedback='Lütfen geçerli bir e-mail giriniz.'
                invalid='true'
              >
                <MDBInput
                  label='Email'
                  type='email'
                  value={email}
                  name='email'
                  onChange={onInputChange}
                  required
                  invalid='true'
                  validation='Lütfen geçerli bir e-mail giriniz.'
                />
              </MDBValidationItem>
              <MDBValidationItem
                className='col-md-12'
                feedback='Lütfen geçerli bir parola giriniz.'
                invalid
              >
                <MDBInput
                  label='Password'
                  type='password'
                  value={password}
                  name='password'
                  onChange={onInputChange}
                  required
                  invalid='true'
                  validation='Lütfen geçerli bir parola giriniz.'
                />
              </MDBValidationItem>
              <div className='col-12'>
                <MDBBtn style={{ width: "100%" }} className='mt-2'>
                  {loading ? (
                    <>
                      <MDBSpinner
                        size='sm'
                        role='status'
                        tag='span'
                        className='me-2'
                      />
                      Giriş yapılıyor...
                    </>
                  ) : (
                    "Giriş Yap"
                  )}
                </MDBBtn>
              </div>
            </MDBValidation>
            <br />
            <hr className='hr hr-blurry' />
            <div style={{ width: "100%" }}>
              <div id='googleSignInDiv'></div>
            </div>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to='/register'>
              <p>Üyeliğiniz yok mu? Üye Ol</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      )}
    </div>
  );
};

export default Login;
