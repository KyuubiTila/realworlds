import React from 'react';
import { useAuth } from '../../stores/auth';

import { useArticle } from '../../stores/articles';
import { ArticleDisplayCard } from '../Article/ArticleDisplayCard';
export const HomePage = () => {
  const { loggedIn } = useAuth();
  const { articles } = useArticle();

  if (!loggedIn) {
    return <p> please log in... </p>;
  }
  return (
    <div className="flex flex-wrap justify-center lg:flex-row">
      {articles?.map((article) => (
        <ArticleDisplayCard key={article.id} article={article} />
      ))}
    </div>
  );
};
