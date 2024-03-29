import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { useArticle } from '../../stores/articles';
import { useComment } from '../../stores/comments';
import { useAuth } from '../../stores/auth';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import * as Yup from 'yup';
import CreateCommentCard from '../Comment/CreateCommentCard';
import { CommentCard } from '../Comment/displayCommentsCard';

export const IndividualArticleCard = ({ singleArticle, allLiked }) => {
  const { id: articleId } = useParams();
  const { loggedIn } = useAuth();
  const { likeMutation, unlikeMutation, refetchAllLiked } =
    useArticle(articleId);
  const {
    addCommentMutation,
    articleComments,
    refetchComments,
    commentsIsLoading,
    deleteCommentMutation,
    updateCommentMutation,
  } = useComment(articleId);
  // console.log(articleComments);

  useEffect(() => {
    refetchComments();
  }, [refetchComments]);

  const { body, title, favouritesCount, description, user, createdAt } =
    singleArticle;

  const [liked, setLiked] = useState(allLiked.includes(singleArticle.id));
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    // Calculate relative time using date-fns
    const articleDate = new Date(createdAt);
    const relativeTimeString = formatDistanceToNow(articleDate);
    setRelativeTime(relativeTimeString);
  }, [createdAt]);

  const initialValues = {
    body: '',
  };
  const validationSchema = Yup.object().shape({
    body: Yup.string().required('you must send a comment'),
  });

  const addCommentHandler = async (data) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        `http://localhost:3001/comments/${articleId}`,
        data, // Send the 'data' object directly
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response && response.data) {
        const newComment = response.data;
        // console.log('New Comment:', newComment);
        addCommentMutation.mutate(newComment);
      } else {
        alert(
          'Failed to create a comment. The response does not contain valid data.'
        );
      }
    } catch (error) {
      alert(`Error creating a comment: ${error.message}`);
    }
  };

  const handleLikeClick = async (articleId) => {
    try {
      if (liked) {
        await unlikeMutation.mutate(articleId);
        refetchAllLiked();
      } else {
        await likeMutation.mutate(articleId);
      }

      setLiked(!liked);
      singleArticle.favouritesCount = liked
        ? singleArticle.favouritesCount - 1
        : singleArticle.favouritesCount + 1;
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="bg-slate-400 text-white rounded-lg mt-4 space-y-6 p-10 w-full">
      <div className="flex space-x-4 items-center  ">
        <div className="w-12 h-12">
          <img
            alt="avatar"
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            className="rounded-full w-full h-full object-cover "
          />
          <div></div>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2 items-center">
            <h2 className="text-base"> {user.username} </h2>
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
            <div className="  text-xs">posted an update</div>
          </div>
          <p className="text-xs ">{relativeTime}</p>
        </div>
      </div>
      <div>
        <p className="text-base">{title}</p>
      </div>
      <div>
        <p className="text-base">{description}</p>
      </div>
      <div>
        <p className="text-sm leading-6">{body}</p>
      </div>
      <div className="flex justify-between pt-5">
        {loggedIn ? (
          <div className="flex items-center">
            <button onClick={() => handleLikeClick(articleId)}>
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
            <span className="ml-1 text-base">Likes : {favouritesCount}</span>
          </div>
        ) : (
          <span className="ml-1 text-base">Likes : {favouritesCount}</span>
        )}
        <div className="text-base">
          <p>
            {commentsIsLoading
              ? 'Loading comments...'
              : articleComments?.length}{' '}
            Comments
          </p>
        </div>
      </div>

      {commentsIsLoading ? (
        <p>Loading comments...</p>
      ) : Array.isArray(articleComments) ? (
        articleComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            deleteCommentMutation={deleteCommentMutation}
            updateCommentMutation={updateCommentMutation}
          />
        ))
      ) : (
        <p>No comments available.</p>
      )}
      {loggedIn && (
        <CreateCommentCard
          addCommentHandler={addCommentHandler}
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      )}
    </div>
  );
};
