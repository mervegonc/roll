import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Post from "../Post/Post";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div className="container" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
        <Container fixed sx={{ backgroundColor: "#e6ffe6", height: "100vh", paddingTop: "20px" }}>
      

  {postList.map((post) => (
    <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}/>
  ))}
</Container>

      </div>
    );
  }
}

export default Home;
