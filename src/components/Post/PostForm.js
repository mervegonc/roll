import React, { useState } from "react";
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';

const ExpandMore = styled((props) => {
  const { theme, expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform:'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme?.transitions?.create('transform', {
    duration: theme?.transitions?.duration.shortest,
  }) || 'none', 
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function PostForm(props) {
  const {userId, userName,refleshPosts } = props;
  const [text, setText] =useState("");
  const [title, setTitle] =useState("");
  const [isSent, setIsSent] = useState(false);


  const savePost = () => {
    fetch("http://localhost:8080/posts",
    {
      method: "POST",
      headers: {
        "Content-Type" :"application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
    .then((res) =>res.json())
    .then((err) =>console.log("error"))
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refleshPosts();
   
  }
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  }
  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  return (
    <div >

<Snackbar
        open={isSent}
        autoHideDuration={12000} // Snackbar'ın kaç milisaniye boyunca açık kalacağını belirler
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>


    <Card sx={{
        
        backgroundColor: " #e3e6c8",
        boxShadow: "5px 5px 10px #888888",
        width: "110vh", margin:"auto"}}>
        <CardHeader
          avatar={
            <Link to={{pathname :`/users/${userId}` }} style={{ textDecoration: 'none', color: 'white', boxShadow: 'none' }}>
            <Avatar sx={{
        backgroundImage: "linear-gradient(to right, #818f00, #058f00)",
        boxShadow: "5px 5px 10px #888888",
        color: "white"
        
      }} aria-label="recipe">
             {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
          }
          title={<OutlinedInput
          id="outlined-adornment-amount"
          multiline
          placeholder="Title"
          inputProps={{maxLength:30}}
          fullWidth
          value = {title}
          onChange={(i) => handleTitle(i.target.value)}
          
          >
          </OutlinedInput>}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
             <OutlinedInput
                 id="outlined-adornment-amount"
                 multiline
                 placeholder="Text"
                 inputProps={{maxLength:300}}
                 fullWidth
                 value = {text}
                 onChange={(i) => handleText(i.target.value)}
                 endAdornment ={
                    <InputAdornment position="end">
                    <Button
                    variant="contained"  sx={{
                        backgroundImage: "linear-gradient(to right, #818f00, #058f00)",
                        boxShadow: "5px 5px 10px #888888",
                        color: "white",
                      }}
                      onClick={handleSubmit}>POST
                    </Button>
                    </InputAdornment>
                 }
                 >
                 </OutlinedInput>
          </Typography>
        </CardContent>
       
      </Card>
    </div>
  );
}

export default PostForm;
