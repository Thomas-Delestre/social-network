"use client";
import React from "react";
import { toast } from "react-toastify";

function ShareButton( props: any ) {
  const postUuid = props.postUuid;

  const handleClick = () => {
    toast.info('The link to the post is in your clipboard.' , {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    }); 
    navigator.clipboard.writeText(`http://localhost:3000/post/${postUuid}`)
  };

  return (
    <div>
        <button
          type="button"
          onClick={handleClick}
          className={`block mx-auto text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline-block mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>

          Share
        </button>
    </div>
  );
}

export default ShareButton;
