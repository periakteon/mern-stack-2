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

const Header = () => {
  const [showBurger, setShowBurger] = useState(false);

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

        <MDBCollapse navbar show={showBurger} className="mt-3">
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <p className='mx-2 fw-bolder'>Anasayfa</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
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
            <MDBNavbarItem>
              <MDBNavbarLink href='/logout'>
                <p className='mx-2 fw-bolder'>Çıkış Yap</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/login'>
                <p className='mx-2 fw-bolder'>Giriş Yap</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
