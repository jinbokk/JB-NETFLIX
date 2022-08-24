import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { movieFilterActions } from "../redux/actions/movieFilterActions";

// const minMaxYear = [];

export default function MovieFilterSlider({ min, max, text, id }) {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#ff5f52",
        main: "#c62828",
        dark: "#8e0000",
        contrastText: "#ffffff",
      },
    },
  });

  function valuetext(value) {
    return `${value}`;
  }

  const dispatch = useDispatch();

  const [value, setValue] = useState([min, max]);

  const minDistance = 1;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleDispatch = () => {
    if (id === "year") {
      console.log("year change committed");
      dispatch({
        type: "RELEASE_DATE_FILTER_STORE_SUCCESS",
        payload: { date_gte: value[0], date_lte: value[1] },
      });
      dispatch(
        movieFilterActions.getFilteredMovies(
          0,
          0,
          0,
          0,
          value[0],
          value[1],
          0,
          0
        )
      );
    } else if (id === "score") {
      console.log("score change committed");
      dispatch({
        type: "SCORE_FILTER_STORE_SUCCESS",
        payload: { vote_gte: value[0], vote_lte: value[1] },
      });
      dispatch(
        movieFilterActions.getFilteredMovies(
          0,
          0,
          0,
          0,
          0,
          0,
          value[0],
          value[1]
        )
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <h2>{text}</h2>
      <h2>
        {value[0]} ~ {value[1]}
      </h2>
      <Box sx={{ width: "300px" }}>
        <Slider
          id={id}
          getAriaLabel={() => "Minimum distance"}
          value={value}
          color="primary"
          onChange={handleChange}
          onChangeCommitted={handleDispatch}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={min}
          max={max}
          disableSwap
        />
      </Box>
    </ThemeProvider>
  );
}
