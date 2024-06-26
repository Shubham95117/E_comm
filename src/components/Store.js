import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Store.css";
import { productsArr } from "../data/product";
import CartContext from "../store/cart-context";

const Store = () => {
  const cartContext = useContext(CartContext);
  const history = useHistory();

  const addCartHandler = (item) => {
    cartContext.addItems(item);
    alert(`${item.title} added to cart`);
    console.log(cartContext.cartItems);
  };

  const viewProductHandler = (id) => {
    history.push(`/product/${id}`);
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
              <Card
                style={{
                  width: "300px",
                  margin: "auto",
                  border: "none",
                }}
                onClick={() => viewProductHandler(product.id)}
              >
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <div className="mt-auto d-flex justify-content-between">
                    <Card.Text style={{ fontSize: "20px" }}>
                      ${product.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        addCartHandler(product);
                      }}
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
    </>
  );
};

export default Store;
