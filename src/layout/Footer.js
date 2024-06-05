import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#56CCF2", color: "#fff", padding: "1rem" }}>
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md="auto">
            <h5>The Generics</h5>
          </Col>
          <Col xs={12} md="auto" className="d-flex justify-content-end">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <i className="fab fa-spotify"></i>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook"> </i>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
