import React, { useState, useEffect } from "react";
import PreviewCard from "./PreviewCard";

const MovieCard = ({ movie }) => {
  const movieCardImg = movie.poster_path;

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
