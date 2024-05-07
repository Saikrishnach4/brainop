import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import './styles.css';

import PostList from './components/postlist';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/"
          element={<PostList />}
        />
      </Routes>
    </Router>
  );
};

export default App;
