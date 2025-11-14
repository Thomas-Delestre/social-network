"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { users } from "@/app/object/user";

interface User {
  uuid: string;
  firstName: string;
  lastName: string;
}


export default function MakePersonalPostModal({currentUser}: {currentUser: {isLogged: boolean, user: any | null}}) {

  const { isLogged, user } = currentUser
  const [isOpen, setIsOpen] = useState(false);
  const [isAlmostPrivate, setIsAlmostPrivate] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [post_formData, setFormData] = useState({
    userId: user?.Id || "",
    content: "",
    visibility: "public",
    allowedUsers: [] as string[],
    image: null as File | null,
  });

  useEffect(() => {
    if (user?.Id) {
      setFormData(prev => ({ ...prev, userId: user.Id }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const data = new FormData();
    data.append("userId", post_formData.userId || "");
    data.append("content", post_formData.content);
    data.append("visibility", post_formData.visibility);
    post_formData.allowedUsers.forEach(u => data.append("allowedUsers[]", u));
    if (post_formData.image) data.append("image", post_formData.image);

    console.log("FormData contents: ----------------");
    console.log(data.entries())

    console.log("-------------------------");
    const response = await fetch('http://localhost:8080/newpost', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    console.log('Response status:', response.status); // ✅ Voir le status

    if (!response.ok) {
      const err_feedback = await response.json();
      console.log('Error response:', err_feedback); // ✅ Voir la structure
      alert(err_feedback.error || 'Erreur inconnue');
      return;
    } else {
      const success_feedback = await response.json();
      console.log('Success response:', success_feedback); // ✅ Voir la structure
      alert(success_feedback.message || 'Succès !');
      closeModal()
    }
  };

  function handleAlmostPrivatePost(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    if (event.target.value !== "almost_private") {
      setIsAlmostPrivate(false);
    } else {
      setIsAlmostPrivate(true);
    }
  }

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

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFormData({
        ...post_formData,
        image: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const openModal = () => {
    setIsOpen(true);
    setIsAlmostPrivate(false);
    handleRemoveAllUsers();
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

  return (
    <>
      <button onClick={openModal}>New Personal Post</button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" ref={backdropRef}>
          <div className="absolute inset-0 dark:bg-gray-900 bg-white opacity-50"></div>
          <div className="dark:bg-gray-800 dark:text-white bg-white text-black p-8 rounded shadow-lg z-50 md:w-1/2 sm:w-full" ref={modalRef}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Time to be creative
            </h2>
            <form onSubmit={onSubmit}>

              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <input
                id="content"
                type="text"
                name="content"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mr-4 text-black"
                placeholder="Once Upon a Time..."
                autoFocus
                onChange={handleChange}
                required
              />

              <label
                htmlFor="post-type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Visibility of your post
              </label>
              <select
                id="post-type"
                name="visibility"   // ← important pour ton handleChange
                value={post_formData.visibility} // ← contrôle la valeur
                onChange={(e) => {
                  handleChange(e);               // met à jour post_formData.visibility
                  handleAlmostPrivatePost(e);    // gère l'état isAlmostPrivate
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              >
                <option value="public">🌍 Public</option>
                <option value="almost_private">🔓 Almost private</option>
                <option value="private">🔐 Private</option>
              </select>
            {/* 
              {isAlmostPrivate && (
                <>
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
                </>
              )} */}

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handleImageChange}
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PNG, JPG, JPEG or GIF (MAX. 2MB).
              </p>

              {(previewSrc || "").toString().startsWith("data:image") && (
              <div className="mt-3">
                <h2 className="text-2xl text-center font-bold mb-2">
                  Preview of your image
                </h2>
                <img
                  className="mx-auto"
                  src={
                    previewSrc instanceof ArrayBuffer
                      ? undefined
                      : previewSrc || ""
                  }
                  alt="Profile photo"
                />
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>

              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
