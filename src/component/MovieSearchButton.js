import * as React from "react";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

export default function MovieSearchButton({ genres, text }) {
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
