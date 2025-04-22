import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const FadeInImage = ({ src, alt }: { src: string; alt: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [isMount, setIsMount] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (inView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-[300px] cursor-pointer transition-all duration-700 ease-in-out ${
        isMount
          ? hasBeenInView
            ? "opacity-100 translate-y-0 "
            : "opacity-0 translate-y-40 "
          : "opacity-0 translate-y-40 transition-all duration-100 ease-in-out"
      } ${isHover ? 'scale-105' : 'scale-100'}`}
      onMouseEnter={()=>setIsHover(true)}
      onMouseLeave={()=>setIsHover(false)}
    >
      {hasBeenInView && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md object-cover -z-20"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,...[your base64 placeholder]"
        />
      )}

      <div className="fixed inset-0 bg-black/40 -z-10 hover:bg-black/20"/>

      <div className={classNames({
        "fixed bottom-0 bg-black/70 w-full h-1/3 text-white transition-all duration-500 ease-in-out py-4 px-8":true,
        "opacity-100":isHover,
        "opacity-0":!isHover,
      })}>
        <div className="h-full flex flex-col justify-center gap-2">
          <span className="text-lg text-white/40">Type</span>
          <span className="text-3xl">Title</span>
        </div>
      </div>
    </div>
  );
};
