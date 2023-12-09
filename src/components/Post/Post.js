import React, { useState } from "react";
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors'; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";

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

function Post(props) {
  const { title, text, userId, userName } = props;
  const [expanded, setExpanded] = useState(false);
  const[liked, setLiked] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  }

  return (
    <div className="postContainer" sx={{ width: "80vw",marginBottom: "20px" }}>
    <Card sx={{ marginBottom: "20px" ,textAlign: 'left' }}>
        <CardHeader
          avatar={
            <Link to={{pathname :`/users/${userId}` }} style={{ textDecoration: 'none', color: 'white', boxShadow: 'none' }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
          }
         
          title={title}
          
          
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>  
        
          <IconButton 
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={liked?{color:"red"}:null}  />
    
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{}</CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
