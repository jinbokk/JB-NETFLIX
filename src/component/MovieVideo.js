import React from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux/es/exports";

function MovieVideo() {
  const movieKey = useSelector((state) => state.movie.movieKey);
  console.log("movieKey is", movieKey);

  const opts = {
    height: "200",
    width: "320",
    playerVars: {
      autoplay: 1,
      controls: 0,
      fs: 0,
      showinfo: 0,
      // rel: 0,
      // iv_load_policy: 1,
      // playsinline:1,
      // start: 10,
    },
  };

  return <YouTube videoId={movieKey} opts={opts} />;
}

export default MovieVideo;
