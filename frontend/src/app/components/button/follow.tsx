"use client";
import React, { useState, useEffect } from 'react';
import { users } from '@/app/object/user';
import { toast } from 'react-toastify';

function FollowButton(props: any) {
  const userProfileUuid = props.userProfileUuid;

  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userCheckOwnProfile, setUserCheckOwnProfile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userLog_uuid = JSON.parse(storedUser).userData.uuid;
        const userProfile = users.find((user) => userProfileUuid === user.uuid);

        if (userProfile != null && userProfile.followers_uuid.includes(userLog_uuid)) {
          setIsFollowing(true);
        }
        if (userLog_uuid === userProfileUuid) {
          setUserCheckOwnProfile(true);
        }
      }
    }
  }, [userProfileUuid]);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
    toast.info(isFollowing ? "You successfully unfollow" : "You successfully follow this user", {
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
    <div className="flex justify-center">
      {!userCheckOwnProfile && (
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${isFollowing ? 'bg-gray-300 hover:bg-red-600 dark:hover:bg-red-600' : 'hover:bg-gray-400 dark:hover:bg-gray-700'}`}
        >
          {isFollowing ? (isHovered ? 'Unfollow' : 'Following') : 'Follow'}
        </button>
      )}
    </div>
  );
}

export default FollowButton;
