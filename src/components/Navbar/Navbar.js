import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  let userId = 5;

  return (
    <AppBar position="static">
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
        <Typography variant="h6" component="div" >
         <Link to={{pathname :`/users/${userId}` }} style={{ textDecoration: 'none', color: 'white', boxShadow: 'none' }}>User</Link>
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
