import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { movieSearchActions } from "../redux/actions/movieSearchActions";

const MovieSearchInput = () => {
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

  return (
    <>
      <h2>SEARCH</h2>
      <ThemeProvider theme={theme}>
        <TextField
          id="search_input"
          variant="filled"
          label="Movie Title"
          color="primary"
          sx={{ width: "310px" }}
          onKeyPress={function storeKeyword(e) {
            if (e.key === "Enter") {
              dispatch({
                type: "SEARCH_KEYWORD_STORE_SUCCESS",
                payload: { keyword: e.target.value },
              });
              dispatch(movieSearchActions.getSearchedMovies(e.target.value, 1));
            }
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default MovieSearchInput;
