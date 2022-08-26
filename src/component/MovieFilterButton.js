import * as React from "react";
import { useState, useEffect } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { movieFilterActions } from "../redux/actions/movieFilterActions";

let genreStore = [];

export default function MovieFilterButton({ genres, text, show }) {
  useEffect(() => {
    dispatch({ type: "RESET_FILTERED_MOVIES_STORE_SUCCESS" });
  }, []);

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

  const dispatch = useDispatch();

  const [formats, setFormats] = useState(() => ["on", "off"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);

    if (genreStore.includes(event.target.value) === false) {
      return (
        show(false),
        genreStore.push(event.target.value),
        dispatch({
          type: "STORE_MOVIE_GENRES_SUCCESS",
          payload: genreStore,
        }),
        console.log("after pushing", genreStore),
        dispatch(
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
        )
      );
    } else {
      let tempArray = genreStore.filter((item) => item !== event.target.value);
      return (
        (genreStore.length = 0),
        genreStore.push.apply(genreStore, tempArray),
        dispatch({
          type: "STORE_MOVIE_GENRES_SUCCESS",
          payload: genreStore,
        }),
        console.log("after filtering", genreStore),
        dispatch(
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
        )
      );
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#ff5f52",
        main: "#c62828",
        dark: "#8e0000",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#83312c",
        main: "#510002",
        dark: "#310000",
        contrastText: "#aaaaaa",
      },
    },
  });

  const ToggleButton = styled(MuiToggleButton)({
    "&.MuiToggleButton-root": {
      fontWeight: "bold",
      color: "white",
      backgroundColor: theme.palette.secondary.dark,
      transition: ".3s",
    },
    "&.MuiToggleButton-root:hover": {
      backgroundColor: theme.palette.primary.dark,
      transition: ".3s",
    },
    "&.Mui-selected,&.Mui-selected:hover": {
      backgroundColor: theme.palette.primary.main,
      transition: ".3s",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <h2>{text}</h2>
      {genres.map((item, index) => (
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          color="primary"
          key={index}
        >
          <ToggleButton value={item.name}>{item.name}</ToggleButton>
        </ToggleButtonGroup>
      ))}
    </ThemeProvider>
  );
}
