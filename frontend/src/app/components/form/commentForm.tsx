export default function CommentForm() {
  return (
    <div className="flex justify-center">
      <form action="" method="post">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-400" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white dark:bg-gray-800 dark:text-white left-1/2">
            <label htmlFor="comment">Add a new Comment</label>
          </span>
        </div>
        <div>
          <input
            id="comment"
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Enter your comment"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
