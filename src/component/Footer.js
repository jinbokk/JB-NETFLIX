import React from "react";
import { GoMarkGithub } from "react-icons/go";
import velogIcon from "../images/velog_icon.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <ul className="footer_structural">
          <div style={{ marginBottom: "20px" }}>
            <span style={{ marginRight: "15px" }}>
              <a
                href="https://github.com/jinbokk"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "25px",
                }}
              >
                <GoMarkGithub />
              </a>
            </span>

            <span style={{ marginRight: "15px" }}>
              <a
                href="https://velog.io/@jinbokk"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "25px",
                  marginBottom: "20px",
                }}
              >
                <img src={velogIcon} alt="" width={"25px"} />
              </a>
            </span>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <li className="footer_link_item">
              <a className="footer_link">FAQ</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Help Center</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Account</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Media Center</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Investor Relations</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Ways to Watch</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Terms of Use</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Privacy</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Cookie Preferences</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Corporate Information</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Contact Us</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Speed Test</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Legal Notices</a>
            </li>
            <li className="footer_link_item">
              <a className="footer_link">Only on Netflix</a>
            </li>
          </div>

          <div className="footer_info">
            <div style={{ marginBottom: "15px" }}>
              Email: eyelash1024@naver.com
            </div>
            <div>This site is for personal projects</div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Footer;
