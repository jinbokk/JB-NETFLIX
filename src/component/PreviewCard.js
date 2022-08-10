import React, { useEffect } from "react";
import MovieVideo from "./MovieVideo";
import { useDispatch, useSelector } from "react-redux/es/exports";
import api from "../redux/api";

const PreviewCard = ({ movie }) => {
  const genreList = useSelector((state) => state.movie.genreListData.genres);

  const dispatch = useDispatch();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const movie_id = movie.id;

  const getMovieKey = async () => {
    const selectedMovieJson = await api.get(
      `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const movieKey = selectedMovieJson.data.results[0].key;

    dispatch({
      type: "STORE_MOVIE_KEY_SUCCESS",
      payload: {
        movieKey: movieKey,
      },
    });
  };

  useEffect(() => {
    getMovieKey();
    return () => {
      dispatch({
        type: "STORE_MOVIE_KEY_SUCCESS",
        payload: {
          movieKey: {},
        },
      });
    };
  }, []);

  return (
    <div className="previewCard">
      <div className="previewVideo_container">
        <MovieVideo />
      </div>
      <div className="previewCard_info">
        <span className="previewCard_title">{movie.title}</span>
        <div className="previewCard_release_date">{movie.release_date}</div>
        <span className="previewCard_vote_average">
          <span>SCORE</span>
          <span>{movie.vote_average}</span>
          <span>RATED</span>
          {movie.adult === false ? (
            <span className="G_rated">G</span>
          ) : (
            <span className="adult_rated">18+</span>
          )}
        </span>
        <div className="previewCard_genre">
          {movie.genre_ids.map((id, index) => (
            <span className="previewCard_genre_tag" key={index}>
              {genreList.find((item) => item.id === id).name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
