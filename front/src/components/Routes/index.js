// Import the necessary dependencies //
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from '../../pages/Sign';
import Home from '../../pages/Home';
import User from '../../pages/User';
import Post from '../../pages/Post';
import Create from '../Post/Create';
// Starting point of the index component //
function index() {
  // Virtual DOM //
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/create" element={<Create />} />
      </Routes>
    </Router>
  );
}
// Export index component //
export default index;
