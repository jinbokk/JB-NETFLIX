import React from "react";

const Banner = ({ movie }) => {
  const bannerPosterURL = movie.poster_path;

  return (
    <>
      <div className="banner_container">
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
            <h1>{movie.original_title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
