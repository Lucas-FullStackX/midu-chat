import React from 'react';
import { useRouter } from 'next/router';

export const GoBackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <button
      type="button"
      onClick={goBack}
      className="relative mr-2 inline-flex h-10 w-10 items-center rounded-full  p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
    </button>
  );
};
