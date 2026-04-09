import { useEffect, useState } from "react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function NotesSection({ year, month }) {
  const storageKey = `calendar-notes-${year}-${month}`;

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(storageKey) || "";
  });

  // Sync when month changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setNotes(saved || "");
  }, [storageKey]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNotes(value);
    localStorage.setItem(storageKey, value);
  };

  return (
    <section className="bg-white p-4 rounded-xl shadow h-full flex flex-col">
      
      <h3 className="font-semibold mb-4 text-gray-700">
        Notes ({MONTH_NAMES[month]} {year})
      </h3>

      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes..."
        className="flex-1 w-full resize-none outline-none bg-transparent text-gray-700 text-sm leading-7"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 96%, #d1d5db 96%)",
          backgroundSize: "100% 28px",
        }}
      />
    </section>
  );
}