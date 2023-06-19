import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import Searched from './Searched';
import Author from './Author';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" Component={Searched} />
      <Route path="/author/:author" Component={Author} />
      <Route path="/recipe/:name" element={<Recipe />} />
    </Routes>
  );
}

export default Pages;
