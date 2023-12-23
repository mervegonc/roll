import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  /*const handleButton = (path) => {
    fetch(`http://localhost:8080/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);

        if (data.message && typeof data.message === "string") {
          console.log("Received JWT Token:", data.message);
          localStorage.setItem("token", data.message);

           navigate('/');

        } else {
          console.error("Received JWT is not in valid string format.");
          setError("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An unexpected error occurred.");
      });
  };*/




 // ...

const handleButton = (path) => {
  fetch(`http://localhost:8080/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(async (response) => {
      const responseData = await response.json();

      console.log("Server Response:", responseData);

      try {
        const { message, userId } = responseData;
        console.log("Received JWT Token:", message);
        console.log("User ID:", userId);

        localStorage.setItem("token", message);

        // Anasayfaya yönlendir
        navigate('/');

      } catch (error) {
        console.error("Error parsing response as JSON:", error);
        setError("An unexpected error occurred.");
      }
    })
    .catch((err) => {
      console.log(err);
      setError("An unexpected error occurred.");
    });
};

// ...

  

  return (
    <Paper
      elevation={3}
      style={{
        width: 300,
        padding: 20,
        margin: "auto",
        marginTop: 100,
        textAlign: "center",
      }}
    >
      <Typography variant="h5">Login</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          value={username}
          onChange={(i) => handleUsername(i.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(i) => handlePassword(i.target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => handleButton("login")}
        style={{ marginTop: "16px" }}
      >
        Login
      </Button>
      {error && (
        <Typography color="error" style={{ marginTop: "16px" }}>
          {error}
        </Typography>
      )}
      <FormHelperText style={{ margin: "20px" }}>
        Don't have an account?{" "}
        <Button color="primary" onClick={() => handleButton("register")}>
          Register
        </Button>
      </FormHelperText>
    </Paper>
  );
}

export default Auth;
