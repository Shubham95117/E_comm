import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./Store.css";
import { productsArr } from "../data/product"; // Ensure the path is correct
import CartContext from "../store/cart-context";

const Store = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchFilms = async () => {
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
  };

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
  }, [error, isRetrying]);

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleCancelRetry = () => {
    setIsRetrying(false);
    setError(null);
    setIsLoading(true);
  };

  const cartContext = useContext(CartContext);

  const addCartHandler = (item) => {
    cartContext.addItems(item);
    alert(`${item.title} added to cart`);
    console.log(cartContext.cartItems);
  };

  return (
    <>
      <div className="title">
        <h2>Music</h2>
      </div>
      <Container
        style={{ maxWidth: "960px", margin: "0 auto", marginBottom: "25px" }}
      >
        <Row className="justify-content-center">
          {productsArr.map((product, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="d-flex justify-content-center mb-4"
            >
              <Card style={{ width: "300px", margin: "auto", border: "none" }}>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <div className="mt-auto d-flex justify-content-between">
                    <Card.Text style={{ fontSize: "20px" }}>
                      ${product.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addCartHandler(product)}
                      style={{ height: "35px" }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="title">
        <h2>Movies</h2>
      </div>
      {!isLoading && !films.length && !error && (
        <Spinner
          animation="border"
          role="status"
          style={{ marginLeft: "45.5%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && setIsRetrying && (
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
                    border: "none",
                    justifyContent: "space-between",
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
                    <Button
                      variant="primary"
                      onClick={() => addCartHandler(film)}
                      style={{
                        height: "35px",
                      }}
                    >
                      Add to Cart
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

export default Store;
