import React, { useState, useEffect } from 'react';
import { timeAgo } from '../../utils/Timeago';
import { useAuth } from '../../stores/auth';
import { Link } from 'react-router-dom';
import { useArticle } from '../../stores/articles';
import { useComment } from '../../stores/comments';

export const ArticleDisplayCard = ({ article }) => {
  const loggedIn = useAuth((state) => state.loggedIn);
  const toggleLike = useArticle((state) => state.toggleLike);
  const toggleUnlike = useArticle((state) => state.toggleUnlike);
  const getAllLiked = useArticle((state) => state.getAllLiked);
  const allLiked = useArticle((state) => state.allLiked);
  const allComments = useComment((state) => state.allComments);
  const comments = useComment((state) => state.comments);

  const personalCommentsId = comments.map((comment) => {
    return comment.articleId;
  });

  const [liked, setLiked] = useState(allLiked.includes(article.id));

  const { id, body, title, favoritesCount, description, createdAt } = article;

  const commentsLength = personalCommentsId.filter(
    (commentId) => commentId === id
  ).length;

  const { username } = article.Profile.User;

  const timeAgoString = timeAgo(new Date(createdAt));

  const handleLikeClick = async (id) => {
    const articleId = id;
    try {
      let updatedFavoritesCount = favoritesCount;
      // Send a request to your server to toggle the like status
      if (liked) {
        // User has already liked, send an unlike request
        await toggleUnlike(articleId);
        updatedFavoritesCount--;
      } else {
        // User has not liked, send a like request
        await toggleLike(articleId);
        updatedFavoritesCount++;
      }

      // Toggle the 'liked' state based on the server response
      setLiked(!liked);
      // Update the article object with the new favoritesCount
      article.favoritesCount = updatedFavoritesCount;
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  useEffect(() => {
    loggedIn && getAllLiked();
  }, [getAllLiked, loggedIn]);

  useEffect(() => {
    allComments();
  }, [allComments, id]);

  return (
    <div className="bg-slate-800 text-white rounded-lg mt-4 space-y-6 p-10 w-full">
      <div className="flex space-x-4 items-center">
        <div className="w-12 h-12">
          <img
            alt="avatar"
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2 items-center">
            <h2 className="text-base"> {username} </h2>
            <svg
              className="h-4 w-4 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-xs text-slate-400">posted an update</div>
          </div>
          <p className="text-xs text-slate-400">{timeAgoString}</p>
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        <Link to={`/article/${id}`}>
          <div>
            <p className="text-base">{title}</p>
          </div>
          <div>
            <p className="font-medium text-base md:text-lg text-white-800 line-clamp-1">
              {description}
            </p>
          </div>
          <div>
            <p className="font-medium text-base md:text-lg text-white-800 line-clamp-1">
              {body}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex justify-between">
        {loggedIn ? (
          <div className="flex items-center">
            <button onClick={() => handleLikeClick(id)}>
              {liked ? (
                <svg
                  className="h-4 w-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  />
                </svg>
              )}
            </button>
            <span className="ml-1 text-slate-400 text-sm">
              Likes : {favoritesCount}
            </span>
          </div>
        ) : (
          <span className="ml-1 text-slate-400 text-sm">
            Likes : {favoritesCount}
          </span>
        )}

        <div className="text-slate-400 text-sm">
          <p>{commentsLength} Comments</p>
        </div>
      </div>
    </div>
  );
};
