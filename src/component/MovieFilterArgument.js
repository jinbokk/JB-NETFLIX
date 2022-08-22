import { useSelector } from "react-redux";

export default function MovieFilterArgument() {
  const {
    keyword,
    withGenres,
    includeVideo,
    primaryReleaseDateGte,
    primaryReleaseDateLte,
    voteAverageGte,
    voteAverageLte,
  } = useSelector((state) => state.movieFilter);

  return {
    keyword,
    withGenres,
    includeVideo,
    primaryReleaseDateGte,
    primaryReleaseDateLte,
    voteAverageLte,
  };
}
