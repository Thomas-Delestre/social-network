"use client";
import React from "react";
import { notifications } from "@/app/object/notification";
import { groups } from "@/app/object/group";
import { users } from "@/app/object/user";
import MarkAsReadButton from "../components/button/markAsRead";

interface NotificationItem {
  uuid: string;
  type: string;
  user_send_uuid?: string | null;
  group_send_uuid?: string | null;
  created_at: string;
  is_read: boolean;
}

const Notification: React.FC = () => {
  let Avatar: string;
  let User: any;
  let Group: any;

  const actualDate = new Date();

  const getTimeSince = (notificationDate: Date): string => {
    const differenceInMillis =
      actualDate.getTime() - notificationDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) {
      return `since ${differenceInDays} day${differenceInDays > 1 ? "s" : ""}`;
    } else if (differenceInHours > 0) {
      return `since ${differenceInHours} hour${
        differenceInHours > 1 ? "s" : ""
      }`;
    } else if (differenceInMinutes > 0) {
      return `since ${differenceInMinutes} minute${
        differenceInMinutes > 1 ? "s" : ""
      }`;
    } else {
      return `since ${differenceInSeconds} second${
        differenceInSeconds > 1 ? "s" : ""
      }`;
    }
  };

  const notificationSentences = (notification: string) => {
    switch (notification) {
      case "following_request":
        return "$user wants to follow you";
      case "group_invitation":
        return "$user invited you to join the group $group";
      case "group_join_request":
        return "$user wants to join the group $group";
      case "group_event":
        return "$user created an event in the group $group";
      case "group_chat":
        return "$user sent a message in chat group $group";
      case "user_chat":
        return "$user sent you a message";
      case "new_group_post":
        return "$user make a new post in the group $group";
      case "new_user_post":
        return "$user make a new post";
    }
  };
  const renderNotification = (
    notification: NotificationItem,
    index: number
  ) => {
    const dateOfNotification = new Date(notification.created_at);
    const timeSince = getTimeSince(dateOfNotification);

    if (notification.user_send_uuid) {
      User = users.find((user) => user.uuid === notification.user_send_uuid);
      Avatar =
        User?.avatar ||
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    } else if (notification.group_send_uuid) {
      Group = groups.find(
        (group) => group.uuid === notification.group_send_uuid
      );
      Avatar =
        Group?.photoUrl ||
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    }

    return (
      <div
        key={notification.uuid}
        className="flex w-[300px] h-48 items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 dark:border-gray-600 max-w-sm relative mb-3 mr-1"
      >
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 absolute top-1 right-0">
          {notification.type.replaceAll("_", " ").toUpperCase()}
        </span>

        <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0 dark:text-white">
          {timeSince}
        </span>

        {notification.is_read ? null : <MarkAsReadButton />}

        <img className="h-12 w-12 rounded-full" alt="avatar" src={Avatar} />

        <div className="ml-5">
          <h4 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
            Who triggered the notification
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {notificationSentences(notification.type)
              ?.replaceAll("$user", `${User?.firstName + " " + User?.lastName}`)
              .replaceAll("$group", Group?.name)}
          </p>
        </div>
      </div>
    );
  };

  const isReadNotifications = notifications.filter(
    (notification) => notification.is_read
  );

  const isNotReadNotifications = notifications.filter(
    (notification) => !notification.is_read
  );

  return (
    <>
      <h1 className="mt-24 text-2xl font-bold text-center mb-6 dark:text-white">
        New Notification
      </h1>
      <div className="container flex flex-wrap mx-auto justify-center">
        {isNotReadNotifications.map(renderNotification)}
      </div>
      <h1 className="mt-24 text-2xl font-bold text-center mb-6 dark:text-white">
        Notifications already read
      </h1>
      <div className="container flex flex-wrap mx-auto justify-center">
        {isReadNotifications.map(renderNotification)}
      </div>
    </>
  );
};

export default Notification;
