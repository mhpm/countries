import React from 'react'

type Props = {
  children?: React.ReactNode;
  isLoading?: boolean;
};

const Loading = ({ children, isLoading = false }: Props) => {
  if (!children && isLoading) return spiner;

  if (children && !isLoading) return children;

  return (
    <div className="relative mix-blend-lighten">
      <div className="flex justify-center items-center absolute w-full h-full bg-black/50 pl-3">
        {spiner}
      </div>
      {children}
    </div>
  );
};

export default Loading;

const spiner = (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
