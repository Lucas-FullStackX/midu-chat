/* eslint-disable linebreak-style */
import React, { FunctionComponent, useState } from 'react';
import { useFormSession } from '../hooks/useFormSession';
import { TypeOptions } from '../types';

interface LoginFormProps {}

export const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const [typeForm, setTypeForm] = useState<TypeOptions>(TypeOptions.register);
  const { form, onChange, onSubmit, error } = useFormSession({
    type: typeForm
  });
  return (
    <div className="h-1/3 w-1/3 self-center rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8">
      <form className="space-y-6" action="#" onSubmit={onSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          {typeForm === TypeOptions.register ? 'Sing Up' : 'Log in'}
        </h5>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>
          <input
            onChange={onChange}
            value={form.email}
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
            onChange={onChange}
            value={form.password}
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
          {error && (
            <p className="text-sm text-red-500">{error?.message ?? ''}</p>
          )}
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
          {typeForm === TypeOptions.register ? 'Sing Up' : 'Log in'}
        </button>
      </form>
      <div className="mt-3 divide-y divide-dashed">
        <button
          onClick={() => {
            if (typeForm === TypeOptions.register) {
              setTypeForm(TypeOptions.login);
            } else {
              setTypeForm(TypeOptions.register);
            }
          }}
          className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          {typeForm === TypeOptions.register ? 'Log in' : 'Sing Up'}
        </button>
      </div>
    </div>
  );
};
