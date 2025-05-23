"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faEnvelopeCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import avatar from "../public/pic/dalat-3.jpg";
import { formatDate } from "../utils/dateLogics";

library.add(faBell, faUser, faEnvelopeCircleCheck);

type Notification = {
  performBy: string;
  performByAvatar?: string | StaticImageData;
  action: string;
  objectName?: string;
  content?: string;
  read: boolean;
  performAt: string;
};

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [readStatus, setReadStatus] = useState({
    all: true,
    unread: false,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const readStatusRef = useRef(null);

  const notiData = useMemo(
    () => [
      {
        performBy: "John Doe",
        performByAvatar: avatar,
        action: "accepted",
        objectName: "your friend request",
        content: "",
        read: false,
        performAt: "2024-10-01T12:00:00Z",
      },
      {
        performBy: "Jane Smith",
        action: "commented",
        objectName: "your post",
        content: "Great post!",
        read: true,
        performAt: "2025-03-16T12:00:00Z",
      },
      {
        performBy: "Mike Johnson",
        action: "liked",
        objectName: "your photo",
        content: "",
        read: false,
        performAt: "2025-04-14T12:30:00Z",
      },
      {
        performBy: "Emily Davis",
        action: "shared",
        objectName: "your video",
        content: "",
        read: true,
        performAt: "2025-04-02T12:00:00Z",
      },
      {
        performBy: "Dani Davis",
        action: "shared",
        objectName: "your video",
        content: "",
        read: false,
        performAt: "2025-04-10T12:00:00Z",
      },
      {
        performBy: "PVTruong ngu",
        action: "is playing",
        objectName: "League of Legends",
        content: "",
        read: false,
        performAt: "2025-04-14T22:00:00Z",
      },
    ],
    []
  );

  useEffect(() => {
    if (readStatus.unread)
      setNotifications((prev) => prev.filter((noti) => !noti.read));
    else setNotifications(notiData);
    setNotifications((prev) =>
      prev.sort((a, b) =>
        new Date(a.performAt) > new Date(b.performAt) ? -1 : 1
      )
    );
  }, [readStatus, notiData]);

  useEffect(() => {
    // close menu when click outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menu = document.querySelector("#notification-menu") as HTMLElement;
      if (menu && !menu.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSwitch = () => {
    setReadStatus((prevState) => {
      return {
        all: !prevState.all,
        unread: !prevState.unread,
      };
    });
  };

  const switchToAll = () => {
    if (readStatus.all) return;
    
    // Use setTimeout to let the click finish before state updates
    setTimeout(() => {
      setReadStatus({
        all: true,
        unread: false,
      });
      setNotifications(notiData);
    }, 10);
  };

  const handleViewNotification = (position: number) => {
    console.log("position: ", position);
    if (notifications[position]?.read) return;
    notifications[position].read = true;
  };

  return (
    <div className="fixed top-0 right-[50%] z-50 ">
      <div className="flex items-center justify-end w-full">
        <button
          onClick={toggleMenu}
          className="
              cursor-pointer 
              border border-gray-300 rounded-full 
              w-14 h-14 flex items-center justify-center
              focus:outline-none bg-white
              hover:bg-gray-100 transition-colors
            "
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <FontAwesomeIcon
            icon={faBell}
            className={`text-xl p-3.5 ${
              isOpen
                ? "animate-bounce scale-150 transition-transform duration-500 ease-in-out"
                : ""
            }`}
          />
        </button>
      </div>

      <div
        id="notification-menu"
        className={classNames({
          "max-h-[50vh] max-w-80 h-fit w-80 rounded-md flex flex-col border border-gray-300 shadow-2xl origin-top-right transition-all duration-300":
            true,
          "opacity-0 scale-0": !isOpen,
          "opacity-100 scale-100": isOpen,
        })}
      >
        {/* header */}
        <div className="flex items-center justify-between  border-b border-gray-300 py-3 px-4">
          <h1 className="text-2xl">Notifs</h1>
          <div className="flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md p-1 text-sm">
            <button
              onClick={() => {
                if (readStatus.all) return;
                handleSwitch();
              }}
              className={classNames({
                "py-1.5 px-4  rounded-md cursor-pointer transition-all duration-300 border":
                  true,
                "bg-white text-black border-gray-200 shadow": readStatus.all,
                "hover:bg-white/50 hover:text-black/70 text-black/50 bg-transparent border-transparent":
                  !readStatus.all,
              })}
              ref={readStatusRef}
            >
              All
            </button>
            <button
              onClick={() => {
                if (readStatus.unread) return;
                handleSwitch();
              }}
              className={classNames({
                "py-1.5 px-4 rounded-md cursor-pointer transition-all duration-300 border":
                  true,
                "bg-white text-black border-gray-200 shadow": readStatus.unread,
                "hover:bg-white/50 hover:text-black/70 text-black/50 bg-transparent border-transparent":
                  !readStatus.unread,
              })}
            >
              Unread
            </button>
          </div>
        </div>

        {/* body */}
        {/* read all */}
        {notiData.length === 0 ? (
          <div className="w-full flex items-center justify-center ">
            {/* <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-3xl"/> */}
            <span className="py-4 px-2">No notifications yet</span>
          </div>
        ) : readStatus.unread && notifications.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-3">You&apos;re all caught up!</p>
            <button
              className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
              onClick={() => {
                switchToAll();
              }}
            >
              Check for updates
            </button>
          </div>
        ) : (
          <div className=" flex flex-col items-baseline overflow-y-auto max-h-80 py-3 px-4">
            {notifications?.map((notifications, index) => {
              return (
                <div
                  key={index}
                  className="w-full max-h-[270px] flex items-start gap-2 rounded-md p-2 cursor-pointer relative hover:bg-gray-100"
                  onClick={() => handleViewNotification(index)}
                >
                  {/* avatar */}
                  <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center shrink-0">
                    {notifications.performByAvatar ? (
                      <Image
                        src={notifications.performByAvatar}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-end justify-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 text-3xl"
                        />
                      </div>
                    )}
                  </div>
                  {/* content */}
                  <div
                    className={classNames({
                      "flex flex-col w-full text-sm": true,
                      "opacity-50": notifications.read,
                      "opacity-100": !notifications.read,
                    })}
                  >
                    <span className="">
                      <strong>{notifications.performBy}</strong>{" "}
                      {notifications.action} {notifications.objectName}
                    </span>
                    <span className="">{notifications.content}</span>
                    <span
                      className={`text-xs ${
                        !notifications.read ? "text-blue-800" : ""
                      }`}
                    >
                      {formatDate(notifications.performAt)}
                    </span>
                  </div>
                  {/* unread sight */}
                  {!notifications.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 right-1 -translate-y-1"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
