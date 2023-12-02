import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: {
        id: null,
        username: null,
      },
      loggedIn: false,

      userDetails: async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.error('Access token not found.');
            return;
          }

          const details = await axios.get(
            'http://localhost:3001/api/user/verify/authToken',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const { id, username } = details.data;

          set({ user: { id, username } });
          set({ loggedIn: true });
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },

      logOut: () => {
        set({ user: { id: null, username: null } });
        set({ loggedIn: false });
      },
    }),
    { name: 'auth' }
  )
);
