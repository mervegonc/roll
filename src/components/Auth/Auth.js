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
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [userName, setUserName] =useState("");
    const [password, setPassword] =useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const sendRequest = (path) => {
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
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((result) => {
        console.log("Response data:", result);
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", userName);
      })
      .catch((err) => console.error("Error:", err));
  };
  
  

  const handleUsername =(value)=>{
    setUserName(value);
  }

  const handlePassword =(value)=>{
    setPassword(value);
  }

  const handleRegister =()=>{
    sendRequest("register")
    setUserName("")
    setPassword("")
   // history.go("/auth")
    navigate("/auth")
  }
  const handleLogin =()=>{
    sendRequest("Login")
    setUserName("")
    setPassword("");
  }

  

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
          value={userName}
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
        onClick={handleLogin}
        style={{ marginTop: "16px" }}
      >
        Login
      </Button>
      <FormHelperText style={{ margin: "20px" }}>
        Don't have an account?{" "}
        <Button color="primary" onClick={handleRegister}>
          Register
        </Button>
      </FormHelperText>
    </Paper>
    
  );
  
}

export default Auth;
