"use client";
import React, { useState, useEffect, useRef } from "react";

export default function MakeGroupEventModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

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
          New Group Event
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
            <h2 className="text-2xl font-bold mb-4 text-center">New Event</h2>

            <div className="flex items-center mb-4">
              <input
                type="texte"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mr-4 text-black"
                placeholder="Title of the Event"
                autoFocus
              />
            </div>

            <div className="flex items-center mb-4">
              <textarea
                className="border border-gray-300 rounded-md px-3 py-2 w-full mr-4 text-black"
                placeholder="Description of the Event"
              />
            </div>

            <div className="flex flex-row-reverse justify-between">
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Start Date of the event
                </label>
                <input
                  id="startDate"
                  name="date"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  End Date of the event
                </label>
                <input
                  id="endDate"
                  name="date"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
