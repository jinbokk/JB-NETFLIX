import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";

// const minMaxYear = [];

export default function MovieSearchSlider({ min, max, text, id }) {
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

  // const innerText = document.getElementById("year").innerText;
  //render 전 innerText를 선언하려다보니 에러가 발생한다. 그렇다고 useEffect로 하자니 타깃을 못잡는데..

  // useEffect(() => {
  //   let lastValue = value;
  //   if (value !== lastValue) {
  //     console.log("change fire");
  //   }
  // }, [value]);

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
    } else if (id === "score") {
      console.log("score change committed");
      dispatch({
        type: "SCORE_FILTER_STORE_SUCCESS",
        payload: { vote_gte: value[0], vote_lte: value[1] },
      });
    }
  };

  // button 처럼, arary를 하나 만든다 (전역스코프로)
  // array에 value[min,max]를 push한다

  // issue! 슬라이더에서 1px 단위로 push가 실행된다. setValue가 된 다음 바꾸려면?

  // 해당 array를 dispatch하여 store에 저장한다.

  //---
  // 아니면, setValue 하위 함수로, 바로 값을 dispatch하여 처리해보자
  // 이 방법은 너무 많은 resorce를 소모한다. 매 슬라이드 1px마다 dispatch를 하게된다.

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
