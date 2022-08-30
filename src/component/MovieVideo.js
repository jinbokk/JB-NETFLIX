import React from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux/es/exports";

function MovieVideo() {
  const movieKey = useSelector((state) => state.movie.movieKey);
  // console.log("비디오아이디 테스트중", videoId);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      fs: 0,
      rel: 0,
    },
  };

  return <YouTube videoId={movieKey} opts={opts} />;
}

export default MovieVideo;
