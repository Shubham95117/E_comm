import React from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { productsArr } from "../data/product"; // Ensure the path is correct

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsArr.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          {product.images.map((img, index) => (
            <Image key={index} src={img} thumbnail className="mb-2" />
          ))}
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <div>
            <h4>Reviews</h4>
            {product.reviews.map((review, index) => (
              <div key={index}>
                <p>
                  <strong>{review.author}</strong>
                </p>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
