import React from "react";
import logo from "../images/netflix_lg.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  // let navigate = useNavigate();

  // function changeLocation(placeToGo) {
  //   navigate(placeToGo, { replace: true });
  //   window.location.reload();
  // }

  return (
    <div className="nav">
      <div className="nav_wrapper">
        {/* <Link to="/" onClick={() => changeLocation("/")}> */}
        <Link to="/">
          <img className="nav_logo" src={logo} alt="" />
        </Link>
        {/* <Link to="/" onClick={() => changeLocation("/")}>HOME</Link> */}
        <Link to="/">HOME</Link>
        {/* <Link to="/movies" onClick={() => changeLocation("/movies")}>MOVIE</Link> */}
        <Link to="/movies">MOVIE</Link>
      </div>
    </div>
  );
};

export default Navbar;
