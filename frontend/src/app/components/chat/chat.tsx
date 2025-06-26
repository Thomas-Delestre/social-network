"use client";
import React, { useState } from "react";
import ChatBoxUser from "./chatBoxUser";
import ChatBoxGroup from "./chatBoxGroup";
import ChatSelect from "./chatSelect";
import ChatButton from "./chatButton";

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

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-4 text-slate-600 hover:text-red-600"
  >
    &#x2715;
  </button>
);

export default function Chat() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selection, setSelection] = useState<{
    type: 'user' | 'group' | null;
    data: User | Group;
  }>({
    type: null,
    data: {
      uuid: "",
      firstName: "",
      lastName: "",
      avatar: "",
      name: "",
    },
  });

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  const selectUser = (user: User) => {
    setSelection({
      type: "user",
      data: user,
    });
  };

  const selectGroup = (group: Group) => {
    setSelection({
      type: "group",
      data: group,
    });
  };

  const clearSelection = () => {
    setSelection({
      type: null,
      data: { uuid: "", firstName: "", lastName: "", avatar: "", name: "" },
    });
  };

  return (
    <>
      <ChatButton onClick={toggleChatVisibility} />
      {isChatVisible && (
        <div className="fixed bottom-16 right-4 h-96">
          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="flex h-full">
              <ChatSelect
                onSelectUser={selectUser}
                onSelectGroup={selectGroup}
              />
              {selection.type === "user" && (
                <>
                  <CloseButton onClick={clearSelection} />
                  <ChatBoxUser selectUser={selection.data as User} />
                </>
              )}
              {selection.type === "group" && (
                <>
                  <CloseButton onClick={clearSelection} />
                  <ChatBoxGroup selectGroup={selection.data as Group} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
