import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
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

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <CardContent style={commentStyle}>
      {/* Yorum girişi alanı */}
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
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
      />
    </CardContent>
  );
}

export default Comment;
