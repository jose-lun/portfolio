import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="about">
        <h2>Jose Luna</h2>
        <div className="prompt">
          <p>
            A software developer with a passion for teaching Math and Science.
          </p>
          <IconButton
            onClick={() =>  navigator.clipboard.writeText('joselunaboja@gmail.com')}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/jose-luna-986545129/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            href="https://github.com/jose-lun"
            target="_blank"
          >
            <GithubIcon />
          </IconButton>
        </div>
      </div>
      <div className="skills">
        <h1> Skills </h1>
        <ol className="list">
          <li className="item">
            <h2> Programming Languages </h2>
            <span>
              {" "}
              Javascript, Java, Python, C, Processing, HTML, CSS, SQL{" "}
            </span>
          </li>
          <li className="item">
            <h2> Non-Programming Languages </h2>
            <span> English, Spanish, French </span>
          </li>
          <li className="item">
            <h2> Other Skills </h2>
            <span>
              {" "}
              React, P5.js, NumPy, Keras, Guitar, Piano, Laundry, Knitting{" "}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
