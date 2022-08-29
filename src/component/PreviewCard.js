import React, { useEffect } from "react";
import MovieVideo from "./MovieVideo";
import { useDispatch, useSelector } from "react-redux/es/exports";
import api from "../redux/api";

// 1. 모달이 카드 뒤로 숨는 현상 해결할 것
// 2. 모달이 팝업되는 origin 위치 수정 할 것

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
        type: "RESET_MOVIE_KEY_SUCCESS",
      });
    };
  }, []);

  return (
    <div className="preview_modal">
      <div className="previewVideo_container">
        <MovieVideo />
      </div>
      <div className="preview_modal_info">
        <div className="preview_modal_title">{movie.title}</div>

        <div className="preview_modal_release_date">{movie.release_date}</div>

        <div className="preview_modal_vote">
          <div className="preview_modal_vote_text">SCORE</div>
          <div className="preview_modal_vote_value">{movie.vote_average}</div>
        </div>

        <div className="preview_modal_rated">
          <div className="preview_modal_rated_text">RATED</div>
          {movie.adult === false ? (
            <div className="G_rated">G</div>
          ) : (
            <div className="adult_rated">18+</div>
          )}
        </div>

        <div className="preview_modal_genre">
          {movie.genre_ids.map((id, index) => (
            <div className="preview_modal_genre_tag" key={index}>
              {genreList && genreList.find((item) => item.id === id).name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
