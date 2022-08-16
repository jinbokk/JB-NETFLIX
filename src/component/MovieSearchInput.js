import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const MovieSearchInput = () => {
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
    <ThemeProvider theme={theme}>
      {/* <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "300px" },
        }}
        autoComplete="off"
      > */}
      <h2>SEARCH</h2>
      <TextField
        id="filled-basic"
        label="Title,Actor,Genres"
        variant="standard"
      />
      {/* </Box> */}
    </ThemeProvider>
  );
};

export default MovieSearchInput;
