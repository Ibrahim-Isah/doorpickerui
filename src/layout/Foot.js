import React from "react";

const Foot = () => {
  return (
    <section id="footer">
      <ul className="icons">
        <li>
          <a href="/" className="icon brands fa-twitter">
            <span className="label">Twitter</span>
          </a>
        </li>
        <li>
          <a href="/" className="icon brands fa-facebook-f">
            <span className="label">Facebook</span>
          </a>
        </li>
        <li>
          <a href="/" className="icon brands fa-instagram">
            <span className="label">Instagram</span>
          </a>
        </li>
        <li>
          <a href="/" className="icon brands fa-dribbble">
            <span className="label">Dribbble</span>
          </a>
        </li>
        <li>
          <a href="/" className="icon brands fa-github">
            <span className="label">GitHub</span>
          </a>
        </li>
      </ul>
      <div className="copyright">
        <ul className="menu">
          <li>
            &copy; {new Date().getFullYear()} Doorpicker. All rights reserved.
          </li>
          <li>
            Powered By: <a href="https://myessl.com">ESSL</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Foot;
