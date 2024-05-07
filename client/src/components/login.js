import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; // Import CSS Modules

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor="username" className={styles.formLabel}>Username:</label>
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={styles.formInput} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password" className={styles.formLabel}>Password:</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility based on state
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.formInput}
              />
              <button type="button" onClick={togglePasswordVisibility} className={styles.toggleButton}>
                {showPassword ? 'Hide' : 'Show password'}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.formButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
