import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from './postcard';
import styles from './post.module.css'; // Import CSS Modules

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    navigate('/login'); // Redirect to login if not logged in
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} className={styles.postCard} />
        ))}
      </div>
      {loading && <div className={styles.loadingMessage}>Loading...</div>}
    </div>
  );
};

export default PostList;
