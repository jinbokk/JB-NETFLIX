import React, { useSelector } from "react";
import { useDispatch } from "react-redux/es/exports";
import YouTube, { YouTubeProps } from "react-youtube";

const PreviewCard = () => {

  // function playVideo() {
  //   const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  //     // access to player in all event handlers via event.target
  //     event.target.pauseVideo();
  //   };

  //   const opts: YouTubeProps["opts"] = {
  //     height: "390",
  //     width: "640",
  //     playerVars: {
  //       // https://developers.google.com/youtube/player_parameters
  //       autoplay: 1,
  //     },
  //   };

  //   return (
  //     <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />
  //   );
  // }
  // const dispatch = useDispatch();

  // const { popularMoviesData, topRatedMoviesData, upcomingMoviesData } =
  //   useSelector((state) => state.movie);

  return <div className="previewCard">PreviewCard</div>;
};

export default PreviewCard;
