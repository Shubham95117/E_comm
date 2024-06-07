import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Store.css";
import { productsArr } from "../data/product"; // Ensure the path is correct
import CartContext from "../store/cart-context";
import Spinner from "react-bootstrap/Spinner";
const Store = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch("https://swapi.py4e.com/api/films");
        const data = await response.json();
        setFilms(data.results);
        setIsLoading(true);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchFilms();
  }, []);

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
      {!isLoading && (
        <Spinner
          animation="border"
          role="status"
          style={{ marginLeft: "48.5%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isLoading && (
        <Container
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            marginBottom: "25px",
            // height: "350px",
          }}
        >
          <Row className="justify-content-center">
            {films.map((film, index) => (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex justify-content-center mb-4"
              >
                <Card
                  style={{
                    // width: "18rem",
                    margin: "auto",
                    border: "2px solid gray",
                    height: "350px",
                    // width: "650px",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{film.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Episode {film.episode_id}
                    </Card.Subtitle>
                    <Card.Text>
                      {film.opening_crawl.substring(0, 60)}...
                    </Card.Text>
                    <Card.Text>
                      <strong>Director:</strong> {film.director}
                    </Card.Text>
                    <Card.Text>
                      <strong>Producer:</strong> {film.producer}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addCartHandler(film)}
                      style={{ height: "35px" }}
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
