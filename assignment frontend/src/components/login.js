import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function fetch(mainurl, body) {
    try {
      const response = await axios.post(mainurl, body);

      if (response.data.id != -1) {
        localStorage.setItem("id", response.data.id);
        navigate("/search");
      } else {
        navigate("/login");
        console.log("wrong credentials");
      }
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  }

  const handleSubmit = async (event) => {
    let url = `http://localhost:3001/api/login`;
    let body = {
      username: username,
      password: password,
    };
    event.preventDefault();

    // Perform login logic here
    try {
      await fetch(url, body);
    } catch (error) {
      console.error("wrong credentials", error.message);
    }
    console.log(`Username: ${username}, Password: ${password}`);

    // Reset the form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
