import React, { useEffect, useState } from "react";
import MovieVideo from "./MovieVideo";
import { useDispatch, useSelector } from "react-redux/es/exports";
import api from "../redux/api";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const getMovieKey = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const movie_id = movie.id;

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

  const genreList = useSelector((state) => state.movie.genreListData.genres);

  const movieCardImg = movie.poster_path;

  const [hover, setHover] = useState(false);
  const [delayHandler, setDelayHandler] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    console.log("Mounted");
    getMovieKey();
    setDelayHandler(
      setTimeout(() => {
        setHover(true);
      }, 2000)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
    setHover(false);
    console.log("Unmounted");
  };

  return (
    <>
      <div
        className="movieCard"
        style={{
          backgroundImage:
            "url(" +
            `	https://www.themoviedb.org/t/p/w440_and_h660_face${movieCardImg}` +
            ")",
        }}
        onClick={() => navigate(`/movies/${movie.id}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hover ? (
          // hover시, card 위에 있는 before를 수정하도록 하면 되겠다.
          // card::before, 초기 opacity가 0이며, 영화 포스터의 이미지를 background로 한다
          // hover시, opacity가 1이 되며 scale 확장되고 (origin은 해당 카드의 센터,하단)
          // 영화 정보가 받아와지기 전까지 포스터 image, 및 영화 정보
          // 영화 정보가 받아와진 후 영화 동영상 자동 재생
          <>
            <div className="preview_modal">
              <MovieVideo />
              <div className="preview_modal_info">
                <span className="preview_modal_title">{movie.title}</span>
                <div className="preview_modal_release_date">
                  {movie.release_date}
                </div>
                <span className="preview_modal_vote_average">
                  <span>SCORE</span>
                  <span>{movie.vote_average}</span>
                  <span>RATED</span>
                  {movie.adult === false ? (
                    <span className="G_rated">G</span>
                  ) : (
                    <span className="adult_rated">18+</span>
                  )}
                </span>
                <div className="preview_modal_genre">
                  {movie.genre_ids.map((id, index) => (
                    <span className="preview_modal_genre_tag" key={index}>
                      {genreList &&
                        genreList.find((item) => item.id === id).name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export { MovieCard };
