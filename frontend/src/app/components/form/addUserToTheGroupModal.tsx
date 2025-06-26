"use client";
import React, { useState, useEffect, useRef } from "react";
import { users } from "@/app/object/user";

interface User {
  uuid: string;
  firstName: string;
  lastName: string;
}

export default function AddUserToTheGroupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    if (!selectedUsers.find((user) => user.uuid === userId)) {
      const user = users.find((user) => user.uuid === userId);
      if (user) {
        setSelectedUsers([...selectedUsers, user]);
      }
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.uuid !== userId));
  };

  const handleRemoveAllUsers = () => {
    setSelectedUsers([]);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      backdropRef.current &&
      backdropRef.current.contains(event.target as Node)
    ) {
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

  return (
    <>
      <button
        onClick={openModal}
        className="w-full text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        Ask User to join the Group
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          ref={backdropRef}
        >
          <div className="absolute inset-0 dark:bg-gray-900 bg-white opacity-50"></div>
          <div
            className="dark:bg-gray-800 dark:text-white bg-white text-black p-8 rounded shadow-lg z-50 md:w-1/2 sm:w-full"
            ref={modalRef}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Ask User to join the group
            </h2>
            <div className="mb-4">
              {selectedUsers.map((user) => (
                <div
                  key={user.uuid}
                  onClick={() => handleRemoveUser(user.uuid)}
                  className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                >
                  {user.firstName} {user.lastName} ×
                </div>
              ))}
            </div>

            <select
              onChange={handleSelectUser}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.uuid} value={user.uuid}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>

              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
