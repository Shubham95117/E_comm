import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import Cart from "../components/Cart";
import { NavLink, useLocation } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

const Header = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const renderPlayButton = () => {
    if (location.pathname === "/") {
      return (
        <>
          <button className="albumBtn">Get Our Latest Album</button>
          <br />
          <i className="fa fa-play playBtn" aria-hidden="true"></i>
        </>
      );
    }
    return null;
  };
  return (
    <>
      <Navbar expand="lg" className="navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/" className="mx-4">
                HOME
              </Nav.Link>
              <Nav.Link as={NavLink} to="/store" className="mx-4">
                STORE
              </Nav.Link>
              <Nav.Link as={NavLink} to="/movies" className="mx-4">
                MOVIES
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="mx-4">
                ABOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <i
          className="fa fa-shopping-cart"
          aria-hidden="true"
          onClick={() => setShow(!show)}
          style={{
            cursor: "pointer",
          }}
        ></i>
      </Navbar>
      <div className="header-title">
        <h2>The Generics</h2>
        {renderPlayButton()}
      </div>
      {show && <Cart />}
    </>
  );
};

export default Header;
