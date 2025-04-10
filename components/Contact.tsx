"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faComments,
  faHeadphonesSimple,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";

library.add(
  faFacebook,
  faInstagram,
  faTelegram,
  faXTwitter,
  faComments,
  faHeadphonesSimple,
  faXmark
);

type SocialMediaItem = {
  icon: IconDefinition;
  color?: string;
  name: string;
  href: string | null;
  isGradient?: boolean;
};

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredList, setHoveredList] = useState(false);

  const socialMediaItems: SocialMediaItem[] = [
    {
      icon: faFacebook,
      color: "#1877F2",
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100037257575752",
    },
    {
      icon: faInstagram,
      name: "Instagram",
      href: "https://www.instagram.com",
      isGradient: true,
    },
    {
      icon: faTelegram,
      color: "#0088CC",
      name: "Telegram",
      href: "https://telegram.org",
    },
    {
      icon: faXTwitter,
      color: "#000000",
      name: "X-Twitter",
      href: "https://x.com/home",
    },
    {
      icon: faComments,
      name: "Support",
      href: null,
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <ul
        className={classNames(
          "flex flex-col p-2.5 rounded-xl overflow-hidden bg-white origin-bottom-right transition-all duration-300 ease-in-out",
          {
            "scale-y-100 opacity-100": isOpen,
            "scale-y-0 opacity-0": !isOpen,
            "w-16 border-none": !hoveredList,
            "w-40 mb-5 border border-gray-300": hoveredList,
          }
        )}
        onMouseEnter={() => setHoveredList(true)}
        onMouseLeave={() => setHoveredList(false)}
      >
        {socialMediaItems.map((item, index) => (
          <li
            key={index}
            className="w-full cursor-pointer"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <a
              href={item.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              aria-label={item.name}
            >
              <div
                className={classNames({
                  "w-full flex items-center justify-between py-2.5 rounded-xl":
                    true,
                  "transition-colors duration-300 ease-in-out": true,
                  "bg-gray-300 bg-opacity-50": hoveredItem === index,
                  "px-2.5": hoveredList,
                })}
              >
                <div className="w-full flex items-center justify-center">
                  {item.isGradient ? (
                    <span className="size-[32px] flex items-center justify-center rounded-md bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 p-2">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-white text-3xl"
                        />
                    </span>
                  ) : (
                    <span className="size-[32px] flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-3xl"
                          style={{ color: item.color}}
                        />
                    </span>
                  )}
                </div>
                <span
                  className={classNames({
                    " whitespace-nowrap": true,
                    "transition-all duration-300 ease-in-out": true,
                    "text-black": hoveredItem === index,
                    "text-gray-600": hoveredItem !== index,
                    "w-full opacity-100 scale-x-100 ml-4":
                      isOpen && hoveredList,
                    "w-0 opacity-0 scale-x-0 ml-0": !isOpen || !hoveredList,
                  })}
                >
                  {item.name}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

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
            icon={isOpen ? faXmark : faHeadphonesSimple}
            className={`text-xl p-3.5 ${
              isOpen
                ? "animate-[spin_0.5s_ease-in-out_1]"
                : "animate-[reverse-spin_0.5s_ease-in-out_1]"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
