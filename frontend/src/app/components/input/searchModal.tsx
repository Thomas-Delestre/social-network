"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/app/object/user";
import { groups } from "@/app/object/group";

interface SearchResult {
  uuid: string;
  name: string;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node) && backdropRef.current && backdropRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    const userResults = users
      .filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .map((user) => ({
        uuid: user.uuid,
        name: `${user.firstName} ${user.lastName} ${user.username ? `(${user.username})` : "" }`,
      }));

    const usernameResults = users
      .filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      )
      .map((user) => ({
        uuid: user.uuid,
        name: `${user.firstName} ${user.lastName} (${user.username})`,
      }));

    const groupResults = groups
      .filter((group) => group.name.toLowerCase().includes(value.toLowerCase()))
      .map((group) => ({ uuid: group.uuid, name: group.name }));

    const allResults = [...userResults, ...groupResults, ...usernameResults];

    setSuggestions(allResults.slice(0, 5));
  };

  const handleSuggestionClick = (uuid: string) => {
    const isGroup = groups.some((group) => group.uuid === uuid);
    if (isGroup) {
      router.push(`/group/${uuid}`);
    } else {
      router.push(`/profile/${uuid}`);
    }
    closeModal();
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return <li>No results found</li>;
    }

    const uniqueSuggestions = suggestions.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.uuid === value.uuid && t.name === value.name
      ))
    )

    return uniqueSuggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion.uuid)}
        className="cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md"
      >
        {suggestion.name}
      </li>
    ));
  };

  const handleRedirect = (uuid: string) => {
    router.push(`/profile/${uuid}`);
  };

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const filteredUsernames = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredGroups = groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredUsers.length === 1) {
      handleRedirect(filteredUsers[0].uuid);
    } else if (filteredGroups.length === 1) {
      handleRedirect(filteredGroups[0].uuid);
    } else if (filteredUsernames.length === 1) {
      handleRedirect(filteredUsernames[0].uuid);
    }
  };

  return (
    <>
      <button onClick={openModal}>Make a search</button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" ref={backdropRef}>
          <div className="absolute inset-0 dark:bg-gray-900 bg-white opacity-50"></div>
          <div className="dark:bg-gray-800 dark:text-white bg-white text-black p-8 rounded shadow-lg z-50" ref={modalRef}>
            <h2 className="text-2xl font-bold mb-4">Search a User/Group</h2>

            <div className="flex items-center mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full mr-4 text-black"
                placeholder="Search..."
                autoFocus
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Search
              </button>
            </div>

            <ul>{renderSuggestions()}</ul>

            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
