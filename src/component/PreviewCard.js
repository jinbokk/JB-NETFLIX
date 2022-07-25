import React from "react";
import MovieVideo from "./MovieVideo";

const PreviewCard = ({ item }) => {
  const movieID = item.id;

  return (
    <div>
      <div className="previewVideo">
        <MovieVideo movieID={movieID} />
      </div>
    </div>
  );
};

export default PreviewCard;
