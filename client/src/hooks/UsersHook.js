import { useMutation } from 'react-query';
import axios from 'axios';

const registerUser = async (data) => {
  const response = await axios.post('http://localhost:3001/auth/signUp', data);
  return response.data;
};

export const useRegister = () => {
  const { mutate: addUser } = useMutation(registerUser);

  return { addUser };
};
