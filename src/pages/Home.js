// src/components/Concerts.js
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const concerts = [
  { date: "JUL 16", city: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
  { date: "JUL 19", city: "TORONTO, ON", venue: "BUDWEISER STAGE" },
  { date: "JUL 22", city: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
  { date: "JUL 29", city: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
  { date: "AUG 2", city: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
  { date: "AUG 7", city: "CONCORD, CA", venue: "CONCORD PAVILION" },
];

const Home = () => {
  return (
    <Container className="my-5" style={{ width: "800px" }}>
      <div>
        <h2
          style={{
            fontFamily: "Metal Mania",
            textAlign: "center",
            padding: "20px",
            fontSize: "30px",
            fontWeight: "bolder",
          }}
        >
          TOURS
        </h2>
      </div>
      {concerts.map((concert, index) => (
        <Row key={index} className="align-items-center my-3">
          <Col md={2} sm={2} className="text-center">
            <h5 style={{ width: "80px", fontSize: "18px", color: "#777" }}>
              {concert.date}
            </h5>
          </Col>
          <Col md={4} sm={4} className="text-center">
            <h5 style={{ width: "120px", fontSize: "14px", color: "#777" }}>
              {concert.city}
            </h5>
          </Col>
          <Col md={4} sm={4} className="text-center">
            <h5 style={{ width: "200px", fontSize: "14px", color: "#777" }}>
              {concert.venue}
            </h5>
          </Col>
          <Col md={2} sm={2} className="text-center">
            <Button
              style={{
                background: "rgb(86,204,242)",
                border: "none",
                width: "150px",
                color: "white",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              BUY TICKETS
            </Button>
          </Col>
          <hr />
        </Row>
      ))}
    </Container>
  );
};

export default Home;
