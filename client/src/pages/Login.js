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
import { login } from "../../src/redux/features/authSlice";

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

  console.log(formValue);

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
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-lock" className="fa-2x p-4" />
        <h5>Üye Girişi</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Lütfen geçerli bir e-mail giriniz."
              invalid="true"
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid="true"
                validation="Lütfen geçerli bir e-mail giriniz."
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Lütfen geçerli bir parola giriniz."
              invalid
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid="true"
                validation="Lütfen geçerli bir parola giriniz."
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading ? (
                  <>
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                    Giriş yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Üyeliğiniz yok mu? Üye Ol</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
