import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

const getArticles = async (accessToken) => {
  const articles = await axios.get('http://localhost:3001/articles', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return articles.data;
};

const updateFavouritedCount = async (articleId, accessToken) => {
  const response = await axios.put(
    `http://localhost:3001/articles/updateArticleFavoritesCount/${articleId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

const getSingleArticle = async (articleId, accessToken) => {
  const article = await axios.get(
    `http://localhost:3001/articles/${articleId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return article.data;
};

const toggleLike = async (articleId, accessToken) => {
  const like = await axios.post(
    `http://localhost:3001/articles/${articleId}/toggle-like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return like.data;
};

const toggleUnlike = async (articleId, accessToken) => {
  const unlike = await axios.post(
    `http://localhost:3001/articles/${articleId}/toggle-unlike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return unlike.data;
};

const getAllLiked = async (accessToken) => {
  const allLiked = await axios.get(
    'http://localhost:3001/articles/allLikes/getAll',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return allLiked.data.map((item) => item.articleId);
};

export const useArticle = (articleId) => {
  const queryClient = useQueryClient();

  const accessToken = localStorage.getItem('accessToken');

  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError,
    refetch: refetchArticles,
  } = useQuery(['articles', accessToken], () => getArticles(accessToken), {
    enabled: !!accessToken,
  });

  const {
    data: singleArticle,
    isLoading: singleArticleLoading,
    error: singleArticleError,
    refetch: refetchSingleArticle,
  } = useQuery(
    ['singleArticle', articleId, accessToken],
    () => getSingleArticle(articleId, accessToken),
    {
      enabled: false,
    }
  );

  const likeMutation = useMutation(
    (articleId) => toggleLike(articleId, accessToken),
    {
      onSuccess: async () => {
        await updateFavouritedCount(articleId, accessToken);
        queryClient.invalidateQueries('articles');
        queryClient.invalidateQueries('allLiked');
      },
    }
  );

  const unlikeMutation = useMutation(
    (articleId) => toggleUnlike(articleId, accessToken),
    {
      onSuccess: async () => {
        await updateFavouritedCount(articleId, accessToken);
        queryClient.invalidateQueries('articles');
        queryClient.invalidateQueries('allLiked');
      },
    }
  );

  const {
    data: allLiked,
    isLoading: allLikedLoading,
    error: allLikedError,
    refetch: refetchAllLiked,
  } = useQuery('allLiked', () => getAllLiked(accessToken), {
    enabled: !!accessToken,
  });

  return {
    articles,
    articlesLoading,
    articlesError,
    refetchArticles,
    singleArticle,
    singleArticleLoading,
    singleArticleError,
    refetchSingleArticle,
    likeMutation,
    unlikeMutation,
    allLiked,
    allLikedLoading,
    allLikedError,
    refetchAllLiked,
  };
};
