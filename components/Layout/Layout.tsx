import React, { FC, useState } from 'react';
import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Offcanvas, Nav, NavDropdown,  } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Layout.module.css';
import Logo from '../../assets/logo.png';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const Layout: FC = ({ children }) => {

  const [show, setShow] = useState(false)
  return (
    
    
    <div className={styles.layout}>
      <div className={styles.headerWrapper}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileContainer}>
            <Navbar bg="transparent" expand={false}>
              <Container fluid>
                <Image src={Logo} width={90} height={65} />
                <Navbar.Toggle aria-controls="offcanvasNavbar"  onClick={() => setShow(true)}/>
                <Navbar.Offcanvas
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
                  show={show}
                 
                >
                  <Offcanvas.Header >
                
<FontAwesomeIcon onClick={() => setShow(false)} icon={faTimes as IconProp} color="gray" size='xl'/>
                  </Offcanvas.Header>
             
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Link className={styles.navItem} href="/">
                        Home
                      </Link>
                      <Link className={styles.navItem} href="/inventory">
                        Inventory
                      </Link>
                      <Link className={styles.navItem} href="#action3">
                        Financing Info
                      </Link>
                      <Link className={styles.navItem} href="#action4">
                        Blog
                      </Link>
                      <Link className={styles.navItem} href="/contactUs">
                        Contact Us
                      </Link>
                      <Link className={styles.navItem} href="/dealer-login">
                        Login
                      </Link>
                      <Link className={styles.navItem} href="#action7">
                        Apply Now
                      </Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          </div>
        </div>
        <div className={styles.container}>
        

          <div className={styles.navbar}>
              <Image src={Logo} width={90} height={65} />
              <Link className={styles.navItem} href="/">
                        Home
                      </Link>
                      <Link className={styles.navItem} href="/inventory">
                        Inventory
                      </Link>
                      <Link className={styles.navItem} href="/login">
                        Financing Info
                      </Link>
                      <Link className={styles.navItem} href="#action4">
                        Blog
                      </Link>
                      <Link className={styles.navItem} href="/contactUs">
                        Contact Us
                      </Link>
                      <Link className={styles.navItem} href="/dealer-login">
                        Login
                      </Link>
                      <Link className={styles.navItem} href="#action7">
                        Apply Now
                      </Link>
          </div>
        
        </div>
      </div>
      {children}
      <div className={styles.footer} />
    </div>
    
  );
};
