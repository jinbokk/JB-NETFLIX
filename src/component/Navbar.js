import React from "react";
import logo from "../images/netflix_lg.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav_wrapper">
        <Link to="/">
          <img className="nav_logo" src={logo} alt="" />
        </Link>
        <Link to="/">HOME</Link>
        <Link to="/movies">MOVIES</Link>
      </div>
    </div>
  );
};

export default Navbar;
