import React, { useState } from "react";
import { users } from "@/app/object/user";
import { groups } from "@/app/object/group";

interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Group {
  uuid: string;
  name: string;
  avatar: string;
}

interface ChatSelectProps {
  onSelectUser: (user: User) => void;
  onSelectGroup: (group: Group) => void;
}

export default function ChatSelect({ onSelectUser, onSelectGroup }: ChatSelectProps) {
  const [showUsers, setShowUsers] = useState(true); 

  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  const handleUserSelect = (user: User) => {
    onSelectUser(user);
  };

  const handleGroupSelect = (group: Group) => {
    onSelectGroup(group);
  };

  return (
    <div className="flex h-full flex-col border-r bg-slate-50 w-auto">
      <div className="flex h-16 items-center justify-center space-x-4 border-b px-4">
        <button onClick={() => setShowUsers(true)}>
          <div className={`border-b-4 ${showUsers ? 'border-b-blue-500' : ''} px-4 py-4`}>
            <h1>Mutual follow</h1>
          </div>
        </button>
        <button onClick={() => setShowUsers(false)}>
          <div className={`border-b-4 px-4 py-4 ${!showUsers ? 'border-b-blue-500' : ''}`}>
            Group
          </div>
        </button>
      </div>
      <div className="h-[calc(100vh - 16rem)] overflow-y-auto">
        {showUsers ? (
          // Afficher la liste des utilisateurs
          users.map((user) => (
            <div
              key={user.uuid}
              className="flex cursor-pointer items-center border-l-4 border-l-transparent px-5 py-4 hover:bg-slate-100"
              onClick={() =>
                handleUserSelect({
                  uuid: user.uuid,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  avatar: user.avatar,
                })
              }
            >
              <img
                src={user?.avatar.length !== 0 ? user?.avatar : defaultAvatarUrl}
                className="h-12 w-12 rounded-full border-2 border-white"
                alt=""
              />
              <div className="ml-4">
                <p className="text-md m-0 p-0 font-semibold text-slate-600">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          ))
        ) : (
          // Afficher la liste des groupes
          groups.map((group) => (
            <div
              key={group.uuid}
              className="flex cursor-pointer items-center border-l-4 border-l-transparent px-5 py-4 hover:bg-slate-100"
              onClick={() =>
                handleGroupSelect({
                  uuid: group.uuid,
                  name: group.name,
                  avatar: group.photoUrl,
                })
              }
            >
              <img
                src={group.photoUrl}
                className="h-12 w-12 rounded-full border-2 border-white"
                alt=""
              />
              <div className="ml-4">
                <p className="text-md m-0 p-0 font-semibold text-slate-600">
                  {group.name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
