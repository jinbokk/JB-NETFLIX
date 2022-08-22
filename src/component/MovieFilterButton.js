import * as React from "react";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";

let genreStore = [];

export default function MovieFilterButton({ genres, text }) {
  const dispatch = useDispatch();

  const [formats, setFormats] = useState(() => ["on", "off"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);

    if (genreStore.includes(event.target.value) === false) {
      return (
        genreStore.push(event.target.value),
        dispatch({
          type: "STORE_FILTERED_MOVIES_PARAMS_SUCCESS",
          payload: genreStore,
        }),
        console.log("after pushing", genreStore)
      );
    } else {
      let tempArray = genreStore.filter((item) => item !== event.target.value);
      return (
        (genreStore.length = 0),
        genreStore.push.apply(genreStore, tempArray),
        dispatch({
          type: "STORE_FILTERED_MOVIES_PARAMS_SUCCESS",
          payload: genreStore,
        }),
        console.log("after filtering", genreStore)
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
