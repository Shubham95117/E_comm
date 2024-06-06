import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#56CCF2",
        color: "white",
        padding: "1rem",
      }}
    >
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md="auto">
            <h5 style={{ fontWeight: "bold", fontSize: "40px" }}>
              The Generics
            </h5>
          </Col>
          <Col
            xs={12}
            md="auto"
            className="d-flex justify-content-end"
            style={{
              fontSize: "35px",
              marginRight: "35px",
            }}
          >
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fab fa-youtube" style={{ color: "red" }}></i>
            </a>
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fab fa-spotify" style={{ color: "green" }}></i>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3"
            >
              <i className="fab fa-facebook" style={{ color: "#3b5998" }}></i>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
