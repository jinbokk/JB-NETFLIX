import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const FilteredMovieList = ({ movies, innerRef }) => {
  let moviesData = movies.filter((item) => item.poster_path !== null);

  const navigate = useNavigate();

  return (
    <>
      {moviesData && (
        <Container>
          <Row>
            {moviesData.map((item, index) =>
              moviesData.length === index + 1 ? (
                <Col
                  key={index}
                  ref={innerRef}
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
                  onClick={() => navigate(`/movies/${item.id}`)}
                ></Col>
              ) : (
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
                  onClick={() => navigate(`/movies/${item.id}`)}
                ></Col>
              )
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default FilteredMovieList;
