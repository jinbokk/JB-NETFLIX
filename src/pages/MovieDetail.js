import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../redux/api";

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetail = () => {
  const movie_id = useParams().id;
  console.log(movie_id);

  const getMovieDetail = async () => {
    const movieDetailJson = await api.get(
      `/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
    console.log("data is", movieDetailJson);
  };

  const getMovieVideos = async () => {
    const movieReviews = await api.get(
      `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
  };

  const getMovieReviews = async () => {
    const movieReviews = await api.get(
      `/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );
  };

  const getRecommendMovies = async () => {
    const movieReviews = await api.get(
      `/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );
  };

  const getSimilarMovies = async () => {
    const similarMovies = await api.get(
      `/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=11`
    );
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return <div>MovieDetail</div>;
};

export default MovieDetail;
