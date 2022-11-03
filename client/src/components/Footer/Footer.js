import React from "react";
import "./footer.scss";
import Github from "../../assets/images/svg/github.svg";
import Linkedin from "../../assets/images/svg/linkedin.svg";
import Twitter from "../../assets/images/svg/twitter.svg";
import Facebook from "../../assets/images/svg/facebook.svg";
import Instagram from "../../assets/images/svg/instagram.svg";

const Footer = () => {
  return (
    <div className="listFooter">
      <h2>Follow me</h2>
      <div className="socialMedia">
        <a
          href="https://github.com/AmirAlakbarli"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={Github} alt="" />
        </a>
        <a
          href="https://www.linkedin.com/in/amir-alakbarli-486461133/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={Linkedin} alt="" />
        </a>
        <a
          href="https://twitter.com/amiralakbarli"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={Twitter} alt="" />
        </a>
        <a
          href="https://www.facebook.com/amir.alakbarli/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={Facebook} alt="" />
        </a>
        <a
          href="https://www.instagram.com/amiralakbarli/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
