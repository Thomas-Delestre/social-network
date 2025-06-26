"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const GroupJoinButton = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsJoined(!isJoined);
    toast.info(isJoined ? "You successfully leave the group" : "You successfully ask to join this group", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full block text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
          isJoined ? "bg-gray-300 hover:bg-red-600 dark:hover:bg-red-600" : "hover:bg-gray-400 dark:hover:bg-gray-700"
        }`}
      >
        {isJoined ? (isHovered ? "Leave the group" : "Member") : "Ask to join the group"}
      </button>
  );
};

export default GroupJoinButton;
