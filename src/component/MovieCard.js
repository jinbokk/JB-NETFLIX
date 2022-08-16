import React, { useState, useEffect } from "react";
import PreviewCard from "./PreviewCard";
import styled from "styled-components";

const MovieCard = ({ movie }) => {
  const movieCardImg = movie.poster_path;

  const [hover, setHover] = useState(false);
  const [delayHandler, setDelayHandler] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleMouseEnter = () => {
    setIsMounted(true);
    setDelayHandler(
      setTimeout(() => {
        setHover(true);
      }, 700)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
    setIsMounted(false);
    setHover(false);
  };

  const toggleAnimation = () => {
    return isMounted ? (
      <div>
        <PreviewCard movie={movie} />
      </div>
    ) : (
      "animation:fadeOut .3s"
    );
  };

  return (
    <div
      className="movieCard"
      style={{
        backgroundImage:
          "url(" +
          `	https://www.themoviedb.org/t/p/w440_and_h660_face${movieCardImg}` +
          ")",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hover ? (
        <div>
          <PreviewCard movie={movie} />
        </div>
      ) : null}
    </div>
  );
};

export default MovieCard;
