import React from 'react';
import { useEffect } from 'react';
import { useArticle } from '../../stores/articles';
import { ArticleDisplayCard } from '../Article/ArticleDisplayCard';
export const HomePage = () => {
  const getArticles = useArticle((state) => state.getArticles);
  const articles = useArticle((state) => state.articles);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <div className="flex flex-wrap justify-center lg:flex-row">
      {articles.map((article) => (
        <ArticleDisplayCard key={article.id} article={article} />
      ))}
    </div>
  );
};
