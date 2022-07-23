import React, { useEffect } from "react";
import Banner from "../component/Banner";
import { useDispatch } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieActions.getMovies());
  }, []);

  return (
    <div>
      Home
      <Banner />
    </div>
  );
};

export default Home;
