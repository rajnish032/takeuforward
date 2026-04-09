import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HeroSection({ month, year, image }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 15;
      const rotateX = -((y / rect.height) - 0.5) * 15;

      gsap.to(card, {
        rotateY,
        rotateX,
        transformPerspective: 800,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const reset = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section className="relative w-full max-w-4xl mx-auto perspective-[1000px]">
      <div className="absolute -top-4 left-1/4 w-3 h-3 bg-gray-800 rounded-full shadow-lg"></div>
      <div className="absolute -top-4 right-1/4 w-3 h-3 bg-gray-800 rounded-full shadow-lg"></div>
      <div className="absolute top-0 left-1/4 w-[50%] h-[2px] bg-gray-400"></div>
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden bg-white shadow-2xl will-change-transform transition-transform"
      >
        <div className="h-72 overflow-hidden">
          <img
            src={image}
            alt={`${month} ${year}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 bg-white clip-diagonal" />
        <div className="absolute bottom-0 right-0 w-1/2 h-28 bg-blue-500 clip-blue flex items-end justify-end p-4">
          <h2 className="text-white text-xl font-bold text-right leading-tight">
            {year}
            <br />
            {month.toUpperCase()}
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/20 to-transparent"></div>

      </div>
    </section>
  );
}