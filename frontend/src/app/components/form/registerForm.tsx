import ImageProfilInput from "../input/imageProfilPicture";

export default function RegisterForm() {
  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
            >
              <span className="font-medium text-red-600 hover:underline dark:text-red-500">
                *
              </span>
              First name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="first_name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
            >
              <span className="font-medium text-red-600 hover:underline dark:text-red-500">
                *
              </span>
              Last name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="last_name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
            >
              <span className="font-medium text-red-600 hover:underline dark:text-red-500">
                *
              </span>
              Date of Birth
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >
            <span className="font-medium text-red-600 hover:underline dark:text-red-500">
              *
            </span>
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-6">
            <ImageProfilInput />
          </div>
        </div>

        <div>
          <label
            htmlFor="about-me"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            About me
          </label>
          <textarea
            id="about-me"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
            >
              <span className="font-medium text-red-600 hover:underline dark:text-red-500">
                *
              </span>
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
            >
              <span className="font-medium text-red-600 hover:underline dark:text-red-500">
                *
              </span>
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:ring-gray-600"
            />
          </div>
        </div>

        <div>
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="font-medium text-red-600 hover:underline dark:text-red-500">
              *
            </span>{" "}
            Ces champs sont obligatoires.
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
        Already a member ?
        <a
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
        >
          Log in !
        </a>
      </p>
    </div>
  );
}
