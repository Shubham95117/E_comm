import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cart.css";
import CartContext from "../store/cart-context";
// const cartElements = [
//   {
//     title: "Colors",
//     price: 100,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
//     quantity: 2,
//   },
//   {
//     title: "Black and white Colors",
//     price: 50,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
//     quantity: 3,
//   },
//   {
//     title: "Yellow and Black Colors",
//     price: 70,
//     imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
//     quantity: 1,
//   },
// ];

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const removeItemHandler = (title) => {
    cartCtx.removeItems(title);
  };
  return (
    <Container className="cart" style={{ maxWidth: "400px" }}>
      <h3>Your Cart</h3>
      <ListGroup>
        {cartCtx.cartItems.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex align-items-center">
            <Row className="w-100">
              <Col xs={3} md={2}>
                <Card.Img src={item.imageUrl} alt={item.title} />
              </Col>
              <Col xs={9} md={10}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Card.Text>Quantity: {item.quantity}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeItemHandler(item.title)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Cart;
