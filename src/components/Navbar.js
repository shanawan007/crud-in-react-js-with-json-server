import React, { useCallback, useEffect, useState } from "react";
import {  Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
function NavBar() {
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("user-info");
    const userInfo = JSON.parse(user)
    setUser(userInfo)
  }, []);
  const checkRole = useCallback(()=> {
    if (user && user.roleAdmin === true ) {
      console.log("admin")
      return true
    } 
    if (user && user.roleAdmin === false ) {
      console.log("user")
      return false
    }
  }, [user] )
  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="md"
        variant="dark"
        className="navbar"
      >
        <div className="one">
          <Navbar.Brand href="#" className="logo">
            <img src={logo} width="60" height="50" alt="" />
          </Navbar.Brand>
        </div>
        <div className="two">
          <Navbar.Toggle aria-controls="responsive-navbar-nav " />
          <Navbar.Collapse id="responsive-navbar-nav navs">
            <Nav className="nav justify-content-center">
              <Link className="nav-links text-light lik" to="/">
                Home
              </Link>
              <Link className="nav-links text-light lik" to="/Aboutus">
                About Us
              </Link>
              {checkRole() &&
                <Link className="nav-links text-light lik" to="/EmployeeTable">
                  EmployeeTable
                </Link>
                
              }
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="three">
          <button
            className="btn btn-outline-light"
            onClick={logout}
            style={{ color: `rgb(	211, 211, 250)` }}
          >
            Logout
          </button>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
