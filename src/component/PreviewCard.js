import React, { useEffect } from "react";
import MovieVideo from "./MovieVideo";
import { useDispatch } from "react-redux/es/exports";
import api from "../redux/api";

const PreviewCard = ({ movie }) => {
  // const dispatch = useDispatch();

  // const API_KEY = process.env.REACT_APP_API_KEY;
  // const movie_id = movie.id;

  // const getMovieKey = async () => {
  //   const data = await api.get(
  //     `/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
  //   );
  //   return data;
  // };

  // useEffect(() => {
  //   dispatch({
  //     type: "STORE_MOVIE_ID_SUCCESS",
  //     payload: {
  //       movieVideos: {getMovieKey},
  //     },
  //   });
  // }, []);

  return (
    <div>
      <div className="previewVideo">
        <MovieVideo movieKey={movie_id} />
      </div>
    </div>
  );
};

export default PreviewCard;
