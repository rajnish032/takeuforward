export default function DayCell({
  day,
  onClick,
  onMouseDown,
  onMouseEnter,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  hasNote,
  isInRange,
  isToday,
}) {
  if (!day) return <div />;

  return (
    <div
      data-day={day}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onTouchStart={() => onTouchStart(day)}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`
        touch-none select-none
        relative w-10 h-10 flex items-center justify-center
        cursor-pointer rounded-full
        transition-all duration-200 ease-in-out
        
        ${isInRange ? "bg-blue-400" : "hover:bg-blue-200"}
        ${isToday ? "ring-2 ring-blue-500 font-bold bg-white" : ""}
      `}
    >
      {day}

      {hasNote && (
        <span className="absolute bottom-1 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
    </div>
  );
}