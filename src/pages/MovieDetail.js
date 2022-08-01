import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieDetail = () => {
  const movie_id = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "STORE_MOVIE_ID_SUCCESS", payload: movie_id });
  }, []);

  // useEffect(() => {
  //   getMovieDetail();
  // }, []);

  return <div>MovieDetail</div>;
};

export default MovieDetail;
