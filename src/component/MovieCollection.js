import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

const MovieCollection = () => {
  const popularMoviesData = useSelector((state) => state.movie);

  return (
    <Container fluid>
      <Row>
        <Col>1 of 1</Col>
        <Col>1 of 1</Col>
        <Col>1 of 1</Col>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  );
};

export default MovieCollection;
