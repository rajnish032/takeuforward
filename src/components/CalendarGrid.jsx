import DayCell from "./DayCell";
import { generateCalendar } from "../utils/dateUtils";
import { useState, useEffect } from "react";

const COLORS = ["red", "blue", "green", "yellow"];

const COLOR_MAP = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
};

export default function CalendarGrid({ year, month }) {
  const days = generateCalendar(year, month);

  const [selectedDate, setSelectedDate] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  const [isDragging, setIsDragging] = useState(false);
  const [didDrag, setDidDrag] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const [notesMap, setNotesMap] = useState(() => {
    const saved = localStorage.getItem("calendar-date-notes");
    return saved ? JSON.parse(saved) : {};
  });

  const [ranges, setRanges] = useState(() => {
    const saved = localStorage.getItem("calendar-selected-ranges");
    return saved ? JSON.parse(saved) : {};
  });

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const todayDay = isCurrentMonth ? today.getDate() : null;

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

  const formatDate = (day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  useEffect(() => {
    localStorage.setItem("calendar-date-notes", JSON.stringify(notesMap));
  }, [notesMap]);

  useEffect(() => {
    localStorage.setItem("calendar-selected-ranges", JSON.stringify(ranges));
  }, [ranges]);

  const handleClick = (day) => {
    if (!day || isDragging || didDrag) return;

    const fullDate = formatDate(day);
    const existing = notesMap[fullDate];

    setSelectedDate(fullDate);
    setNoteText(existing?.text || "");
    setSelectedColor(existing?.color || "blue");

    setDragStart(null);
    setDragEnd(null);
  };

  //Drag
  const handleMouseDown = (day) => {
    if (!day) return;

    setIsDragging(true);
    setDidDrag(false);
    setDragStart(day);
    setDragEnd(day);
  };

  const handleMouseEnter = (day) => {
    if (!isDragging || !day) return;

    setDidDrag(true);
    setDragEnd(day);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (!didDrag || !dragStart || !dragEnd) return;

    const start = Math.min(dragStart, dragEnd);
    const end = Math.max(dragStart, dragEnd);

    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    setRanges((prev) => {
      const existing = prev[monthKey] || [];
      return {
        ...prev,
        [monthKey]: [...new Set([...existing, ...range])],
      };
    });

    setDragStart(null);
    setDragEnd(null);
  };

  //Touch
  const handleTouchStart = (day) => {
    if (!day) return;

    setIsDragging(true);
    setDidDrag(false);
    setDragStart(day);
    setDragEnd(day);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);

    const day = el?.getAttribute("data-day");

    if (day) {
      setDidDrag(true);
      setDragEnd(Number(day));
    }
  };

  const handleTouchEnd = handleMouseUp;

  //Notes
  const handleSave = () => {
    if (!selectedDate || !noteText.trim()) return;

    setNotesMap((prev) => ({
      ...prev,
      [selectedDate]: {
        text: noteText,
        color: selectedColor,
      },
    }));

    setSelectedDate(null);
    setNoteText("");
  };

  const handleDelete = () => {
    if (!selectedDate) return;

    const updated = { ...notesMap };
    delete updated[selectedDate];

    setNotesMap(updated);
    setSelectedDate(null);
  };

  const hasRange = ranges[monthKey]?.length > 0;

  return (
    <div>
      {hasRange && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => {
              setRanges((prev) => ({ ...prev, [monthKey]: [] }));
              setDragStart(null);
              setDragEnd(null);
            }}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear Selection
          </button>
        </div>
      )}

      <div className="grid grid-cols-7 text-xs text-gray-500 mb-3">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2" onMouseUp={handleMouseUp}>
        {days.map((day, idx) => {
          const fullDate = day ? formatDate(day) : null;
          const note = fullDate && notesMap[fullDate];

          const inDrag =
            day &&
            dragStart &&
            dragEnd &&
            day >= Math.min(dragStart, dragEnd) &&
            day <= Math.max(dragStart, dragEnd);

          const isSaved = day && ranges[monthKey]?.includes(day);

          return (
            <DayCell
              key={idx}
              day={day}
              onClick={() => handleClick(day)}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              hasNote={note}
              isToday={day === todayDay}
              isInRange={inDrag || isSaved}
            />
          );
        })}
      </div>

      {selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-xl w-80">
            <h3 className="font-semibold mb-2">Date: {selectedDate}</h3>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border rounded p-2 mb-3"
              placeholder="Write your note..."
            />

            <div className="flex gap-2 mb-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-6 h-6 rounded-full ${COLOR_MAP[c]} ${
                    selectedColor === c ? "ring-2 ring-black" : ""
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              {notesMap[selectedDate] && (
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              )}

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setSelectedDate(null)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {notesMap[selectedDate] ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
