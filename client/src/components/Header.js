import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogout } from "../redux/features/authSlice";

const Header = () => {
  const [showBurger, setShowBurger] = useState(false);
  const dispatch = useDispatch();
  const userLogoutHandler = () => {
    dispatch(setUserLogout());
  };
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <MDBNavbar fixed='top' expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' className='my-2 px-4 fs-3 fw-bold'>
          Yazılım Blog
        </MDBNavbarBrand>

        {/* Hamburger menü için başlangıç */}
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBurger(!showBurger)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        {/* Hamburger menü için bitiş */}

        <MDBCollapse navbar show={showBurger} className='mt-3'>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {!showBurger && user?.result?._id && (
              <>
                <p style={{ marginRight: "16px", marginTop: "9px" }}>
                  Hoşgeldin,{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {user?.result?.name}
                  </span>
                </p>
                <div class='vr vr-blurry h-150 mb-2 mx-3'></div>
              </>
            )}
            {showBurger && user?.result?._id && (
              <>
                <p>
                  Hoşgeldin,{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {user?.result?.name}
                  </span>
                </p>
                <hr class='hr hr-blurry' />
              </>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <p className='mx-2 fw-bolder'>Anasayfa</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/addArticle'>
                    <p className='mx-2 fw-bolder'>Yazı Ekle</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/dashboard'>
                    <p className='mx-2 fw-bolder'>Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href='/logout'>
                  <p className='mx-2 fw-bolder' onClick={userLogoutHandler}>
                    Çıkış Yap
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p className='mx-2 fw-bolder'>Giriş Yap</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
