"use client";
import { FadeInImage } from "@/components/FadeInImage";
import Image from "next/image";
import React from "react";

const Universe = () => {
  const picList = [
    { href: "/pic/universe1.jpg", name: "Universe 1" },
    { href: "/pic/universe2.jpg", name: "Universe 2" },
    { href: "/pic/universe3.jpg", name: "Universe 3" },
    { href: "/pic/universe4.jpg", name: "Universe 4" },
    { href: "/pic/universe5.webp", name: "Universe 5" },
    { href: "/pic/universe6.jpg", name: "Universe 6" },
    { href: "/pic/universe7.jpg", name: "Universe 7" },
    { href: "/pic/universe8.jpg", name: "Universe 8" },
  ];

  return (
    <div className="min-h-screen py-10 px-4 relative overflow-hidden">
      <div className="md:max-w-[85%] mx-auto z-10">
        <div className="min-h-[50vh]"></div>

        <div className=" grid md:grid-cols-2 gap-20">
          {picList.map((pic, index) => (
            <FadeInImage key={index} src={pic.href} alt={pic.name} />
          ))}
        </div>
      </div>

      <div className="fixed inset-0 -z-20">
        <Image
          src="/pic/bg.jpg"
          alt="background"
          fill
          sizes="100vw"
          className="max-h-screen "
          priority
        />
      </div>

      <div className="fixed inset-0 bg-black/60 -z-10" />
    </div>
  );
};

export default Universe;
