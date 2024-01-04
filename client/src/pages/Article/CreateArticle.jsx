import React from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import { CreateArticleCard } from './CreateArticleCard';

export const CreateArticle = () => {
  const accessToken = localStorage.getItem('accessToken');

  const validationSchema = Yup.object().shape({
    slug: Yup.string().required('You must input slug'),
    title: Yup.string().required('You must input a title'),
    description: Yup.string().required('You must input a description'),
    body: Yup.string().required('You must input a body'),
    taglist: Yup.string().required('You must input a taglist'),
  });

  const initialValues = {
    slug: '',
    title: '',
    description: '',
    body: '',
    taglist: '',
  };

  const articleSuccess = () => {
    toast.success('Article creation successful!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const createArticle = async (data) => {
    try {
      const createdArticle = await axios.post(
        'http://localhost:3001/articles/create',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(createdArticle);
      articleSuccess();
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <>
      <CreateArticleCard
        validationSchema={validationSchema}
        initialValues={initialValues}
        createArticle={createArticle}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
