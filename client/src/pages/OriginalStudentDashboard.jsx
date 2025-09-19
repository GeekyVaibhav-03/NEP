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
import BookIcon from "@mui/icons-material/Book";
import GradeIcon from "@mui/icons-material/Grade";
import WeekGrid from "../components/WeekGrid.jsx";
import http from "../services/http.js";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);

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

      // Mock student-specific data
      setMyCourses([
        {
          id: "C1",
          name: "Mathematics",
          code: "MATH101",
          instructor: "Dr. Alice Johnson",
          credits: 3,
          grade: "A-",
        },
        {
          id: "C2",
          name: "Physics",
          code: "PHYS201",
          instructor: "Prof. Bob Smith",
          credits: 4,
          grade: "B+",
        },
        {
          id: "C3",
          name: "Chemistry",
          code: "CHEM301",
          instructor: "Dr. Carol Lee",
          credits: 3,
          grade: "A",
        },
        {
          id: "C4",
          name: "Computer Science",
          code: "CS101",
          instructor: "Dr. David Wilson",
          credits: 3,
          grade: "B",
        },
      ]);

      setMySchedule([
        {
          day: "Mon",
          time: "09:00",
          course: "Mathematics",
          room: "LH-101",
          instructor: "Dr. Alice Johnson",
        },
        {
          day: "Mon",
          time: "14:00",
          course: "Physics",
          room: "Lab-201",
          instructor: "Prof. Bob Smith",
        },
        {
          day: "Tue",
          time: "10:00",
          course: "Chemistry",
          room: "Lab-301",
          instructor: "Dr. Carol Lee",
        },
        {
          day: "Wed",
          time: "11:00",
          course: "Computer Science",
          room: "LH-102",
          instructor: "Dr. David Wilson",
        },
        {
          day: "Thu",
          time: "13:00",
          course: "Mathematics",
          room: "LH-101",
          instructor: "Dr. Alice Johnson",
        },
        {
          day: "Fri",
          time: "15:00",
          course: "Physics",
          room: "LH-102",
          instructor: "Prof. Bob Smith",
        },
      ]);

      setUpcomingAssignments([
        {
          id: "A1",
          course: "Mathematics",
          title: "Calculus Assignment",
          dueDate: "2025-09-15",
          type: "Assignment",
        },
        {
          id: "A2",
          course: "Physics",
          title: "Lab Report",
          dueDate: "2025-09-18",
          type: "Lab Report",
        },
        {
          id: "A3",
          course: "Chemistry",
          title: "Mid-term Exam",
          dueDate: "2025-09-20",
          type: "Exam",
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

  const totalCredits = myCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const gpa = 3.7; // Mock GPA

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Student Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Welcome back, {user?.name || "Student"}!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <AddCircleOutlineIcon fontSize="small" /> View Timetable
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300/60 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <QueryStatsIcon fontSize="small" /> Home
          </Link>
        </div>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookIcon className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                Enrolled Courses
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
              <GradeIcon className="text-green-600 dark:text-green-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                Total Credits
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {totalCredits}
              </div>
            </div>
          </div>
        </div>

        <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <GradeIcon className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium">
                Current GPA
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {gpa.toFixed(1)}
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
                Assignments Due
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {upcomingAssignments.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <BookIcon /> My Courses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {course.code} • {course.credits} credits
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {course.instructor}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.grade.startsWith("A")
                      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      : course.grade.startsWith("B")
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                  }`}
                >
                  {course.grade}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  Current Grade
                </span>
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
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
                  Instructor
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
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {slot.instructor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <AssignmentIcon /> Upcoming Assignments
        </h3>
        <div className="space-y-3">
          {upcomingAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    assignment.type === "Exam"
                      ? "bg-red-100 dark:bg-red-900/20"
                      : assignment.type === "Lab Report"
                      ? "bg-green-100 dark:bg-green-900/20"
                      : "bg-blue-100 dark:bg-blue-900/20"
                  }`}
                >
                  <AssignmentIcon
                    className={`text-sm ${
                      assignment.type === "Exam"
                        ? "text-red-600 dark:text-red-400"
                        : assignment.type === "Lab Report"
                        ? "text-green-600 dark:text-green-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    {assignment.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {assignment.course} • Due:{" "}
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assignment.type === "Exam"
                    ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                    : assignment.type === "Lab Report"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    : "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                }`}
              >
                {assignment.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timetable Preview */}
      <div className="db-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarMonthIcon /> My Timetable
        </h3>
        <WeekGrid slots={previewSlots} />
      </div>
    </div>
  );
}
