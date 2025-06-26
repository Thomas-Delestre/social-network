"use client";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import ThemeToggle from "./button/theme";
import { useAuth } from "../tmp/useAuth";
import SearchModal from "./input/searchModal";
import MakePersonalPostModal from "./form/makePresonalPostMadal";

export default function Header() {
  const { isLogged, user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    initFlowbite();
  }, []);

  const isActive = (path: string) => {
    if (isClient && window.location.pathname === path) {
      return "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
    } else {
      return "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
    }
  };

  return (
    <>
      <nav className="dark:bg-gray-900 w-full fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/img/logo_social_network.png"
              className="h-8"
              alt="Social Network Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Social Network
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="flex items-center mr-6">
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10"
                    src={
                      user?.avatar.length !== 0
                        ? user?.avatar
                        :  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt={`${user?.firstName} ${user?.lastName} Avatar`}
                  />
                </button>
                <div
                  className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href={`/profile/${user?.uuid}`}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        My profile
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href={`/notification`}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        Notification
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/request`}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        Request
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="/logout"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            <ThemeToggle />
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul
              className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
              style={{ alignItems: "center" }}
            >
              <li>
                <a href="/home" className={isActive("/home")}>
                  Accueil
                </a>
              </li>
              <li className="dark:text-white">
                  <MakePersonalPostModal/>
              </li>
              <li className="dark:text-white">
                  <SearchModal/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
