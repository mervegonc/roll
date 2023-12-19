import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);


  const refleshPosts = () => {
    //  const token = localStorage.getItem('tokenKey');

    fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          console.error("Fetch error:", error);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refleshPosts();                                     //   <=== SORUN BURADA
  }, []);


  if (error) {
    return <div>Errorsorun!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#edede6", width: "170vh", margin: "auto" }}>
        <PostForm userId={1} userName={"ExampleUser"} refleshPosts={refleshPosts} style={{ margin: "20px" }} />
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