import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginCard } from './LoginCard';
// import { useAuth } from '../../stores/auth';
import { useAuth } from '../../stores/auth';

export const Login = () => {
  // const userDetails = useAuth((state) => state.userDetails);
  const { userDetails } = useAuth();

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('You must input a valid username'),
    password: Yup.string().required('You must input a password'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const loginUser = async (data) => {
    try {
      const loggedInUser = await axios.post(
        'http://localhost:3001/auth/signIn',
        data
      );

      localStorage.setItem('accessToken', loggedInUser.data.accessToken);
      userDetails();
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <LoginCard
      validationSchema={validationSchema}
      initialValues={initialValues}
      loginUser={loginUser}
    />
  );
};
