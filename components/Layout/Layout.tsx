import React, { FC } from 'react';
import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Layout.module.css';
import Logo from '../../assets/logo.png';

export const Layout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.headerWrapper}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileContainer}>
            <Navbar bg="transparent" expand={false}>
              <Container fluid>
                <Image src={Logo} width={90} height={65} />
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
                >
                  <Offcanvas.Header closeButton />
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link className={styles.navItem} href="#action1">
                        Home
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} href="#action2">
                        Inventory
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} href="#action3">
                        Financing Info
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} href="#action4">
                        Blog
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} href="#action5">
                        Contact Us
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} href="/dealer-login">
                        Login
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} href="#action7">
                        Apply Now
                      </Nav.Link>
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
            <span>Home</span>
            <span>Inventory</span>
            <span>Financing info</span>
            <span>Blog</span>
            <span>Contact us</span>
            <Link href="/dealer-login">
              <span>Login</span>
            </Link>
          </div>
          <div>
            Apply <br />
            Now
          </div>
        </div>
      </div>
      {children}
      <div className={styles.footer} />
    </div>
  );
};
