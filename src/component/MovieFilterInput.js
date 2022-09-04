import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { movieFilterActions } from "../redux/actions/movieFilterActions";

const MovieFilterInput = () => {
  const dispatch = useDispatch();

  const isMounted = useRef(false);

  const {
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  } = useSelector((state) => state.movieFilter);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(
        movieFilterActions.getFilteredMovies(
          keyword,
          sortBy,
          withGenres,
          includeVideo,
          releaseDateGte,
          releaseDateLte,
          voteAverageGte,
          voteAverageLte
        )
      );
    } else {
      isMounted.current = true;
    }
  }, [keyword]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(
        movieFilterActions.getFilteredMovies(
          keyword,
          sortBy,
          withGenres,
          includeVideo,
          releaseDateGte,
          releaseDateLte,
          voteAverageGte,
          voteAverageLte
        )
      );
    } else {
      isMounted.current = true;
    }
  }, [sortBy]);

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

  const MyFormControl = styled(FormControl)({
    ".MuiSelect-select": {
      backgroundColor: theme.palette.secondary.main,
      transition: ".3s",
      color: "white",
    },

    ".MuiSvgIcon-root": {
      color: "white",
    },
  });

  const [select, setSelect] = React.useState("ALL");

  const handleselect = (event, newSelect) => {
    setSelect(newSelect);
  };

  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    dispatch({ type: "STORE_MOVIE_SORT_SUCCESS", payload: event.target.value });
    dispatch({ type: "GET_FILTERED_MOVIES_REQUEST" });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="searchBar">
          <h2>SEARCH</h2>
          <MyFormControl fullWidth>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              color="primary"
              labelId="sort-label"
              id="sort"
              value={sort}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value={"popularity.asc"}>popularity.asc</MenuItem>
              <MenuItem value={"popularity.desc"}>popularity.desc</MenuItem>
              <MenuItem value={"original_title.asc"}>
                original_title.asc
              </MenuItem>
              <MenuItem value={"original_title.desc"}>
                original_title.desc
              </MenuItem>
              <MenuItem value={"release_date.asc"}>release_date.asc</MenuItem>
              <MenuItem value={"release_date.desc"}>release_date.desc</MenuItem>
              {/* <MenuItem value={"revenue.asc"}>revenue.asc</MenuItem>
              <MenuItem value={"revenue.desc"}>revenue.desc</MenuItem> */}
              {/* <MenuItem value={"primary_release_date.asc"}>
                primary_release_date.asc
              </MenuItem>
              <MenuItem value={"primary_release_date.desc"}>
                primary_release_date.desc
              </MenuItem> */}
              <MenuItem value={"vote_average.asc"}>vote_average.asc</MenuItem>
              <MenuItem value={"vote_average.desc"}>vote_average.desc</MenuItem>
              {/* <MenuItem value={"vote_count.asc"}>vote_count.asc</MenuItem>
              <MenuItem value={"vote_count.desc"}>vote_count.desc</MenuItem> */}
            </Select>
          </MyFormControl>
        </div>

        <TextField
          id="search_input"
          variant="filled"
          label="Movie Title"
          color="primary"
          sx={{ width: "100%" }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              dispatch({
                type: "SEARCH_KEYWORD_STORE_SUCCESS",
                payload: e.target.value,
              });
            }
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default MovieFilterInput;
