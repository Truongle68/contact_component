"use client";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={classNames({
        "flex items-end justify-start w-full h-[12vh] fixed z-50 transition-colors duration-1000 ease-in-out":
          true,
        "bg-black/60 backdrop-blur-xl text-white/70": isScroll,
        "bg-transparent text-white/40": !isScroll,
      })}
    >
        <div className="max-w-[85%] w-[85%] mx-auto mb-4 px-4">
            <ul className="flex items-center gap-6">
                <li><Link href={'/'}>HOME</Link></li>
                <li><Link href={'/universes'}>UNIVERSES</Link></li>
                <li><Link href={'#'}>STARTS</Link></li>
                <li><Link href={'#'}>MOON</Link></li>
            </ul>
        </div>
    </div>
  );
};

export default Navbar;
