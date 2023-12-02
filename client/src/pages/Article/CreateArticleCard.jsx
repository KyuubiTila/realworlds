import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const CreateArticleCard = ({
  createArticle,
  initialValues,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data, params) => {
        createArticle(data);
        params.resetForm();
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            SLUG
          </div>
          <Field
            autoComplete="off"
            type="text"
            name="slug"
            placeholder="enter slug"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <span className="text-red-500">
            <ErrorMessage name="slug" component="span" />
          </span>
        </div>
        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            TITLE
          </div>
          <Field
            autoComplete="off"
            type="text"
            name="title"
            placeholder="enter title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <span className="text-red-500">
            <ErrorMessage name="title" component="span" />
          </span>
        </div>
        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            DESCRIPTION
          </div>

          <Field
            autoComplete="off"
            type="text"
            name="description"
            placeholder="enter description"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <span className="text-red-500">
            <ErrorMessage name="description" component="span" />
          </span>
        </div>

        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            BODY
          </div>

          <Field
            as="textarea"
            autoComplete="off"
            name="body"
            placeholder="enter body"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <span className="text-red-500">
            <ErrorMessage name="body" component="span" />
          </span>
        </div>

        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            TAGLIST
          </div>

          <Field
            autoComplete="off"
            type="text"
            name="taglist"
            placeholder="enter taglist"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <span className="text-red-500">
            <ErrorMessage name="taglist" component="span" />
          </span>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          CREATE ARTICLE
        </button>
      </Form>
    </Formik>
  );
};
