import React from "react";
import logo from "../images/netflix_lg.png";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="nav">
      <img className="nav_logo" src={logo} alt="" />
      <Link to="/">HOME</Link>
      <Link to="/movies">MOVIE</Link>
    </div>
  );
};

export default Navbar;
