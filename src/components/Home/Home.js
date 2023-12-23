import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);


  const refreshPosts = () => {
    fetch("http://localhost:8080/posts")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP hatası! Durum: ${res.status}`);
      }
      return res.json();
    })
    .then(
      (result) => {
        setIsLoaded(true);
        setPostList(result);
      },
      (error) => {
        console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  
}

useEffect(() => {
   refreshPosts()
}, [])

  if (error) {
    return <div>Error-Home-</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#edede6", width: "170vh", margin: "auto" }}>
        <PostForm userId={1} userName={"ExampleUser"} refleshPosts={refreshPosts} style={{ margin: "20px" }} />
        {postList.map((post, index) => (
          <React.Fragment key={post.id}>
            <div style={{ margin: "20px" }}></div>
            <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} style={{ margin: "20px" }} />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Home;