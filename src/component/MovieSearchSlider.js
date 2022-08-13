import * as React from "react";
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

export default function MovieSearchSlider({ min, max }) {
  const [value1, setValue1] = React.useState([min, max]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "300px" }}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          color="primary"
          onChange={handleChange1}
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
