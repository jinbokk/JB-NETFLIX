import * as React from "react";
import { useState, useEffect, useRef } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { movieFilterActions } from "../redux/actions/movieFilterActions";
import api from "../redux/api";

let genreStore = [];

export default function MovieFilterButton({ text, genreListData }) {
  const isMounted = useRef(false);

  const {
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  } = useSelector((state) => state.movieFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isMounted.current) {
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
      );
    } else {
      isMounted.current = true;
    }
  }, [withGenres]);

  const [formats, setFormats] = useState(() => ["on", "off"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);

    if (genreStore.includes(event.target.value) === false) {
      return (
        genreStore.push(event.target.value),
        dispatch({
          type: "STORE_MOVIE_GENRES_SUCCESS",
          payload: genreStore.join(" || "),
        }),
        console.log("after pushing", genreStore)
        // dispatch({ type: "GET_FILTERED_MOVIES_REQUEST" })
      );
    } else {
      let tempArray = genreStore.filter((item) => item !== event.target.value);
      return (
        (genreStore.length = 0),
        genreStore.push.apply(genreStore, tempArray),
        dispatch({
          type: "STORE_MOVIE_GENRES_SUCCESS",
          payload: genreStore.join(" || "),
        }),
        console.log("after filtering", genreStore)
        // dispatch({ type: "GET_FILTERED_MOVIES_REQUEST" })
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

  const MyToggleButton = styled(MuiToggleButton)({
    "&.MuiToggleButton-root": {
      fontWeight: "bold",
      color: "white",
      backgroundColor: theme.palette.secondary.dark,
      transition: ".3s",
      width: "80px",
      height: "40px",
      margin: "2px",
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
      <div style={{ maxHeight: "250px", overflow: "scroll" }}>
        <div className="genreButton_container">
          {genreListData.genres.map((item, index) => (
            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              color="primary"
              key={index}
            >
              {item.name === "Documentary" ? (
                <MyToggleButton value={item.id}>DOCU</MyToggleButton>
              ) : item.name === "Science Fiction" ? (
                <MyToggleButton value={item.id}>SF</MyToggleButton>
              ) : item.name === "TV Movie" ? (
                <MyToggleButton value={item.id}>TV</MyToggleButton>
              ) : (
                <MyToggleButton value={item.id}>{item.name}</MyToggleButton>
              )}
            </ToggleButtonGroup>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
