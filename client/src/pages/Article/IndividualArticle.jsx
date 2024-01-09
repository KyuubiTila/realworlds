import React, { useEffect } from 'react';
import { useArticle } from '../../stores/articles';
import { IndividualArticleCard } from './IndividualArticleCard';
import { useParams } from 'react-router-dom';

export const IndividualArticle = () => {
  const { id: articleId } = useParams();
  const { singleArticle, refetchSingleArticle, allLiked } =
    useArticle(articleId);

  useEffect(() => {
    refetchSingleArticle(articleId);
  }, [articleId, refetchSingleArticle]);

  if (!singleArticle) {
    return <p>Loading...</p>;
  }

  return (
    <IndividualArticleCard singleArticle={singleArticle} allLiked={allLiked} />
  );
};
