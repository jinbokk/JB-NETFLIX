import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { movieSearchActions } from "../redux/actions/movieSearchActions";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const MovieSearchInput = ({ show }) => {
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
          onKeyPress={function storeKeyword(e) {
            if (e.key === "Enter") {
              show(false);
              dispatch({
                type: "SEARCH_KEYWORD_STORE_SUCCESS",
                payload: { keyword: e.target.value },
              });
              dispatch(movieSearchActions.getSearchedMovies(e.target.value));
              // dispatch({ type: "RESET_MOVIE_STORE_SUCCESS" });

              // if (e.target.value === !undefined) {
              //   show(false);
              //   dispatch({
              //     type: "SEARCH_KEYWORD_STORE_SUCCESS",
              //     payload: { keyword: e.target.value },
              //   });
              //   dispatch(
              //     movieSearchActions.getSearchedMovies(e.target.value, 1)
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

export default MovieSearchInput;
