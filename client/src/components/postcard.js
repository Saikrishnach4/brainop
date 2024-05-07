import React from 'react';
import styles from './postcard.module.css'; // Import CSS Modules

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}> 
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.body}</p> 
    </div>
  );
};

export default PostCard;
