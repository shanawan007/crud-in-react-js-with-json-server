import React from "react";
import { Link } from "react-router-dom";
import Ui from "../assets/bg.jpg.webp";

const Home = () => {
  
  return (
    <>
      <div className="hero-image">
        <div className="hero-text">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Ui})`,
              height: 753,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <h1 className="display-3" style={{
                color:  `rgb(	211, 211, 250)`
              }}>RapidzZ Solution</h1>
              <p className="text-light" style={{
                color:  `rgb(	211, 211, 250)`
              }}>Service Based Company</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
