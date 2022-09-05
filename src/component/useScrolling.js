import React, { useEffect } from "react";
import api from "../redux/api";

export default async function useScrolling(
  keyword,
  sortBy,
  withGenres,
  includeVideo,
  releaseDateGte,
  releaseDateLte,
  voteAverageGte,
  voteAverageLte,
  pageNum
) {
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {}, [
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
    pageNum,
  ]);

  const FilteredMovies = await api.get(
    `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&region=US${
      keyword ? `&with_text_query=${keyword}` : ""
    }${includeVideo ? `&include_video=${includeVideo}` : ""}${
      releaseDateGte ? `&release_date.gte=${releaseDateGte}` : ""
    }${releaseDateLte ? `&release_date.lte=${releaseDateLte}` : ""}${
      voteAverageGte ? `&vote_average.gte=${voteAverageGte}` : ""
    }${voteAverageLte ? `&vote_average.lte=${voteAverageLte}` : ""}${
      withGenres ? `&with_genres=${withGenres}` : ""
    }${
      sortBy ? `&sort_by=${sortBy}` : "&sort_by=popularity.desc"
    }&page=${pageNum}`
  );

  const FilteredMoviesJson = FilteredMovies;

  return <div>useScrolling</div>;
}
