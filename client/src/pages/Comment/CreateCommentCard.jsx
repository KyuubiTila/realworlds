import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateCommentCard = ({
  initialValues,
  validationSchema,
  addCommentHandler,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data, params) => {
        addCommentHandler(data);

        params.resetForm();
      }}
    >
      <Form>
        <hr />
        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            COMMENT
          </div>
          <Field
            autoComplete="off"
            type="text"
            name="comment"
            placeholder="add comment"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <span className="text-red-500">
            <ErrorMessage name="comment" component="span" />
          </span>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Comment
        </button>
      </Form>
    </Formik>
  );
};

export default CreateCommentCard;
