import * as React from "react";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

export default function ToggleButtons({ genres }) {
  const [formats, setFormats] = useState(() => ["on", "off"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
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
      color: "white",
      backgroundColor: theme.palette.secondary.dark,
    },
    "&.MuiToggleButton-root:hover": {
      color: "white",
      backgroundColor: theme.palette.primary.dark,
    },
    "&.Mui-selected,&.Mui-selected:hover": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        color="primary"
      >
        <ToggleButton value={genres}>{genres}</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
