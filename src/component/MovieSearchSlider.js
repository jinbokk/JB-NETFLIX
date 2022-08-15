import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const minDistance = 1;

export default function MovieSearchSlider({ min, max, text }) {
  const [value, setValue] = useState([min, max]);

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

  return (
    <ThemeProvider theme={theme}>
      <h2>{text}</h2>
      <h2>
        {value[0]} ~ {value[1]}
      </h2>
      <Box sx={{ width: "300px" }}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value}
          color="primary"
          onChange={handleChange}
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
