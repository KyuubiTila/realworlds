import React from 'react';
import { useArticle } from '../../stores/articles';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { IndividualArticleCard } from './IndividualArticleCard';

export const IndividualArticle = () => {
  const getSingleArticle = useArticle((state) => state.getSingleArticle);
  const singleArticle = useArticle((state) => state.singleArticle);
  const username = useArticle((state) => state.username);

  const { id: articleId } = useParams();

  useEffect(() => {
    getSingleArticle(articleId);
  }, [articleId, getSingleArticle]);
  return (
    <IndividualArticleCard singleArticle={singleArticle} username={username} />
  );
};
