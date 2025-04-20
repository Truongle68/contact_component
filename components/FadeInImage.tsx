import Image from "next/image";
import { useInView } from "react-intersection-observer";

export const FadeInImage = ({ src, alt }: { src: string; alt: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative w-full h-[300px] transition-colors duration-700 ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {inView && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,...[your base64 placeholder]"
        />
      )}
    </div>
  );
};
