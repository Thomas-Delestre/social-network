import React from "react";
import { followRequest, groupRequest } from "@/app/object/request";
import { users } from "@/app/object/user";
import { groups } from "@/app/object/group";
import RequestButton from "../components/button/request";

const Request = () => {
  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <>
      <div className="mt-24 container mx-auto md:w-3/6 mt-26">
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Request
        </h1>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-96 h-px mb-8 bg-gray-200 border-0 dark:bg-gray-400" />
          <span className="text-2xl absolute px-3 mb-8 font-medium text-gray-900 dark:text-white -translate-x-1/2 bg-white dark:bg-gray-700 left-1/2">
            Follow Request
          </span>
        </div>
        {followRequest.map((request, index) => {
          if (request.is_accepted) return;
          let user = users.find((user) => user.uuid === request.followed_by);
          return (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <a href={`/profile/${user?.uuid}`} className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={
                    user?.avatar.length !== 0 ? user?.avatar : defaultAvatarUrl
                  }
                  alt={`${user?.firstName} ${user?.lastName} Avatar`}
                />
              </a>
                <p className="dark:text-gray-300">
                  <a href={`/profile/${user?.uuid}`} className="font-bold">{user?.firstName + " " + user?.lastName}</a> wants to follow you
                </p>
              <RequestButton />
            </div>
          );
        })}

        <div className="inline-flex items-center justify-center w-full mt-16">
          <hr className="w-96 h-px mb-8 bg-gray-200 border-0 dark:bg-gray-400" />
          <span className="text-2xl absolute px-3 mb-8 font-medium text-gray-900 dark:text-white -translate-x-1/2 bg-white dark:bg-gray-700 left-1/2">
            Group Request
          </span>
        </div>
        {groupRequest.map((request, index) => {
          if (request.status == "accept") return;
          let user = users.find((user) => user.uuid === request.user_uuid);
          let group = groups.find((group) => group.uuid === request.group_uuid);
          return (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <a href={`/profile/${user?.uuid}`} className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={
                    user?.avatar.length !== 0 ? user?.avatar : defaultAvatarUrl
                  }
                  alt={`${user?.firstName} ${user?.lastName} Avatar`}
                />
              </a>
                <p className="dark:text-gray-300">
                  <a href={`/profile/${user?.uuid}`}  className="font-bold">{user?.firstName + " " + user?.lastName}</a> wants to join the
                  group <a href={`/group/${group?.uuid}`}  className="font-bold">{group?.name}</a>
                </p>
              <RequestButton />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Request;
