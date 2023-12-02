import axios from 'axios';
export const updateFavouritedCount = async (articleId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    await axios.put(`http://localhost:3001/api/articles/${articleId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error updating favorited column:', error);
    throw error;
  }
};
