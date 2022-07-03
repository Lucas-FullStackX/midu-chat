/* eslint-disable linebreak-style */
import React, { FunctionComponent } from 'react';

interface LoginFormProps {}

export const LoginForm: FunctionComponent<LoginFormProps> = () => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8">
      <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in
        </h5>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300
          bg-gray-50 p-2.5 text-sm text-gray-900
          focus:border-blue-500 focus:ring-blue-500
          dark:border-gray-500 dark:bg-gray-600
          dark:text-white dark:placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg
          bg-blue-700 px-5 py-2.5 text-center text-sm
          font-medium text-white hover:bg-blue-800
          focus:outline-none focus:ring-4
          focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
          dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <a
            href="#"
            className="ml-2 text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </a>
        </div>
      </form>
    </div>
  );
};
