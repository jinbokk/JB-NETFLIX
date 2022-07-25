import React from "react";
import YouTube from "react-youtube";

class MovieVideo extends React.Component {
  videoOnReady(event) {
    event.target.pauseVideo();
    console.log(event.target);
  }

  render() {
    const opts = {
      height: "180",
      width: "320",
      playerVars: {
        autoplay: 1,
        controls: 0,
        fs: 0,
        modestbranding: 0,
        showinfo: 0,
        disablekb: 1,
        start: 30,
      },
    };

    return (
      <YouTube videoId="O63ZtKG8FfQ" opts={opts} onReady={this.videoOnReady} />
    );
  }
}

export default MovieVideo;
