import React, { useState, useRef, useEffect, useCallback } from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { theme, expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme?.transitions?.create("transform", {
    duration: theme?.transitions?.duration.shortest,
  }) || "none",
}));

const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin: auto;
`;

function Post(props) {
  const { title, text, userId, userName, postId, likes = [] } = props;
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(0);

  const isInitialMount = useRef(true);

  const refleshComments = useCallback(() => {
    fetch("http://localhost:8080/comments?" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [postId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refleshComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const saveLike = () => {
    fetch("http://localhost:8080/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    fetch("http://localhost:8080/likes/"+likeId, {
      method: "DELETE",
    })
      .catch((err) => console.log(err));
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
      console.log(likeId);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refleshComments();
  }, [refleshComments, commentList]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div sx={{}}>
      <Card
        sx={{
          textAlign: "left",
          backgroundColor: " #e3e6c8",
          boxShadow: "5px 5px 10px #888888",
          width: "110vh",
          margin: "auto",
        }}
      >
        <CardHeader
          avatar={
            <Link
              to={{ pathname: `/users/${userId}` }}
              style={{
                textDecoration: "none",
                color: "white",
                boxShadow: "none",
              }}
            >
              <Avatar
                sx={{
                  backgroundImage: "linear-gradient(to right, #818f00, #058f00)",
                  boxShadow: "5px 5px 10px #888888",
                  color: "white",
                }}
                aria-label="recipe"
              >
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
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
          {likeCount}
          <IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <CommentIcon />
            </ExpandMore>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <StyledContainer>
            {error ? (
              "error"
            ) : isLoaded ? (
              commentList.map((comment) => (
                <Comment
                  key={comment.id} // Benzersiz anahtar ekledim
                  userId={1}
                  userName={"USER"}
                  text={comment.text}
                ></Comment>
              ))
            ) : (
              "Loading..."
            )}
            <CommentForm
              userId={1}
              userName={"USER"}
              postId={postId}
            ></CommentForm>
          </StyledContainer>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
