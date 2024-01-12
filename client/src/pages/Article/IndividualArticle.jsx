import React, { useEffect } from 'react';
import { useArticle } from '../../stores/articles';
import { IndividualArticleCard } from './IndividualArticleCard';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../stores/auth';

export const IndividualArticle = () => {
  const { id: articleId } = useParams();
  const { singleArticle, refetchSingleArticle, allLiked } =
    useArticle(articleId);
  const { loggedIn } = useAuth();

  useEffect(() => {
    refetchSingleArticle(articleId);
  }, [articleId, refetchSingleArticle]);

  if (!loggedIn) {
    return <p> please log in... </p>;
  }

  if (!singleArticle) {
    return <p>Loading article...</p>;
  }

  return (
    <IndividualArticleCard singleArticle={singleArticle} allLiked={allLiked} />
  );
};
