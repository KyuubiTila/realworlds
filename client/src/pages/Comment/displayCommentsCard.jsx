import React from 'react';
import { useAuth } from '../../stores/auth';

export const CommentCard = ({ comment, commentDelete }) => {
  const user = useAuth((state) => state.user);
  const { id, body, author } = comment;
  return (
    <div className="flex justify-stretch ">
      <div className="shadow-sm border border-blue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
        <div id="defaultTabContent">
          <h2 className="mb-3 text-xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            {body}
          </h2>
          {/* <p className="mb-3 text-gray-500 dark:text-gray-400">{username}</p> */}
        </div>

        {user.id === author && (
          <button
            onClick={() => commentDelete(id)}
            className="relative inline-flex items-center justify-center p-0.1 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Delete
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
