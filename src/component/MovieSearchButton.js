import * as React from "react";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";

let genreStore = [];

export default function MovieSearchButton({ genres, text }) {
  const dispatch = useDispatch();

  const [formats, setFormats] = useState(() => ["on", "off"]);

  // const [selectedGenre, setSelectedGenre] = useState([]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);

    // array를 하나 만든다 (전역 scope로 이동하였음) ok

    // array에 event.target.value를 push한다. ok
    if (genreStore.includes(event.target.value) === false) {
      return (
        genreStore.push(event.target.value),
        dispatch({
          type: "STORE_MOVIES_SEARCH_PARAMS_SUCCESS",
          payload: genreStore,
        }),
        console.log(genreStore)
      );
    } else {
      return (
        genreStore.pop(event.target.value),
        dispatch({
          type: "STORE_MOVIES_SEARCH_PARAMS_SUCCESS",
          payload: genreStore,
        }),
        console.log(genreStore)
      );
    }

    //issue! push를 했는데, 이전의 데이터를 덮어쓰며 입력이 된다.
    //즉, 데이터가 push가 되어 새로이 입력은 되는데 이전 데이터는 배열에서 날아가는 문제 발생.

    //solve? push 이후, 다시 handleformat이 실행되면서 genreStore=[]로 초기화 시키는 것은 아닐까?
    // genreStore를 scope 밖으로 빼주었더니, 잘 작동 된다. ok

    // push까지 마쳐진 array를 dispatch로 store에 저장한다. ok

    // push가 잘 되는 것은 확인 했으며, 이제 array에 중복 값이 있을시, 해당 값을 제외하도록 하여
    // toggle 기능과 개념을 맞추도록 한다 ok
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
