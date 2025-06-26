import { groups } from "../../object/group";
import { users } from "../../object/user";
import { groupPosts } from "../../object/groupPost";
import Post from "../../components/post";
import { groupEvent } from "../../object/groupEvent";
import MakeGroupPostModal from "@/app/components/form/makeGroupPostMadal";
import GroupJoinButton from "@/app/components/button/groupJoin";
import MakeGroupEventModal from "@/app/components/form/makeGroupEventModal";
import AddUserToTheGroupModal from "@/app/components/form/addUserToTheGroupModal";

export default function Group(props: any) {
  const group_uuid = props.params.group_uuid;

  const group = groups.find((group) => group.uuid === group_uuid);

  if (group === undefined)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <span className="text-3xl font-bold">Group not found</span>
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt=""
        />
      </div>
    );

  const owner = users.find((user) => user.uuid === group?.createdByUserUuid);

  const usersInGroup = users.filter((user) =>
    user.group_uuid.includes(group_uuid)
  );

  const defaultGroupUrl = "https://cdn-icons-png.flaticon.com/512/25/25437.png";

  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <>
      <div className="mt-24">
        <div className="container mx-auto my-5 p-5">
          <div className="flex flex-col md:flex-row md:-mx-2">
            <div className="w-full md:w-3/12 md:mx-2 order-1 md:order-1">
              <div className="bg-white dark:bg-gray-800 p-3 border-t-4 border-blue-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={
                      group?.photoUrl.length !== 0
                        ? group?.photoUrl
                        : defaultGroupUrl
                    }
                    alt={`${group?.name} Avatar`}
                  />
                </div>
                <h1 className="text-gray-900 dark:text-white font-bold text-xl leading-8 my-1 text-center">
                  {group?.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 leading-6 text-center">
                  {group?.description}
                </p>
                <div className="flex flex-wrap">
                  <div className="w-1/2 p-2">
                    <GroupJoinButton />
                  </div>
                  <div className="w-1/2 p-2">
                    <MakeGroupPostModal />
                  </div>
                  <div className="w-1/2 p-2">
                    <MakeGroupEventModal />
                  </div>
                  <div className="w-1/2 p-2">
                    <AddUserToTheGroupModal />
                  </div>
                </div>
                <ul className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Owner</span>
                    <a href={`/profile/${owner?.uuid}`} className="ml-auto">
                      <span>{owner?.firstName + " " + owner?.lastName}</span>
                    </a>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Creation date</span>
                    <span className="ml-auto">
                      {group?.creationDate
                        ? new Date(group?.creationDate).toLocaleDateString(
                            "fr-FR"
                          )
                        : ""}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="my-4"></div>
              <div className="bg-white dark:bg-gray-800 p-3 hover:shadow">
                <div className="flex items-center space-x-3 font-semibold text-gray-900 dark:text-white text-xl leading-8">
                  <span className="text-blue-500">
                    <svg
                      className="h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    User in group{" "}
                    <span className="text-sm ml-8">
                      (count: {usersInGroup?.length})
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  {usersInGroup?.map((user, index) => {
                    return (
                      <div className="text-center my-2" key={index}>
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src={
                            user.avatar?.length !== 0
                              ? user?.avatar
                              : defaultAvatarUrl
                          }
                          alt={
                            user?.firstName + " " + user?.lastName + " Avatar"
                          }
                        />
                        <a
                          href={`/profile/${user?.uuid}`}
                          className="text-main-color dark:text-blue-300"
                        >
                          {user?.firstName + " " + user?.lastName}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 mx-auto h-64 order-3 md:order-2">
              <div className="grid grid-cols-1 gap-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Last posts in {group?.name} group
                </h2>
                {groupPosts.map((post) => (
                  <Post
                    key={post.uuid}
                    uuid={post.uuid}
                    user_uuid={post.user_uuid}
                    content={post.content}
                    type={post.type}
                    date={post.date}
                    imageUrl={post.imageUrl}
                    comments={post.comments}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-3/12 md:mx-2 order-2 md:order-3">
              {groupEvent.map((event, index) => {
                return (
                  <a href={`/group/event/${event.uuid}`}>
                    <div key={index} className="bg-white dark:bg-gray-800 p-3">
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
                        <span>Event {event.title}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 leading-6 text-center">
                        {event?.description}
                      </p>
                      <ul className="mb-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                          <span>Date Start</span>
                          <span className="ml-auto">Date End</span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>
                            {event.date_start
                              ? new Date(event.date_start).toLocaleDateString(
                                  "fr-FR"
                                )
                              : ""}
                          </span>
                          <span className="ml-auto">
                            {event.date_end
                              ? new Date(event.date_end).toLocaleDateString(
                                  "fr-FR"
                                )
                              : ""}
                          </span>
                        </li>
                      </ul>
                      <div className="grid grid-cols-3">
                        {event.users_join.map((user, index) => {
                          const userInEvent = users.find(
                            (userProfil) => user.user_id === userProfil.uuid
                          );

                          return (
                            <a className="text-center my-2" key={index}>
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
                                {userInEvent?.firstName +
                                  " " +
                                  userInEvent?.lastName}
                              </a>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    <div className="my-4"></div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
