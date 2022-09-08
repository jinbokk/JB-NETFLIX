import React, { useEffect, useState } from "react";
import MovieVideo from "./MovieVideo";
import { useDispatch, useSelector } from "react-redux/es/exports";
import api from "../redux/api";
import { useNavigate } from "react-router-dom";
import { movieActions } from "../redux/actions/movieActions";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getMovieKey = async () => {
    const movie_id = movie.id;

    const selectedMovieJson = await api.get(
      `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );

    console.log("json is", selectedMovieJson);

    const movieKey = selectedMovieJson.data.results.find(
      (item) => item.name === "Official Trailer" || item.name === "Trailer"
    )
      ? selectedMovieJson.data.results.find(
          (item) => item.name === "Official Trailer" || item.name === "Trailer"
        ).key
      : selectedMovieJson.data.results[0].key;

    console.log("find key is", movieKey);

    dispatch({
      type: "STORE_MOVIE_KEY_SUCCESS",
      payload: {
        movieKey: movieKey,
      },
    });
  };


  const genreList = useSelector((state) => state.movie.genreListData.genres);


  const movieCardImg = movie.poster_path;
  const movieBackdrop = movie.backdrop_path;

  const [hover, setHover] = useState(false);
  const [loadMovie, setloadMovie] = useState(false);

  const navigate = useNavigate();

  let isHover;
  let isLoadMovie;

  const handleMouseEnter = () => {
    console.log("mouseEnterEvent Fired");
    isHover = setTimeout(() => {
      console.log("hover fired");
      setHover(true);
      getMovieKey();
    }, 1000);
    isLoadMovie = setTimeout(() => {
      console.log("loadMovie fired");
      setloadMovie(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout(isHover);
    clearTimeout(isLoadMovie);
    setHover(false);
    setloadMovie(false);
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
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        {hover ? (
          <>
            <div className="preview_modal">
              {loadMovie ? (
                <div className="previewVideo_container">
                  <MovieVideo />
                </div>
              ) : (
                <div
                  className="movieCard_preview"
                  style={{
                    backgroundImage:
                      "url(" +
                      `	https://www.themoviedb.org/t/p/w500_and_h282_face${movieBackdrop}` +
                      ")",
                  }}
                ></div>
              )}
              <div className="preview_modal_info">
                <div className="preview_modal_title">{movie.title}</div>

                <div className="preview_modal_release_date">
                  {movie.release_date}
                </div>

                <div className="preview_modal_score_rate">
                  <span style={{ marginRight: "5px" }}>
                    <span>SCORE</span>
                    <span className="preview_modal_score">
                      {movie.vote_average}
                    </span>
                  </span>

                  <span>
                    <span>RATED</span>
                    {!movie.adult ? (
                      <span className="preview_modal_G_rate">G</span>
                    ) : (
                      <span className="preview_modal_adult_rate">18+</span>
                    )}
                  </span>
                </div>

                <div className="preview_modal_genre">
                  {movie.genre_ids.map((id, index) => (
                    <>
                      <div key={index} className="preview_modal_genre_tag">
                        <span
                          style={{
                            fontSize: "15px",
                            color: "red",
                            marginRight: "5px",
                          }}
                        >
                          &#8226;
                        </span>
                        {genreList &&
                          genreList.find((item) => item.id === id).name}
                      </div>
                    </>
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
