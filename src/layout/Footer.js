import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const renderFooter = () => {
    if (location.pathname === "/") {
      return (
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} md="auto">
              <h5 className="footer-title">The Generics</h5>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} md="auto">
              <h5 className="footer-title">The Generics</h5>
            </Col>
            <Col
              xs={12}
              md="auto"
              className="footer-links d-flex justify-content-end"
            >
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3"
                style={{ color: "red" }}
              >
                <i className="fab fa-youtube youtube"></i>
              </a>
              <a
                href="https://www.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3"
                style={{ color: "green" }}
              >
                <i className="fab fa-spotify spotify"></i>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3"
              >
                <i className="fab fa-facebook facebook"></i>
              </a>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  return <footer className="footer">{renderFooter()}</footer>;
};

export default Footer;
