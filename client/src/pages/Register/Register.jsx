import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useRegister } from '../../hooks/UsersHook';
import { RegisterCard } from './RegisterCard';

export const Register = () => {
  const { addUser } = useRegister();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('You must input a username'),
    email: Yup.string().required('You must input an email'),
    password: Yup.string().required('You must input a password'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const registerSuccess = () => {
    toast.success('Registration Successful!', {
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

  const register = async (data) => {
    try {
      await addUser(data);
      registerSuccess();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
      <RegisterCard
        validationSchema={validationSchema}
        initialValues={initialValues}
        register={register}
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

export default Register;
