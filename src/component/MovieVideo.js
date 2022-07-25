import React from "react";
import YouTube from "react-youtube";

function MovieVideo({ movieKey }) {
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

  return <YouTube videoId={movieKey} opts={opts} />;
  // return <YouTube videoId="O63ZtKG8FfQ" opts={opts} />;
}

// class MovieVideo extends React.Component {

//   render() {
//     const opts = {
//       height: "180",
//       width: "320",
//       playerVars: {
//         autoplay: 1,
//         controls: 0,
//         fs: 0,
//         modestbranding: 0,
//         showinfo: 0,
//         disablekb: 1,
//         start: 30,
//       },
//     };

//     return (
//       <YouTube videoId="O63ZtKG8FfQ" opts={opts}/>
//     );
//   }
// }

export default MovieVideo;
