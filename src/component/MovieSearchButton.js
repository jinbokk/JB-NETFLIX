import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";
import ToggleButtons from "./ToggleButtons";

export default function MovieSearchButton({ genres }) {
  const [color, setColor] = useState("secondary");

  const toggleButton = (item) => {
    console.log(item, "Clicked");
    color === "secondary" ? setColor("primary") : setColor("secondary");
  }; // 모든 버튼이 리렌더링되어 색깔이 바뀌는 현상 발생.

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Grid
            xs={400}
            // container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {genres.map((item) => (
              <ToggleButtons genres={item.name} />
            ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
