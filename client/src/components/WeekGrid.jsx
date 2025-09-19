import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import RoomIcon from "@mui/icons-material/Room";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookIcon from "@mui/icons-material/Book";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

// Color schemes for different subjects
const getSubjectColor = (course) => {
  const colors = {
    Mathematics: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
    Physics: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
    Chemistry: "bg-gradient-to-br from-green-500 to-green-600 text-white",
    English: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
    Hindi: "bg-gradient-to-br from-red-500 to-red-600 text-white",
    Biology: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
    History: "bg-gradient-to-br from-amber-500 to-amber-600 text-white",
    Geography: "bg-gradient-to-br from-teal-500 to-teal-600 text-white",
    "Computer Science":
      "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white",
    Economics: "bg-gradient-to-br from-pink-500 to-pink-600 text-white",
  };

  // Find matching color or use default
  const matchedColor = Object.keys(colors).find((subject) =>
    course?.toLowerCase().includes(subject.toLowerCase())
  );

  return matchedColor
    ? colors[matchedColor]
    : "bg-gradient-to-br from-slate-500 to-slate-600 text-white";
};

export default function WeekGrid({ slots = [], onCellClick, type }) {
  const key = (d, h) => `${d}-${h}`;
  const map = new Map(slots.map((s) => [key(s.day, s.start), s]));

  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="p-3 sticky left-0 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <AccessTimeIcon className="text-slate-600 dark:text-slate-300 text-sm" />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  Time
                </span>
              </div>
            </th>
            {days.map((d) => (
              <th
                key={d}
                className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {d}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((h) => (
            <tr key={h}>
              <td className="p-3 font-medium text-slate-700 dark:text-slate-300 text-sm bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-center">
                  <div className="font-bold">{h}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {h === "12:00"
                      ? "Lunch"
                      : h >= "13:00"
                      ? "Afternoon"
                      : "Morning"}
                  </div>
                </div>
              </td>
              {days.map((d) => {
                const slot = map.get(key(d, h));
                return (
                  <td key={d} className="p-1">
                    {slot ? (
                      <div
                        className={`w-full h-24 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${getSubjectColor(
                          slot.course
                        )} p-3`}
                        onClick={() => onCellClick?.(d, h, slot)}
                        title={`${slot.course}\nFaculty: ${
                          slot.faculty
                        }\nRoom: ${slot.room}\nDuration: ${
                          slot.duration || "1 hour"
                        }`}
                      >
                        <div className="h-full flex flex-col justify-between">
                          <div>
                            <div className="font-bold text-sm truncate mb-1">
                              {slot.course}
                            </div>
                            <div className="flex items-center gap-1 text-xs opacity-90">
                              <PersonIcon className="text-xs" />
                              <span className="truncate">{slot.faculty}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs opacity-90">
                            <div className="flex items-center gap-1">
                              <RoomIcon className="text-xs" />
                              <span>{slot.room}</span>
                            </div>
                            <div className="text-xs">
                              {slot.courseCode || slot.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-24 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer flex items-center justify-center"
                        onClick={() => onCellClick?.(d, h, null)}
                        title="Empty slot - Click to add class"
                      >
                        <div className="text-center">
                          <div className="text-slate-400 dark:text-slate-500 text-xs">
                            Free
                          </div>
                          <div className="text-slate-300 dark:text-slate-600 text-2xl">
                            +
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
