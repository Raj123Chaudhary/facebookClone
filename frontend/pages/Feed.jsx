// import axios from "axios";
// import { useEffect, useState } from "react";

// const Feed = () => {
//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       text: "Hello world 🌍",
//       likes: 0,
//       comments: [],
//     },
//   ]);

//   const handleLike = (id) => {
//     const updated = posts.map((post) =>
//       post.id === id ? { ...post, likes: post.likes + 1 } : post,
//     );
//     setPosts(updated);
//   };

//   const handleComment = (id, commentText) => {
//     const updated = posts.map((post) =>
//       post.id === id
//         ? { ...post, comments: [...post.comments, commentText] }
//         : post,
//     );
//     setPosts(updated);
//   };
//   const getAllPosts = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:3000/api/v1/posts/getAllPosts", // ✅ correct port
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ IMPORTANT
//           },
//         },
//       );

//       console.log(res);
//     } catch (error) {
//       console.log(error?.response?.data?.message);
//     }
//   };
//   useEffect(() => {
//     getAllPosts();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Feed</h2>

//       {posts.map((post) => (
//         <div key={post.id} style={styles.card}>
//           <p>{post.text}</p>

//           <button onClick={() => handleLike(post.id)}>
//             👍 Like ({post.likes})
//           </button>

//           <CommentBox onAdd={(text) => handleComment(post.id, text)} />

//           <div>
//             {post.comments.map((c, i) => (
//               <p key={i}>💬 {c}</p>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const CommentBox = ({ onAdd }) => {
//   const [text, setText] = useState("");

//   return (
//     <div>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write comment..."
//       />
//       <button
//         onClick={() => {
//           onAdd(text);
//           setText("");
//         }}
//       >
//         Comment
//       </button>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     border: "1px solid #ccc",
//     padding: "10px",
//     marginBottom: "10px",
//   },
// };

// export default Feed;
import { backendurl } from "../services/apis";
import axios from "axios";
import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // ✅ GET ALL POSTS
  const getAllPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(backendurl + "/api/v1/posts/getAllPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      // ✅ Set real backend data
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // ✅ LIKE (UI ONLY for now)
  const handleLike = (id) => {
    const updated = posts.map((post) =>
      post._id === id ? { ...post, likeCount: post.likeCount + 1 } : post,
    );
    setPosts(updated);
  };

  // ✅ COMMENT (UI ONLY for now)
  const handleComment = (id, commentText) => {
    if (!commentText.trim()) return;

    const updated = posts.map((post) =>
      post._id === id
        ? {
            ...post,
            comments: [...(post.comments || []), { text: commentText }],
          }
        : post,
    );

    setPosts(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feed</h2>

      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.card}>
            {/* ✅ TITLE */}
            <p>{post.title}</p>

            {/* ✅ LIKE */}
            <button onClick={() => handleLike(post._id)}>
              👍 Like ({post.likeCount})
            </button>

            {/* ✅ COMMENTS */}
            <div style={{ marginTop: "10px" }}>
              {post.comments?.map((c, i) => (
                <p key={i}>💬 {c.text || c}</p>
              ))}
            </div>

            {/* ✅ ADD COMMENT */}
            <CommentBox onAdd={(text) => handleComment(post._id, text)} />
          </div>
        ))
      )}
    </div>
  );
};

// ✅ COMMENT INPUT COMPONENT
const CommentBox = ({ onAdd }) => {
  const [text, setText] = useState("");

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write comment..."
      />
      <button
        onClick={() => {
          onAdd(text);
          setText("");
        }}
      >
        Comment
      </button>
    </div>
  );
};

// ✅ STYLES
const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default Feed;
