import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { productsArr } from "../data/product"; // Ensure the path is correct
import CartContext from "../store/cart-context";
import { Button } from "react-bootstrap";
import "./ProductDetails.css";

const ProductDetails = () => {
  const cartContext = useContext(CartContext);
  const { id } = useParams();
  const product = productsArr.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const addCartHandler = (item) => {
    cartContext.addItems(item);
    alert(`${item.title} added to cart`);
    console.log(cartContext.cartItems);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={12}>
              <Image
                src={product.imageUrl}
                thumbnail
                className="mb-2 rounded-5"
              />
              {/* <span>
                <i class="fa-solid fa-heart"></i>
              </span> */}
            </Col>
          </Row>
          <Row className="w-100">
            <h2>Colors:</h2>
            {product.images.map((img, index) => (
              <Col md={3} key={index} className="images">
                <Image
                  src={img}
                  thumbnail
                  className="mb-2 rounded-circle w-75"
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={12}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <h3>${product.price}</h3>
              <div>
                <h4>
                  Ratings & Reviews{" "}
                  <span className="icon span_icon">
                    {" "}
                    <h6
                      style={{
                        fontSize: "16px",
                        display: "inline-block",
                        paddingTop: "5px",
                        marginTop: "auto",
                      }}
                    >
                      3.9
                    </h6>
                    <i
                      className="fa-regular fa-star "
                      style={{ fontSize: "14px", margin: "2px" }}
                    ></i>
                  </span>
                </h4>
                {product.reviews.map((review, index) => (
                  <div key={index}>
                    <p>
                      <strong style={{ margin: "3px" }}>{review.author}</strong>
                      <span className="icon span_icon">
                        {" "}
                        <h6
                          style={{ fontSize: "14px", display: "inline-block" }}
                        >
                          4
                        </h6>
                        <i
                          className="fa-regular fa-star "
                          style={{ fontSize: "12px", margin: "2px" }}
                        ></i>
                      </span>
                    </p>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
