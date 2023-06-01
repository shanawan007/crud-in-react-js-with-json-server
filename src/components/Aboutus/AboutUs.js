import React from "react";
import Ui from '../../assets/bg.jpg.webp';

const AboutUs = () => {
  
  return (
    <>
      <div className="hero-image">
        <div className="hero-text">
          <div className="about"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Ui})`,
            height : 753,
            position : "relative"}} >
            <div
              style={{
                position: "absolute",
                top: "47%",
                left: "50%",
                transform: "translate(-50%, -40%)",
                textAlign: "center",
              }}
            >
              <h1 className="display-3" style={{
                color:  `rgb(	211, 211, 250)`
              }}>Welcome to Rapidzz Solutions</h1>
              <h6 style={{
                color:  `rgb(	211, 211, 250)`
              }}>If you own a business, have ambitious growth goals, and are looking for an awesome partner to help you measurably improve your marketing performance and get more leads and sales from the web, you’ve come to the right place. We believe that, “Good is not good, where better is expected”. Quality for us is our commitment to our trusted clients, we want them to own our name and relish on the products and services we provide them. Our main emphasis is to deliver maximum determination in every project we undertake. With our time tested business methodology, and structured solution building approach, we ensure to maintain our global business standards.</h6>
              {/* <button className="btn btn-outline-light mt-4" style={{
                color:  `rgb(	211, 211, 250)`
              }}> Services</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
