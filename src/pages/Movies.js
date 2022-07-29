import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { ClipLoader } from "react-spinners";
import MovieCollection from "../component/MovieCollection";

const Movies = () => {
  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData, loading } =
    useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieActions.getMovies());
  }, []);

  return loading ? (
    <div className="loadingSpinner">
      <ClipLoader color="red" loading={loading} size={300} />
    </div>
  ) : (
    <div className="MovieCollection">
      <MovieCollection />
    </div>
  );
};

export default Movies;
