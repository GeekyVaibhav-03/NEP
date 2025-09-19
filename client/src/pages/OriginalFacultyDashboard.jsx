import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { gsap } from "gsap";
import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ClassIcon from "@mui/icons-material/Class";
import WeekGrid from "../components/WeekGrid.jsx";
import http from "../services/http.js";

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);

  useEffect(() => {
    gsap.from(".db-card", {
      opacity: 0,
      y: 12,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await http.get("/api/timetable/list");
      setTimetables(res.data.list || []);

      // Mock faculty-specific data
      setMyCourses([
        {
          id: "C1",
          name: "Mathematics",
          code: "MATH101",
          students: 45,
          hours: 12,
        },
        { id: "C2", name: "Physics", code: "PHYS201", students: 38, hours: 10 },
        {
          id: "C3",
          name: "Chemistry",
          code: "CHEM301",
          students: 32,
          hours: 8,
        },
      ]);

      setMySchedule([
        {
          day: "Mon",
          time: "09:00",
          course: "Mathematics",
          room: "LH-101",
          type: "Lecture",
        },
        {
          day: "Mon",
          time: "14:00",
          course: "Physics",
          room: "Lab-201",
          type: "Lab",
        },
        {
          day: "Tue",
          time: "10:00",
          course: "Chemistry",
          room: "Lab-301",
          type: "Lab",
        },
        {
          day: "Wed",
          time: "11:00",
          course: "Mathematics",
          room: "LH-101",
          type: "Lecture",
        },
        {
          day: "Thu",
          time: "13:00",
          course: "Physics",
          room: "LH-102",
          type: "Tutorial",
        },
      ]);
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setLoading(false);
    }
  };

  const latestTimetable =
    timetables.length > 0 ? timetables[timetables.length - 1] : null;
  const previewSlots = latestTimetable ? latestTimetable.timetable.flat : [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Faculty Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Welcome back, Professor {user?.name || "Faculty Member"}!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <AddCircleOutlineIcon fontSize="small" /> Generate Timetable
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300/60 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <QueryStatsIcon fontSize="small" /> Home
          </Link>
        </div>
      </div>

      {/* Faculty Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ClassIcon className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                My Courses
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {myCourses.length}
              </div>
            </div>
          </div>
        </div>

        <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <GroupsIcon className="text-green-600 dark:text-green-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                Total Students
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {myCourses.reduce((sum, course) => sum + course.students, 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <ScheduleIcon className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                Weekly Hours
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {myCourses.reduce((sum, course) => sum + course.hours, 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <AssignmentIcon className="text-orange-600 dark:text-orange-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                Timetables
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {timetables.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <ClassIcon /> My Courses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-4 border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {course.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {course.code}
                  </p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/20 px-2 py-1 rounded text-xs font-medium text-indigo-700 dark:text-indigo-300">
                  {course.hours}h/week
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  {course.students} students
                </span>
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <ScheduleIcon /> This Week's Schedule
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-600">
                <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Day
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Time
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Course
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Room
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {mySchedule.map((slot, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                    {slot.day}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {slot.time}
                  </td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white">
                    {slot.course}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {slot.room}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        slot.type === "Lecture"
                          ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : slot.type === "Lab"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                          : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      {slot.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timetable Preview */}
      <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarMonthIcon /> Timetable Preview
        </h3>
        <WeekGrid slots={previewSlots} />
      </div>
    </div>
  );
}
