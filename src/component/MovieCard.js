import React, { useState } from "react";
import PreviewCard from "./PreviewCard";
import { useDispatch } from "react-redux/es/exports";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const movieCardImg = movie.poster_path;

  dispatch({
    type: "STORE_MOVIE_ID_SUCCESS",
    payload: {
      movieID: movie.id,
    },
  });

  const [hover, setHover] = useState(false);

  return (
    <div
      className="movieCard"
      style={{
        backgroundImage:
          "url(" +
          `	https://www.themoviedb.org/t/p/w440_and_h660_face${movieCardImg}` +
          ")",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <div className="previewCard">
          <PreviewCard movie={movie} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default MovieCard;

// 무비카드에서, hover나 mouseon 같은 이벤트 발생 시, api를 요청하도록 한다?
// 요청이 완료되면 무비카드가 아닌, 프리뷰카드를 보여준다.
