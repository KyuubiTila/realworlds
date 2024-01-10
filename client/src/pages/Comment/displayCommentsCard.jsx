import React, { useState } from 'react';
import dateAndTime from 'date-and-time';
import { useAuth } from '../../stores/auth';

export const CommentCard = ({
  comment,
  deleteCommentMutation,
  updateCommentMutation,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [originalBody, setOriginalBody] = useState(comment.body); // New state to store the original content

  const { id, user: commentUser, updatedAt } = comment;

  const now = new Date(updatedAt);
  const formattedDate = dateAndTime.format(now, 'HH:mm DD/MM/YYYY');

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // Save the original content when entering edit mode
    setOriginalBody(editedBody);
  };

  const handleSaveClick = () => {
    updateCommentMutation.mutate({ id, body: editedBody });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Discard changes and revert to the original content
    setEditedBody(originalBody);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-stretch ">
      <div className="shadow-sm border border-blue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
        <div id="defaultTabContent">
          <p className="mb-1 text-xs text-white">
            comment created by @{commentUser.username.toUpperCase()} at{' '}
            {formattedDate}
          </p>
          {isEditing ? (
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="mb-2 text-xl font-extrabold tracking-tight text-gray-800 dark:text-white resize-none w-full h-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          ) : (
            <h2 className="mb-2 text-xl font-extrabold tracking-tight text-gray-800 dark:text-white">
              {editedBody}
            </h2>
          )}
        </div>

        {commentUser.id === user.id && (
          <>
            <button
              onClick={() => deleteCommentMutation.mutate(id)}
              className="relative inline-flex items-center justify-center p-0.1 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Delete
              </span>
            </button>

            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="relative inline-flex items-center justify-center p-0.1 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Save
                  </span>
                </button>
                <button
                  onClick={handleCancelClick} // Add the new Cancel button and handler
                  className="relative inline-flex items-center justify-center p-0.1 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Cancel
                  </span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="relative inline-flex items-center justify-center p-0.1 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Edit
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
