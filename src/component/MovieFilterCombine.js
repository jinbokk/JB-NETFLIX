import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { movieFilterActions } from "../redux/actions/movieFilterActions";

// const MovieFilterCombine = () => {
//   const dispatch = useDispatch();

//   const {
//     keyword,
//     sortBy,
//     withGenres,
//     includeVideo,
//     releaseDateGte,
//     releaseDateLte,
//     voteAverageGte,
//     voteAverageLte,
//   } = useSelector((state) => state.movieFilterReducer);

//   return dispatch(
//     movieFilterActions.getFilteredMovies(
//       keyword,
//       sortBy,
//       withGenres,
//       includeVideo,
//       releaseDateGte,
//       releaseDateLte,
//       voteAverageGte,
//       voteAverageLte
//     )
//   );
// };

// export default MovieFilterCombine;

export default function MovieFilterCombine() {
  const dispatch = useDispatch();

  const {
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  } = useSelector((state) => state.movieFilterReducer);

  return dispatch(
    movieFilterActions.getFilteredMovies(
      keyword,
      sortBy,
      withGenres,
      includeVideo,
      releaseDateGte,
      releaseDateLte,
      voteAverageGte,
      voteAverageLte
    )
  );
}
