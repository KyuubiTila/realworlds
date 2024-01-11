import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';

const getArticleComments = async (articleId, accessToken) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/comments/article/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch article comments');
  }
};

const getAllComments = async (accessToken) => {
  try {
    const response = await axios.get('http://localhost:3001/comments', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch all comments');
  }
};

const addComment = async (newComment, existingComments) => {
  // Ensure existingComments is treated as an array
  const commentsArray = Array.isArray(existingComments) ? existingComments : [];

  // Assuming you only need to add the new comment to the existing list
  return [...commentsArray, newComment];
};

const deleteComment = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return id; // Return the ID of the deleted comment
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
};

const editComment = async ({ id, body }) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.patch(
      `http://localhost:3001/comments/${id}`,
      { body },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit comment');
  }
};

export const useComment = (articleId) => {
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');

  const {
    data: articleComments,
    isLoading: commentsIsLoading,
    error,
    refetch: refetchComments,
  } = useQuery(
    'articleComments',
    () => getArticleComments(articleId, accessToken),
    {
      enabled: false,
    }
  );

  const {
    data: allComments,
    isLoading: allCommentsLoading,
    error: allCommentsError,
    refetch: refetchAllComments,
  } = useQuery('allComments', () => getAllComments(accessToken), {
    enabled: false,
  });

  const addCommentMutation = useMutation(addComment, {
    onSuccess: (newComment) => {
      queryClient.setQueryData('allComments', (prevData) => {
        // Ensure prevData is treated as an array
        const commentsArray = Array.isArray(prevData) ? prevData : [];

        // Spread commentsArray with the new comment
        return [...commentsArray, newComment];
      });
      refetchComments();
    },
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: (deletedCommentId) => {
      queryClient.setQueryData('allComments', (prevData) => {
        // Ensure prevData is treated as an array
        const commentsArray = Array.isArray(prevData) ? prevData : [];

        return commentsArray.filter(
          (comment) => comment.id !== deletedCommentId
        );
      });
      refetchComments();
    },
    onError: (error) => {
      console.error('Error deleting comment:', error);
    },
  });

  const updateCommentMutation = useMutation(editComment, {
    onSuccess: (editedComment) => {
      queryClient.setQueryData('allComments', (prevData) => {
        // Ensure prevData is treated as an array
        const commentsArray = Array.isArray(prevData) ? prevData : [];

        return commentsArray.map((comment) =>
          comment.id === editedComment.id ? editedComment : comment
        );
      });
      refetchComments();
    },
    onError: (error) => {
      console.error('Error editing comment:', error);
    },
  });

  return {
    articleComments,
    refetchComments,
    commentsIsLoading,
    error,
    allComments,
    allCommentsLoading,
    allCommentsError,
    addCommentMutation,
    deleteCommentMutation,
    updateCommentMutation,
    refetchAllComments,
  };
};
