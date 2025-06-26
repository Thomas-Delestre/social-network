import React from "react";
import { groupEvent } from "@/app/object/groupEvent";
import { users } from "@/app/object/user";

const Event = (props: any) => {
  const event_uuid = props.params.event_uuid;

  const event = groupEvent.find((event) => event.uuid === event_uuid);

  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="bg-white dark:bg-gray-800 p-6 mb-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 font-semibold text-gray-900 dark:text-white text-xl leading-8">
            <span className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </span>
            <span>Event {event?.title}</span>
          </div>
          <p className="text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-600 leading-6 text-center">
            {event?.description}
          </p>
          <ul className="mb-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Date Start</span>
              <span className="ml-auto">Date End</span>
            </li>
            <li className="flex items-center py-3">
              <span>
                {event?.date_start
                  ? new Date(event?.date_start).toLocaleDateString("fr-FR")
                  : ""}
              </span>
              <span className="ml-auto">
                {event?.date_end
                  ? new Date(event?.date_end).toLocaleDateString("fr-FR")
                  : ""}
              </span>
            </li>
          </ul>
          <div className="grid grid-cols-3 gap-4">
            {event?.users_join.map((user, index) => {
              const userInEvent = users.find(
                (userProfil) => user.user_id === userProfil.uuid
              );

              return (
                <div className="text-center my-2" key={index}>
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src={
                      userInEvent?.avatar.length !== 0
                        ? userInEvent?.avatar
                        : defaultAvatarUrl
                    }
                    alt={
                      userInEvent?.firstName +
                      " " +
                      userInEvent?.lastName +
                      " Avatar"
                    }
                  />
                  {user.status === "accepted" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="green"
                      className="w-6 h-6 inline-block align-middle"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : user.status === "pending" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="w-6 h-6 inline-block align-middle"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="orange"
                      className="w-6 h-6 inline-block align-middle"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <a
                    href={`/profile/${userInEvent?.uuid}`}
                    className="text-main-color dark:text-blue-300"
                  >
                    {userInEvent?.firstName + " " + userInEvent?.lastName}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
