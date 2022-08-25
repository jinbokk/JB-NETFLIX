import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { movieFilterActions } from "../redux/actions/movieFilterActions";

const MovieFilterInput = ({ show }) => {
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

  const [select, setSelect] = React.useState("ALL");

  const handleselect = (event, newSelect) => {
    setSelect(newSelect);
  };

  const test = (toggle) => {
    console.log("button clicked");
    dispatch({
      type: "INCLUDE_MOVIE_VIDEO_TOGGLE_SUCCESS",
      payload: toggle,
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="searchBar">
          <h2>SEARCH</h2>
          <ToggleButtonGroup
            color="primary"
            value={select}
            exclusive
            onChange={handleselect}
            size="small"
            aria-label="Include Movie Video"
          >
            <ToggleButton
              value="ALL"
              aria-label="ALL"
              onClick={() => test(false)}
            >
              ALL
            </ToggleButton>
            <ToggleButton
              value="Include Movie Video"
              aria-label="Include Movie Video"
              onClick={() => test(true)}
            >
              Include Movie Video
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <TextField
          id="search_input"
          variant="filled"
          label="Movie Title"
          color="primary"
          sx={{ width: "310px" }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              show(false);
              dispatch({
                type: "SEARCH_KEYWORD_STORE_SUCCESS",
                payload: e.target.value,
              });

              // 위 코드처럼 모든 필터 컴포넌트들이 각자 state를 업데이트 한 상태이다
              // 이제 아래 코드에서부터는, 해당 state를 getfilteredmovies 함수에 전달인자로 하여 함수를 호출해야 한다.
              // 그렇게 되면 movies 페이지에서, filteredmoviesData를 useSelector로 받아와서 화면에 렌더링 한다.

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

              // dispatch(movieFilterActions.getFilteredMovies(e.target.value));

              // dispatch({ type: "RESET_MOVIE_STORE_SUCCESS" });

              // if (e.target.value === !undefined) {
              //   show(false);
              //   dispatch({
              //     type: "SEARCH_KEYWORD_STORE_SUCCESS",
              //     payload: { keyword: e.target.value },
              //   });
              //   dispatch(
              //     movieFilterActions.getFilteredMovies(e.target.value, 1)
              //   );
              //   // dispatch({ type: "RESET_MOVIE_STORE_SUCCESS" });
              // } else {
              //   document.getElementById(
              //     "MovieList_wrapper"
              //   ).innerHTML += `<h2 class="noResultMessage">Please enter the movie name</h2>`;
              // }
            }
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default MovieFilterInput;
