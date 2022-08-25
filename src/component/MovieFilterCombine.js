import { useSelector } from "react-redux";

const MovieFilterCombine = () => {
  const [
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  ] = useSelector((state) => [
    state.movieFilter.keyword,
    state.movieFilter.sortBy,
    state.movieFilter.withGenres,
    state.movieFilter.includeVideo,
    state.movieFilter.releaseDateGte,
    state.movieFilter.releaseDateLte,
    state.movieFilter.voteAverageGte,
    state.movieFilter.voteAverageLte,
  ]);

  console.log(keyword);

  return [
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  ];
};

export { MovieFilterCombine };
