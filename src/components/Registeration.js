import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import UI from "../assets/bg.jpg.webp";

function Signup() {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleAdmin:false
  });
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState("");
  const [lastNameValid, setLastNameValid] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [alreadyExistData, setAlreadyExistData] = useState(false);
  const [newEmployee, setNewEmployee] = useState([]);
  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  const namePattern = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
  useEffect(() => {
    fetch("http://localhost:8000/user")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        setNewEmployee(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    let login = localStorage.getItem("user-info")
    if (login) {
      navigate('/')
    }
    },[]);
  const checkEmailFormat = (email) => {
    console.log("odsajnfoasaocsnao");
    return emailPattern.test(email);
  };
  const checkNameFormat = (name) => {
    console.log("odsajnfoasaocsnao");
    return namePattern.test(name);
  };

  const checkDuplicateEmail = (email) => {
    const duplicate = newEmployee.some((employee) => employee.email === email);
    if (duplicate) {
      setEmailError("This email already exists");
    } else {
      setAlreadyExistData(false);
      setEmailError("");
    }
  };

  const handleOnSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUp({ ...signUp, [name]: value });
    if (name === "password") {
      if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        setPasswordValid(false);
        setPasswordError(
          "Password contain only 8 characters, uppercase letter, lowercase letter, number."
        );
      } else {
        setPasswordValid(true);
        setPasswordError("");
        if (signUp.confirmPassword && signUp.confirmPassword !== value) {
          setPasswordMatch(false);
          setPasswordError("Passwords do not match");
        } else {
          setPasswordMatch(true);
          setPasswordError("");
        }
      }
    } else if (name === "confirmPassword") {
      if (value !== signUp.password) {
        setPasswordMatch(false);
        setPasswordError("Passwords do not match");
      } else {
        setPasswordMatch(true);
        setPasswordError("");
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    const duplicate = newEmployee.some(
      (employee) => employee.email === signUp?.email
    );
    if (!passwordValid) {
      setPasswordError(
        `Password contain only 8 characters, uppercase letter, lowercase letter, number`
      );
      return;
    }
    setEmailValid(false);
    if (duplicate) {
      setAlreadyExistData(true);
    } else {
      setSignUp({ ...signUp, id: newEmployee.length + 1 });
      setNewEmployee([...newEmployee, signUp]);
      await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      })
        .then((res) => {
          fetch("http://localhost:8000/user")
            .then((res) => {
              return res.json();
            })
            .then((resp) => {
              localStorage.setItem("user-info", JSON.stringify(signUp));
              navigate("/"); 
              console.log(resp);
              setSignUp({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
              setNewEmployee(resp);

              if (signUp.email === newEmployee.email) {
                console.log(resp.message);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
          console.log("Signup Successfully: ", res);
        })
        .catch((error) => {
          console.log("Error Signup: ", error);
        });
    }
  };
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100 cl"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${UI})`,
          height: 500,
        }}
      >
        <Form onSubmit={handleSubmit}>
            <h1 className="m-5 text-light">Registeration Form</h1>
            <Form.Group controlId="formBasicFirstName">
            <Form.Label className="text-light">First Name</Form.Label>
            <Form.Control

              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={signUp.firstName}
              onChange={(e) => {
                setSignUp({ ...signUp, firstName: e.target.value });
                setNameValid(namePattern.test(e.target.value));
                const errorCheck = checkNameFormat(e.target.value);
                console.log(errorCheck);
                if (!errorCheck) {
                  setNameValid(true);
                } else {
                  setNameValid(false);
                }
              }}
              required
              style={{ width: '600px' }}
            />
          </Form.Group>
          <div>
              {nameValid && (
                <div className="text-danger">
                  Please enter a valid name.
                </div>
              )}
            </div>
          <Form.Group controlId="formBasicLastName">
            <Form.Label className="text-light">Last Name</Form.Label>
            <Form.Control
            
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={signUp.lastName}
              onChange={(e) => {
                setSignUp({ ...signUp, lastName: e.target.value });
                setLastNameValid(namePattern.test(e.target.value));
                const errorCheck = checkNameFormat(e.target.value);
                console.log(errorCheck);
                if (!errorCheck) {
                  setLastNameValid(true);
                } else {
                  setLastNameValid(false);
                }
              }}
              required
            
            />
            {lastNameValid && (
                <div className="text-danger">
                  Please enter a valid name.
                </div>
              )}
          </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-light">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={signUp.email}
                onChange={(e) => {
                  setSignUp({ ...signUp, email: e.target.value });
                  checkDuplicateEmail(e.target.value);
                  setEmailValid(emailPattern.test(e.target.value));
                  const errorCheck = checkEmailFormat(e.target.value);
                  console.log(errorCheck);
                  if (!errorCheck) {
                    setEmailValid(true);
                  } else {
                    setEmailValid(false);
                  }
                }}
                required
              />
            </Form.Group>
            <div>
              {emailError && <div className="text-danger">{emailError}</div>}
              {emailValid && (
                <div className="text-danger">
                  Please enter a valid email address.
                </div>
              )}
            </div>
            <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
            
              type="password"
              placeholder="Enter password"
              name="password"
              value={signUp.password}
              onChange={handleOnSignUpChange}
              required
            />
          </Form.Group>
                <div>
                {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                )}
                </div>
            <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label className="text-light">Confirm Password</Form.Label>
            <Form.Control
            
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              value={signUp.confirmPassword}
              onChange={handleOnSignUpChange}
              required
            />
          </Form.Group>
              
            <Button className="m-2"type="submit" disabled={alreadyExistData}>
              Submit form
            </Button>
              <p className="text-light">
              Already Registered?
              <Link to="/"  className="btn btn-success m-3"
              aria-current="page">
                Login
              </Link>
            </p>
        </Form>
      </div>
    </>
  );
}
export default Signup;
