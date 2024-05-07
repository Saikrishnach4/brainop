import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css'; // Import CSS Modules

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    profilePicture: null, // Store the file object
    termsAccepted: false,
  });
  const [registrationError, setRegistrationError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file' && files.length > 0) {
      // Handle file input separately
      setFormData({
        ...formData,
        [name]: files[0], // Store the file object
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked ? true : false,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.termsAccepted) {
      try {
        const response = await axios.post('http://localhost:3001/auth/register', formData);
        localStorage.setItem('token', response.data.token);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setRegistrationError('Error during registration. Please try again.');
      }
    } else {
      setRegistrationError('You must accept the terms and conditions.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Register</h2>
        {registrationSuccess && <div className={styles.successMessage}>Registration successful! Redirecting...</div>}
        {registrationError && <div className={styles.errorMessage}>{registrationError}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor="username" className={styles.formLabel}>Username:</label>
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={styles.formInput} required />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email" className={styles.formLabel}>Email:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={styles.formInput} required />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password" className={styles.formLabel}>Password:</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.formInput} required />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={styles.formInput} required />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="name" className={styles.formLabel}>Name (Optional):</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={styles.formInput} />
          </div>
          <div className={styles.formControl}>
            <label className={styles.formLabel}>Profile Picture (Optional):</label>
            <input type="file" name="profilePicture" onChange={handleChange} accept="image/*" className={styles.formInput} />
          </div>
          <div className={styles.formControl}>
            <label className={styles.formLabel}>
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
              Accept Terms and Conditions
            </label>
          </div>
          <button type="submit" className={styles.formButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
