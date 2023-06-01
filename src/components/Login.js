import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import UI from "../assets/bg.jpg.webp";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user?email=${data.email}&password=${data.password}`
      );
      if (response.status === 200 && response.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(response.data[0]));
        navigate("/");
      } else {
        alert("Incorrect email or password");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };
  useEffect(() => {
    let login = localStorage.getItem("user-info");
    if (login) {
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regex.test(data.email)) {
      alert("Please enter a valid email address");
      return;
    }
    login();
  };
  const handleLogin = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: ` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${UI})`,
        }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="text-light">Login Page</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={login.email}
              onChange={handleLogin}
              required
            />
            {!regex.test(data.email) && data.email.length > 0 && (
              <span className="text-danger">
                Please enter a valid email address
              </span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={login.password}
              onChange={handleLogin}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Login
          </Button>
          <p className="text-light">
            Are you want to become a member?
            <Link
              to="/registeration"
              className="btn btn-success m-3"
              aria-current="page"
            >
              Signup
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
