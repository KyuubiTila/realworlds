import React from 'react';
import { useArticle } from '../../stores/articles';
import { ArticleDisplayCard } from '../Article/ArticleDisplayCard';
export const HomePage = () => {
  const { articles } = useArticle();

  return (
    <div className="flex flex-wrap justify-center lg:flex-row">
      {articles?.map((article) => (
        <ArticleDisplayCard key={article.id} article={article} />
      ))}
    </div>
  );
};
