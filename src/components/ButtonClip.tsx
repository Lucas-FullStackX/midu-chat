import React from 'react';
import copy from 'copy-to-clipboard';

export const ButtonClip = ({ copyText }: { copyText: string }) => {
  const copyToClipboard = () => {
    copy(copyText);
  };
  const [tooltipStatus, setTooltipStatus] = React.useState(false);
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setTooltipStatus(true)}
        onMouseLeave={() => setTooltipStatus(false)}
        data-tooltip-target="tooltip-bottom"
        type="button"
        onClick={copyToClipboard}
        className="relative mr-2 inline-flex h-10 w-10 items-center rounded-full bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          ></path>
        </svg>
      </button>
      {tooltipStatus && (
        <div className="absolute z-20 mt-2 rounded bg-gray-600 p-4 transition duration-150 ease-in-out">
          <p className="text-sm leading-5 text-white">Copied to clipboard</p>
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};
