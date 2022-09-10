import React from "react";
import "./header.scss";
import Date from "../../helper/todoDate";

const Header = () => {
  const dateNow = Date();
  return (
    <header>
      <h2>{dateNow}</h2>
    </header>
  );
};

export default Header;
