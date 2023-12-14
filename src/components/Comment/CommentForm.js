import React, { useState } from "react";
import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";

const commentStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
};

const smallAvatarStyle = {
  width: "32px",
  height: "32px",
};

const linkStyle = {
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
};

function CommentForm(props) {
  const {userId, userName, postId } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    fetch("http://localhost:8080/comments",
    {
      method: "POST",
      headers: {
        "Content-Type" :"application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
    .then((res) =>res.json())
    .then((err) =>console.log("error"))
  }

  const handleSubmit = () => {
        saveComment();
        setText("");
  }

  const handleChange = (value) => {
    setText(value);     
}

  return (
    <CardContent style={commentStyle}>
      {/* Yorum girişi alanı */}
      <OutlinedInput
       
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 300 }}
        fullWidth
        onChange = {(i) => handleChange(i.target.value)}
       
        // Kullanıcının profiline giden bir bağlantı ekleyerek yorumun başına bir Avatar ekleyin
        startAdornment={
          <InputAdornment position="start">
            {/* Kullanıcının profil sayfasına giden bir bağlantı */}
            <Link to={{ pathname: `/users/${userId}` }} style={linkStyle}>
              {/* Kullanıcının baş harfini içeren Avatar */}
              <Avatar style={smallAvatarStyle} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment = {
            <InputAdornment position="end">
                <Button
                variant="contained"  sx={{
                        backgroundImage: "linear-gradient(to right, #818f00, #058f00)",
                        boxShadow: "5px 5px 10px #888888",
                        color: "white",
                      }}
                      onClick={handleSubmit}>Comment
                </Button>
            </InputAdornment>
        }
        value = {text}
      ></OutlinedInput>
      
    </CardContent>
  );
}

export default CommentForm;
