import React from "react";
import { useSelector } from "react-redux";

const MovieDetail = () => {
  const selectedMovie = useSelector((state) => state.movie);

  return <div>MovieDetail{console.log(selectedMovie)}</div>;
};

export default MovieDetail;
