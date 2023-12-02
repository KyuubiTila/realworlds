import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login/Login';
import { HomePage } from '../pages/HomePage';
import { CreateArticle } from '../pages/Article/CreateArticle';
import { IndividualArticle } from '../pages/Article/IndividualArticle';

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/createArticle" element={<CreateArticle />} />
        <Route path="/article/:id" element={<IndividualArticle />} />
      </Routes>
    </>
  );
};
