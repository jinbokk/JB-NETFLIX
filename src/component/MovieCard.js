import React from "react";
import PreviewCard from "./PreviewCard";

const MovieCard = ({ item }) => {
  const movieCardImg = item.poster_path;
  const viewPreviewCard = (e) => {
    console.log(e.target);
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
      onMouseOver={viewPreviewCard}
    ></div>
  );
};

export default MovieCard;
