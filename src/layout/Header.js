import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import Cart from "../components/Cart";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
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
  const logoutHandler = () => {
    authCtx.logout();
    setShow(false);
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="navbar position-fixed w-100 z-3"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink activeClassName="active" to="/" className="mx-3 NavLink">
                HOME
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/store"
                className="mx-4 NavLink"
              >
                STORE
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/movies"
                className="mx-4 NavLink"
              >
                MOVIES
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/about"
                className="mx-4 NavLink"
              >
                ABOUT
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/contact"
                className="mx-4 NavLink"
              >
                CONTACT
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/auth"
                className="mx-4 NavLink"
              >
                {!authCtx.isLoggedIn ? (
                  "LOGIN"
                ) : (
                  <button onClick={logoutHandler}>LogOut</button>
                )}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
        {authCtx.isLoggedIn ? (
          <i
            className="fa fa-shopping-cart"
            aria-hidden="true"
            onClick={() => setShow(!show)}
            style={{
              cursor: "pointer",
            }}
          >
            <span style={{ margin: "3px" }}>Cart</span>
          </i>
        ) : (
          ""
        )}
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
