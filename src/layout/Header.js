import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import Cart from "../components/Cart";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/" className="mx-4">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/store" className="mx-4">
                STORE
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="mx-4">
                ABOUT
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#cart" onClick={() => setShow(!show)}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
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
