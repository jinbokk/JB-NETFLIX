import React, { useSelector } from "react";
import { useDispatch } from "react-redux/es/exports";

const PreviewCard = () => {
  const dispatch = useDispatch();

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData } =
    useSelector((state) => state.movie);

  return <div className="previewCard">PreviewCard</div>;
};

export default PreviewCard;
