import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useComment = create(
  persist(
    (set) => ({
      comments: [],
      articleComments: async (id) => {
        try {
          const comments = await axios.get(
            `http://localhost:3001/api/comments/${id}`
          );

          set({ comments: comments.data.data });
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },

      allComments: async () => {
        try {
          const allComments = await axios.get(
            'http://localhost:3001/api/comments'
          );
          set({ comments: allComments.data });
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },

      addComment: (newComment) => {
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
      },

      commentDelete: async (id) => {
        const accessToken = localStorage.getItem('accessToken');

        try {
          await axios.delete(`http://localhost:3001/api/comments/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          set((state) => ({
            comments: state.comments.filter((element) => element.id !== id),
          }));
        } catch (error) {
          alert(`${error.response.data.error}; you can not delete comment`);
        }
      },
    }),
    { name: 'comments' }
  )
);
