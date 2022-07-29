import React, { useEffect } from "react";
import MovieVideo from "./MovieVideo";
import { useDispatch, useSelector } from "react-redux/es/exports";
import api from "../redux/api";
import Movies from "../pages/Movies";

const PreviewCard = ({ movie }) => {
  console.log("pm is", movie);
  const dispatch = useDispatch();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const movie_id = movie.id;
  console.log("movie id is", movie_id);

  const getMovieKey = async () => {
    const selectedMovieJson = await api.get(
      `/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
    console.log("data is", selectedMovieJson);
    console.log("key is", selectedMovieJson.data.results[0].key);
    const movieKey = selectedMovieJson.data.results[0].key;

    dispatch({
      type: "STORE_MOVIE_ID_SUCCESS",
      payload: {
        movieKey: movieKey,
      },
    });

    return movieKey;
  };

  useEffect(() => {
    getMovieKey();
  }, []);

  return (
    <div className="previewCard">
      <div className="previewVideo">
        <MovieVideo />
      </div>
      <div className="previewCard_info">
        <span className="previewCard_title">{movie.title}</span>
        <span className="previewCard_vote_average">{movie.vote_average}</span>
        <div className="previewCard_genre">genre {movie.genre_ids}</div>
        <div className="previewCard_release_date">
          <div>release {movie.release_date}</div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
