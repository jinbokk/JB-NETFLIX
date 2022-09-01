import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const FilteredMovieList = ({ movies }) => {
  let moviesData = movies.filter((item) => item.poster_path !== null);
  
  const navigate = useNavigate();
  console.log("FilteredMovieList is", movies);


  return (
    <>
      {moviesData && (
        <Container>
          <Row>
            {moviesData.map((item) => (
              <Col
                key={item.id}
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
              >
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default FilteredMovieList;
