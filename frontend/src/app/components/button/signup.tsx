export default function SignUpButton() {
  return (
    <a href="/signup" className="inline-flex items-center text-white bg-blue-700 border-0 py-1 px-3 focus:outline-none hover:bg-blue-800 rounded text-base mt-4 md:mt-0">Sign up
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
    </a>
  );
}
