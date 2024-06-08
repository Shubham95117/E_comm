import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    addHandler(formValues);
    setFormValues({
      name: "",
      email: "",
      phoneNo: "",
    });
  };
  const addHandler = async (contactData) => {
    try {
      const response = await fetch(
        "https://react-http-fa735-default-rtdb.firebaseio.com/contact.json",
        {
          method: "POST",
          body: JSON.stringify(contactData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed to post data");
      }
      const data = await response.json();
      console.log("Data posted successfully:", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        <h2
          style={{ textAlign: "center", fontSize: "35px", fontWeight: "bold" }}
        >
          Contact Us
        </h2>
      </div>
      <Container
        style={{
          background: "rgb(86,204,242)",
          marginTop: "40px",
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: "25px",
        }}
      >
        <Row>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                type="number"
                name="phoneNo"
                value={formValues.phoneNo}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" style={{ marginBottom: "10px" }}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
