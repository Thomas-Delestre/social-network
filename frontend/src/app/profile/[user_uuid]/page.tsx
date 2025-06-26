import { posts } from "../../object/post";
import Post from "@/app/components/post";
import { users } from "../../object/user";
import FollowButton from "@/app/components/button/follow";
import { groups } from "../../object/group";

export default function Profile(props: any) {
  const user_uuid = props.params.user_uuid;
  const user = users.find((user) => user.uuid === user_uuid);

  if (user === undefined)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <span className="text-3xl font-bold">User not found</span>
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt=""
        />
      </div>
    );

  const userPosts = posts.filter((post) => post.user_uuid === user_uuid);
  const userGroups = groups.filter((group) =>
    user.group_uuid.includes(group.uuid)
  );

  const followersProfiles = users.filter((otherUser) =>
    otherUser.followers_uuid.includes(user_uuid)
  );

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
                      user?.avatar.length !== 0
                        ? user?.avatar
                        : defaultAvatarUrl
                    }
                    alt={`${user?.firstName} ${user?.lastName} Avatar`}
                  />
                </div>
                <h1 className="text-gray-900 dark:text-white font-bold text-xl leading-8 my-1 text-center">
                  {user?.firstName + " " + user?.lastName}
                </h1>
                <FollowButton userProfileUuid={user_uuid} />
                <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 leading-6 text-center">
                  {user?.aboutMe}
                </p>
                <ul className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>First name</span>
                    <span className="ml-auto">{user?.firstName}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Last name</span>
                    <span className="ml-auto">{user?.lastName}</span>
                  </li>
                  {user?.username && (
                    <li className="flex items-center py-3">
                      <span>Username</span>
                      <span className="ml-auto">{user?.username}</span>
                    </li>
                  )}
                  <li className="flex items-center py-3">
                    <span>Birthday Date</span>
                    <span className="ml-auto">
                      {user?.dateOfBirth
                        ? new Date(user.dateOfBirth).toLocaleDateString("fr-FR")
                        : ""}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Email</span>
                    <span className="ml-auto">{user?.email}</span>
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
                    Followers Profiles{" "}
                    <span className="text-sm ml-8">
                      (count: {user?.followers_uuid.length})
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  {user?.followers_uuid.map((user_folowers, index) => {
                    const user_folowers_profile = users.find(
                      (user) => user.uuid === user_folowers
                    );
                    return (
                      <div className="text-center my-2" key={index}>
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src={
                            user_folowers_profile?.avatar.length !== 0
                              ? user_folowers_profile?.avatar
                              : defaultAvatarUrl
                          }
                          alt={
                            user_folowers_profile?.firstName +
                            " " +
                            user_folowers_profile?.lastName +
                            " Avatar"
                          }
                        />
                        <a
                          href={`/profile/${user_folowers_profile?.uuid}`}
                          className="text-main-color dark:text-blue-300"
                        >
                          {user_folowers_profile?.firstName +
                            " " +
                            user_folowers_profile?.lastName}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                    Following Profiles{" "}
                    <span className="text-sm ml-8">
                      (count: {followersProfiles.length})
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  {followersProfiles.map((user_folowers, index) => {
                    return (
                      <div className="text-center my-2" key={index}>
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src={
                            user_folowers?.avatar.length !== 0
                              ? user_folowers?.avatar
                              : defaultAvatarUrl
                          }
                          alt={
                            user_folowers?.firstName +
                            " " +
                            user_folowers?.lastName +
                            " Avatar"
                          }
                        />
                        <a
                          href={`/profile/${user_folowers?.uuid}`}
                          className="text-main-color dark:text-blue-300"
                        >
                          {user_folowers?.firstName +
                            " " +
                            user_folowers?.lastName}
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
                  Last posts of {user?.firstName + " " + user?.lastName}
                </h2>
                {userPosts.map((post) => (
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
              <div className="bg-white dark:bg-gray-800 p-3">
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
                    Group{" "}
                    <span className="text-sm ml-8">
                      (count: {user?.group_uuid.length})
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  {userGroups.map((group, index) => {
                    console.log("🚀 ~ {userGroups.map ~ group:", group);

                    return (
                      <div className="text-center my-2" key={index}>
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src={
                            group?.photoUrl.length !== 0
                              ? group?.photoUrl
                              : defaultAvatarUrl
                          }
                          alt={group.name + " " + " Avatar"}
                        />
                        <a
                          href={`/group/${group?.uuid}`}
                          className="text-main-color dark:text-blue-300"
                        >
                          {group?.name}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
