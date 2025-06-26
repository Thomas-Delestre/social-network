import React from "react";
import { chatGroupMessage } from "../../object/fakeChat";
import { users } from "../../object/user";
import { useAuth } from "@/app/tmp/useAuth";

interface ChatBoxProps {
  selectGroup: any;
}

export default function ChatBoxGroup({ selectGroup }: ChatBoxProps) {
  console.log("🚀 ~ ChatBoxGroup ~ selectGroup:", selectGroup)
  const { user } = useAuth();
  const groupChat = chatGroupMessage.filter(
    (message) => message.group_uuid === selectGroup.uuid
  );
  let groupMessages;

  if (groupChat.length > 0) {
    groupMessages = groupChat[0].chat_message;
  }

  const defaultAvatarUrl = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="flex flex-col w-96">
      <div className="flex h-16 w-full items-center justify-between border-b px-5 py-2 shadow-sm">
        <a href={`group/${selectGroup.uuid}`} className="flex items-center">
          <img
            className="h-10 w-10 overflow-hidden rounded-full"
            src={selectGroup?.avatar.length !== 0 ? selectGroup?.avatar : defaultAvatarUrl}
            alt={
              selectGroup.name +
              " avatar"
            }
          />
          <p className="ml-3 font-semibold text-slate-600">
            {selectGroup.name}
          </p>
        </a>
      </div>
      <div className="h-[calc(100vh - 16rem)] px-10 py-4 overflow-y-auto">
        {groupMessages &&
          groupMessages.map((messageObj, index) => {
            let userSender;
            if (!messageObj.sender_is_user) {
              userSender = users.find((user) => user.uuid === messageObj.user_uuid);
            }
            return (
              messageObj.sender_is_user === true ? (
                <div className="w-full px-5 py-3" key={index}>
                  <div>
                    <div className="flex items-center justify-end">
                      <p className="mr-3 text-sm font-semibold text-slate-600">
                        Me{" "}
                        <span className="text-xs text-slate-400">
                          {messageObj.timestamp
                            ? new Date(messageObj.timestamp).toLocaleDateString(
                                "fr-FR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )
                            : ""}
                        </span>
                      </p>
  
                      <img
                        className="h-5 w-5 overflow-hidden rounded-full"
                        src={user?.avatar.length !== 0 ? user?.avatar : defaultAvatarUrl}
                        alt={user.firstName + " " + user.lastName + " avatar"}
                      />
                    </div>
  
                    <div className="mt-3 w-full rounded-b-xl rounded-tl-xl bg-blue-500 p-4">
                      <p className="text-sm text-white">{messageObj.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Ajouter une condition pour afficher le de l'user
                <div className="flex-start flex w-full overflow" key={index}>
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-5 w-5 overflow-hidden rounded-full"
                        src={userSender?.avatar.length !== 0 ? userSender?.avatar : defaultAvatarUrl}
                        alt={
                          userSender?.firstName +
                          " " +
                          userSender?.lastName +
                          " avatar"
                        }
                      />
                      <p className="ml-3 text-sm font-semibold text-slate-600">
                        {userSender?.firstName + " " + userSender?.lastName + " "}
                        <span className="text-xs text-slate-400">
                          {messageObj.timestamp
                            ? new Date(messageObj.timestamp).toLocaleDateString(
                                "fr-FR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )
                            : ""}
                        </span>
                      </p>
                    </div>
  
                    <div className="mt-3 w-full rounded-b-xl rounded-tr-xl bg-slate-200 p-4">
                      <p className="text-sm text-slate-500">
                        {messageObj.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )
          }

          )}
      </div>
      <div className="w-full px-5 py-3">
        <div className="flex h-12 items-center justify-between rounded-lg border border-transparent bg-slate-50 px-3 focus-within:border-slate-300">
          <input
            type="text"
            className="w-full bg-transparent px-3 outline-none rounded-md placeholder:text-slate-400"
            placeholder="Type your message"
          />
        </div>
      </div>
    </div>
  );
}
