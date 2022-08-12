import React from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux/es/exports";

function MovieVideo() {
  const movieKey = useSelector((state) => state.movie.movieKey);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      fs: 0,
      rel: 0,
      loop: 1,
      // showinfo: 0,
      // iv_load_policy: 1,
      // playsinline:1,
      // start: 10,
    },
  };

  return (
    <div className="video_container">
      <div className="video">
        <YouTube videoId={movieKey} opts={opts} />
      </div>
    </div>
  );
}

export default MovieVideo;
