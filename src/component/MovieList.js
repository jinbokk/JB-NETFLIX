import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const MovieList = ({ movies }) => {
  return (
    <Container>
      <Row>
        {movies.map((item, index) => (
          <Col
            key={index}
            sm={4}
            md={3}
            lg={2}
            className="movieListCard"
            style={{
              backgroundImage:
                "url(" +
                `	https://www.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}` +
                ")",
            }}
          ></Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
