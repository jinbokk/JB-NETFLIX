import React from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux/es/exports";

function MovieVideoForBanner() {
  const movieKeyForBanner = useSelector(
    (state) => state.movie.movieKeyForBanner
  );

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      disablekb: 1,
      iv_load_policy: 3,
      controls: 0,
      fs: 0,
      rel: 0,
      loop: 1,
    },
  };

  return <YouTube videoId={movieKeyForBanner} opts={opts} />;
}

export default MovieVideoForBanner;
