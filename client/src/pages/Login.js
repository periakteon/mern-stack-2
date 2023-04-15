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
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <MDBIcon fas icon='user-circle' className='fa-2x p-4' />
        <h5>Üye Girişi</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen geçerli bir e-mail giriniz.'
              invalid="true"
            >
              <MDBInput
                label='Email'
                type='email'
                value={email}
                name='email'
                onChange={onInputChange}
                required
                invalid="true"
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
                invalid="true"
                validation='Lütfen geçerli bir parola giriniz.'
              />
            </MDBValidationItem>
            <div className='col-12'>
              <MDBBtn style={{ width: "100%" }} className='mt-2'>
                Giriş Yap
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/register'>
            <p>Üyeliğiniz yok mu? Üye Ol</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
