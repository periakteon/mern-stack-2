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
import { register } from "../../src/redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}; 

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth })); // authSlice içerisindeki "loading" ve "error" değerlerini kullanmak üzere parametre olarak alıyoruz // "auth" adındaki state'e erişmek için "useSelector" kullanıyoruz
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error); // "error" değeri varsa "toast.error" ile ekrana yazdırıyoruz (authSlice içerisindeki "login" fonksiyonunda "return rejectWithValue(error.response.data);" ile döndürdüğümüz "error.response.data" değerini alıyoruz - buradaki "error.response.data" değeri backend tarafından döndürülen "message" değeridir)
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Girilen parolalar eşleşmiyor.");
    }
    if (firstName && lastName && email && password && confirmPassword ) {
      dispatch(register({ formValue, navigate, toast })); // authSlice içerisindeki "register" fonksiyonunda kullanmak üzere props geçiyoruz / sevk ediyoruz (dispatch)
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
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-plus' className='fa-2x p-4' />
        <h5>Üye Ol</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <MDBValidationItem
              className='col-md-6'
              feedback='Lütfen adınızı giriniz.'
              invalid='true'
            >
              <MDBInput
                label='Ad'
                type='text'
                value={firstName}
                name='firstName'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Lütfen adınızı giriniz.'
              />
            </MDBValidationItem>
            <MDBValidationItem
              className='col-md-6'
              feedback='Lütfen soyadınızı giriniz.'
              invalid='true'
            >
              <MDBInput
                label='Soyad'
                type='text'
                value={lastName}
                name='lastName'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Lütfen soyadınızı giriniz.'
              />
            </MDBValidationItem>
            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen e-mailinizi giriniz.'
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
                validation='Lütfen adınızı giriniz.'
              />
            </MDBValidationItem>
            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen geçerli bir parola giriniz.'
              invalid
            >
              <MDBInput
                label='Parola'
                type='password'
                value={password}
                name='password'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Lütfen geçerli bir parola giriniz.'
              />
            </MDBValidationItem>
            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen parolanızı onaylayınız.'
              invalid
            >
              <MDBInput
                label='Parola Onayı'
                type='password'
                value={confirmPassword}
                name='confirmPassword'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Lütfen parolanızı onaylayınız.'
              />
            </MDBValidationItem>
            <div className='col-12'>
              <MDBBtn style={{ width: "100%" }} className='mt-2' color="dark">
                {loading ? (
                  <>
                    <MDBSpinner
                      size='sm'
                      role='status'
                      tag='span'
                      className='me-2'
                    />
                    Üye kaydı yapılıyor...
                  </>
                ) : (
                  "Üye Ol"
                )}
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p className="text-dark fw-bolder">Üyeliğiniz var mı? Giriş Yap</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
