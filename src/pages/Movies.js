import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

const Movies = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [formValues, setFormValues] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const fetchFilms = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films");
      console.log(response.status);
      if (!response.ok) {
        throw new Error(`Something went wrong... Retrying ${retryCount}`);
      }
      const data = await response.json();
      setFilms(data.results);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsRetrying(true);
      setIsLoading(false);
      setRetryCount((prevCount) => prevCount + 1);
    }
  }, [retryCount]);

  useEffect(() => {
    let retryInterval;
    if (error && isRetrying) {
      retryInterval = setInterval(() => {
        fetchFilms();
        console.log("retrying");
      }, 5000);
    }
    return () => {
      clearInterval(retryInterval);
      console.log("cleared");
    };
  }, [error, isRetrying, fetchFilms]);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const handleCancelRetry = () => {
    setIsRetrying(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    // Add your form submission logic here
  };

  return (
    <>
      <Container
        style={{
          background: "rgb(119,119,119)",
          marginTop: "40px",
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: "25px",
        }}
      >
        <Row>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Opening Text</Form.Label>
              <Form.Control
                as="textarea"
                name="openingText"
                value={formValues.openingText}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="releaseDate"
                value={formValues.releaseDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" style={{ marginBottom: "10px" }}>
              Add Movie
            </Button>
          </Form>
        </Row>
      </Container>
      <div className="title">
        <h2>Movies</h2>
      </div>
      {isLoading && !films.length && !error && (
        <Spinner
          animation="border"
          role="status"
          style={{ marginLeft: "45.5%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && isRetrying && (
        <>
          <p style={{ marginLeft: "45.5%", fontSize: "25px" }}>{error}</p>
          <Button
            variant="danger"
            style={{ marginLeft: "45.5%" }}
            onClick={handleCancelRetry}
          >
            Cancel Retry
          </Button>
        </>
      )}
      {films.length > 0 && (
        <Container
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            marginBottom: "25px",
          }}
        >
          <Row>
            {films.map((film, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  style={{
                    height: "400px",
                    border: "2px solid gray",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Card.Body>
                    <Card.Title style={{ height: "45px" }}>
                      {film.title}
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-2 text-muted"
                      style={{ height: "15px" }}
                    >
                      Episode {film.episode_id}
                    </Card.Subtitle>
                    <Card.Text>
                      {film.opening_crawl.substring(0, 40)}...
                    </Card.Text>
                    <Card.Text style={{ height: "45px" }}>
                      <strong>Director:</strong> {film.director}
                    </Card.Text>
                    <Card.Text style={{ height: "65px" }}>
                      <strong>Producer:</strong> {film.producer}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Movies;
