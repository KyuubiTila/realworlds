import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const fetchUserDetails = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Access token not found.');
      return {};
    }

    const details = await axios.post(
      'http://localhost:3001/auth/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = details.data.user || {};
    const { id, username } = user;

    // Store user data in local storage
    localStorage.setItem('userDetails', JSON.stringify({ id, username }));

    return { id, username };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Hydrate user details from local storage when the hook is initialized
  const storedUserDetails = localStorage.getItem('userDetails');
  const initialUserDetails = storedUserDetails
    ? JSON.parse(storedUserDetails)
    : {};

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery('userDetails', fetchUserDetails, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: false,
    initialData: initialUserDetails, // Use initialData to hydrate the initial state
  });

  // Check for error and clear token if it indicates an invalid or expired token
  if (isError) {
    const errorStatus = error?.response?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userDetails');
    }
  }

  const loggedIn = !isLoading && !isError && user && user.id !== undefined;

  const logOut = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userDetails'); // Remove user data

      // Invalidate user details query
      await queryClient.invalidateQueries('userDetails');

      await refetch();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    user,
    loggedIn,
    userDetails: refetch,
    logOut,
  };
};
