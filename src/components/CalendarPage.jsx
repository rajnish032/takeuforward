import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

import HeroSection from "./HeroSection";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const HUMIDITY_MAP = {
  0: "dry", 1: "dry", 2: "moderate", 3: "moderate",
  4: "humid", 5: "humid", 6: "humid", 7: "humid",
  8: "moderate", 9: "moderate", 10: "dry", 11: "dry",
};

const IMAGE_MAP = {
  dry: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  ],
  moderate: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  ],
  humid: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1520322082799-20c1288346e3",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  ],
};

export default function CalendarPage() {
  const pageRef = useRef(null);

  const [direction, setDirection] = useState(1); // 🔥 flip direction

  const [currentDate, setCurrentDate] = useState(() => {
    if (typeof window === "undefined") return new Date();
    const saved = localStorage.getItem("calendar-current-date");
    return saved ? new Date(saved) : new Date();
  });

  const [range, setRange] = useState({ start: null, end: null });
  const [heroImage, setHeroImage] = useState("");

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();

  useEffect(() => {
    localStorage.setItem("calendar-current-date", currentDate.toISOString());
  }, [currentDate]);

  useEffect(() => {
    const type = HUMIDITY_MAP[monthIndex];
    const images = IMAGE_MAP[type];
    const random = images[Math.floor(Math.random() * images.length)];
    setHeroImage(random);
  }, [monthIndex]);

  // PAGE FLIP
  useEffect(() => {
    const el = pageRef.current;

    gsap.fromTo(
      el,
      {
        rotateY: direction === 1 ? -90 : 90,
        opacity: 0,
        scale: 0.95,
      },
      {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        transformPerspective: 1200,
      }
    );
  }, [monthIndex]);

  const changeMonth = (offset) => {
    setDirection(offset);
    setCurrentDate(new Date(year, monthIndex + offset, 1));
    setRange({ start: null, end: null });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div
        ref={pageRef}
        className="max-w-4xl w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-200 p-4">

          <HeroSection
            month={MONTH_NAMES[monthIndex]}
            year={year}
            image={heroImage}
          />

          <div className="flex items-center justify-between mt-4 px-4 py-2 bg-gray-50 rounded-xl shadow-inner">
            <button
              onClick={() => changeMonth(-1)}
              className="nav-btn"
            >
              ←
            </button>

            <h2 className="font-semibold text-lg">
              {MONTH_NAMES[monthIndex]} {year}
            </h2>

            <button
              onClick={() => changeMonth(1)}
              className="nav-btn"
            >
              →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-4">

            <NotesSection year={year} month={monthIndex} />

            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <CalendarGrid
                year={year}
                month={monthIndex}
                startDate={range.start}
                endDate={range.end}
                setStartDate={(d) =>
                  setRange((r) => ({ ...r, start: d }))
                }
                setEndDate={(d) =>
                  setRange((r) => ({ ...r, end: d }))
                }
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}