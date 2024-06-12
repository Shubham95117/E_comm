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
      const response = await fetch(
        "https://react-http-fa735-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error(`Something went wrong... Retrying ${retryCount}`);
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setFilms(loadedMovies);
      setError(null);
      setIsLoading(false);
      setIsRetrying(false);
      setRetryCount(0);
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    await addMovieHandler(formValues);
    fetchFilms(); // Fetch the updated list of movies after adding a new one
    setFormValues({
      title: "",
      openingText: "",
      releaseDate: "",
    });
  };

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://react-http-fa735-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to post data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Data posted successfully:", data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-http-fa735-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete data: ${response.status} ${response.statusText}`
        );
      }

      console.log("Data deleted successfully");
      fetchFilms(); // Fetch the updated list of movies after deleting a movie
    } catch (error) {
      console.error("Error deleting data:", error);
    }
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
        <Container style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Spinner
            animation="border"
            role="status"
            // style={{ marginLeft: "45.5%" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
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
              <Col key={index} xs={2} sm={2} md={2} lg={4}>
                <Card
                  style={{
                    height: "250px",
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
                      style={{ height: "45px" }}
                    >
                      Release Date: {film.releaseDate}
                    </Card.Subtitle>
                    <Card.Text>
                      {film.openingText.substring(0, 40)}...
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => deleteMovieHandler(film.id)}
                    >
                      Delete
                    </Button>
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
