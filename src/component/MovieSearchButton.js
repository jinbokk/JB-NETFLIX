import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";

export default function MovieSearchButton({ genres }) {
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

  const [color, setColor] = useState("secondary");

  const toggleButton = (item) => {
    console.log(item, "Clicked");
    color === "secondary" ? setColor("primary") : setColor("secondary");
  }; // 모든 버튼이 리렌더링되어 색깔이 바뀌는 현상 발생.

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Grid
            xs={400}
            // container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Button variant="contained" color="primary">
              Contained
            </Button>
            {genres.map((item) => (
              <Button
                variant="contained"
                color={color}
                onClick={() => toggleButton(item.name)}
              >
                <span>{item.name}</span>
              </Button>
            ))}
          </Grid>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
