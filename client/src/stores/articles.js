import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { updateFavouritedCount } from '../utils/update';
export const useArticle = create(
  persist(
    (set) => ({
      articles: [],
      singleArticle: [],
      username: '',
      liked: false, // Track whether the user has liked the article
      allLiked: [],
      getArticles: async () => {
        try {
          const articles = await axios.get(
            'http://localhost:3001/api/articles'
          );

          const { data } = articles;

          set({ articles: data.data });
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      },

      getSingleArticle: async (articleId) => {
        try {
          const article = await axios.get(
            `http://localhost:3001/api/articles/${articleId}`
          );

          const { data } = article;

          set({ singleArticle: data.data });
          set({ username: data.data.Profile.User.username });
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      },

      // Function to toggle like status
      toggleLike: async (articleId) => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const like = await axios.get(
            `http://localhost:3001/api/articles/like/${articleId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const { data } = like;

          console.log(data);

          // Toggle the 'liked' state when the like status changes
          set((state) => ({ liked: !state.liked }));

          // Update the 'allLiked' state directly
          set((state) => ({
            allLiked: state.allLiked.includes(articleId)
              ? state.allLiked.filter((likedId) => likedId !== articleId)
              : [...state.allLiked, articleId],
          }));

          await updateFavouritedCount(articleId);

          // You can also update other relevant state based on the response.
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      },

      // Function to toggle unlike status
      toggleUnlike: async (articleId) => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const unlike = await axios.get(
            `http://localhost:3001/api/articles/unlike/${articleId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const { data } = unlike;

          console.log(data);

          // Toggle the 'liked' state when the unlike status changes
          set((state) => ({ liked: !state.liked }));

          // Update the 'allLiked' state directly
          set((state) => ({
            allLiked: state.allLiked.includes(articleId)
              ? state.allLiked.filter((likedId) => likedId !== articleId)
              : [...state.allLiked, articleId],
          }));

          await updateFavouritedCount(articleId);

          // You can also update other relevant state based on the response.
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      },

      getAllLiked: async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const allLiked = await axios.get(
            'http://localhost:3001/api/articles/allLikes/getAll',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const { data } = allLiked;

          set({ allLiked: data.data.map((item) => item.articleId) });
        } catch (error) {
          console.error('Error fetching all Liked:', error);
        }
      },
    }),
    { name: 'article' }
  )
);
