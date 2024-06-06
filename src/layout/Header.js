import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import Cart from "../components/Cart";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home" className="mx-4">
                Home
              </Nav.Link>
              <Nav.Link href="#link" className="mx-4">
                Link
              </Nav.Link>
              <Nav.Link href="#about" className="mx-4">
                About{" "}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#cart" onClick={() => setShow(!show)}>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-title">
        <h2>The Generics</h2>
      </div>
      {show && <Cart />}
    </>
  );
};

export default Header;
