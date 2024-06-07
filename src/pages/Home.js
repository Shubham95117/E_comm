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
      {concerts.map((concert, index) => (
        <Row key={index} className="align-items-center my-3">
          <Col md={2} className="text-center" style={{ width: "35px" }}>
            <h5>{concert.date}</h5>
          </Col>
          <Col md={4} className="text-center">
            <h5>{concert.city}</h5>
          </Col>
          <Col md={4} className="text-center">
            <h5>{concert.venue}</h5>
          </Col>
          <Col md={2} className="text-center">
            <Button variant="primary">BUY TICKETS</Button>
          </Col>
          <hr />
        </Row>
      ))}
    </Container>
  );
};

export default Home;
