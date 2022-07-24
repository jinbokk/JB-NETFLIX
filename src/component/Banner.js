import React from "react";

const Banner = ({ popularMovies }) => {
  const bannerPosterURL = popularMovies.poster_path;

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${bannerPosterURL}` +
            ")",
        }}
      >
        <div className="banner_text">
          <h1>{popularMovies.original_title}</h1>
          <p>{popularMovies.overview}</p>
        </div>
      </div>
    </>
  );
};

export default Banner;
