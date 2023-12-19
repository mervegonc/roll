import React from "react";
import { Link,useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";

function Navbar() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    navigate(0) // Doğru şekilde useNavigate hook'unu kullanın
  };

  return (
    <AppBar position="static" sx={{
        backgroundImage: "linear-gradient(to right, #818f00, #058f00)",
        color: "white",
      }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={"left"}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', boxShadow: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="h6" component="div">
          {localStorage.getItem("currentUser") == null ? 
            <Link to="/auth" style={{ textDecoration: 'none', color: 'white', boxShadow: 'none' }}>Login/Register</Link>
            
           : 
            <div>
              <IconButton onClick={onClick}><LockOpen /></IconButton>
              <Link to={{ pathname: '/users/'+localStorage.getItem("currentUser")}} 
              style={{ textDecoration: 'none', color: 'white', boxShadow: 'none' }}>Profile</Link>
            </div>
          }
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
