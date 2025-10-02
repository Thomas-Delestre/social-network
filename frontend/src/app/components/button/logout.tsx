import React from 'react';
import { useAuth } from '../../tmp/useAuth';

export default function LogoutButton() {

  const handleLogout = () => {

    console.log("Logging out...");
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/login"; // redirection après logout
        } else {
          console.error("Logout failed");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <button 
      onClick={handleLogout} 
      className="inline-flex items-center bg-red-100 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0 mr-2"
    >
      Log out
      <svg 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        className="w-4 h-4 ml-1" 
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  );
}
