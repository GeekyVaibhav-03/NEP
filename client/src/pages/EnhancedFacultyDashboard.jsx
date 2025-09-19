import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GradeIcon from "@mui/icons-material/Grade";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MessageIcon from "@mui/icons-material/Message";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WeekGrid from "../components/WeekGrid.jsx";
import AIVoiceAssistant from "../components/AIVoiceAssistant.jsx";
import http from "../services/http.js";

gsap.registerPlugin(ScrollTrigger);

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 6,
    totalStudents: 280,
    upcomingClasses: 8,
    avgRating: 4.7,
    attendance: 92,
    completedHours: 156,
  });

  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Stats cards animation
    gsap.from(statsRef.current?.children, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
    });

    // Content cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      }
    });

    // Floating animation
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    });

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await http.get("/api/timetable/list");
      setTimetables(res.data.list || []);

      // Enhanced faculty-specific data
      setMyCourses([
        {
          id: "C1",
          name: "Advanced Mathematics",
          code: "MATH401",
          students: 45,
          hours: 12,
          room: "Room 101",
          time: "Mon-Wed-Fri 10:00-11:00",
          progress: 78,
          rating: 4.8,
          nextClass: "Tomorrow 10:00 AM",
        },
        {
          id: "C2",
          name: "Linear Algebra",
          code: "MATH301",
          students: 38,
          hours: 10,
          room: "Room 205",
          time: "Tue-Thu 2:00-3:30",
          progress: 65,
          rating: 4.6,
          nextClass: "Today 2:00 PM",
        },
        {
          id: "C3",
          name: "Calculus II",
          code: "MATH201",
          students: 52,
          hours: 15,
          room: "Room 310",
          time: "Mon-Wed-Fri 1:00-2:00",
          progress: 82,
          rating: 4.9,
          nextClass: "Today 1:00 PM",
        },
        {
          id: "C4",
          name: "Statistics",
          code: "STAT101",
          students: 41,
          hours: 8,
          room: "Room 112",
          time: "Tue-Thu 11:00-12:30",
          progress: 55,
          rating: 4.5,
          nextClass: "Thursday 11:00 AM",
        },
        {
          id: "C5",
          name: "Research Methods",
          code: "RSCH301",
          students: 28,
          hours: 6,
          room: "Lab 205",
          time: "Friday 3:00-5:00",
          progress: 40,
          rating: 4.7,
          nextClass: "Friday 3:00 PM",
        },
        {
          id: "C6",
          name: "Applied Mathematics",
          code: "MATH501",
          students: 35,
          hours: 14,
          room: "Room 408",
          time: "Mon-Wed 3:00-4:30",
          progress: 90,
          rating: 4.8,
          nextClass: "Monday 3:00 PM",
        },
      ]);

      setNotifications([
        {
          id: 1,
          type: "urgent",
          title: "Class Schedule Change",
          message: "MATH401 moved to Room 205 for today's session",
          time: "5 minutes ago",
          read: false,
        },
        {
          id: 2,
          type: "info",
          title: "Assignment Submissions",
          message: "12 new submissions for Linear Algebra homework",
          time: "1 hour ago",
          read: false,
        },
        {
          id: 3,
          type: "success",
          title: "Performance Update",
          message: "Your average student rating increased to 4.7/5",
          time: "2 hours ago",
          read: true,
        },
        {
          id: 4,
          type: "reminder",
          title: "Faculty Meeting",
          message: "Department meeting scheduled for tomorrow 3:00 PM",
          time: "3 hours ago",
          read: true,
        },
      ]);

      // Mock schedule data
      setMySchedule([
        {
          day: "Monday",
          time: "10:00-11:00",
          subject: "Advanced Mathematics",
          room: "Room 101",
        },
        {
          day: "Monday",
          time: "15:00-16:30",
          subject: "Applied Mathematics",
          room: "Room 408",
        },
        {
          day: "Tuesday",
          time: "14:00-15:30",
          subject: "Linear Algebra",
          room: "Room 205",
        },
        {
          day: "Tuesday",
          time: "11:00-12:30",
          subject: "Statistics",
          room: "Room 112",
        },
        {
          day: "Wednesday",
          time: "10:00-11:00",
          subject: "Advanced Mathematics",
          room: "Room 101",
        },
        {
          day: "Wednesday",
          time: "13:00-14:00",
          subject: "Calculus II",
          room: "Room 310",
        },
        {
          day: "Wednesday",
          time: "15:00-16:30",
          subject: "Applied Mathematics",
          room: "Room 408",
        },
        {
          day: "Thursday",
          time: "14:00-15:30",
          subject: "Linear Algebra",
          room: "Room 205",
        },
        {
          day: "Thursday",
          time: "11:00-12:30",
          subject: "Statistics",
          room: "Room 112",
        },
        {
          day: "Friday",
          time: "10:00-11:00",
          subject: "Advanced Mathematics",
          room: "Room 101",
        },
        {
          day: "Friday",
          time: "13:00-14:00",
          subject: "Calculus II",
          room: "Room 310",
        },
        {
          day: "Friday",
          time: "15:00-17:00",
          subject: "Research Methods",
          room: "Lab 205",
        },
      ]);
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setLoading(false);
    }
  };

  const voiceFeatures = [
    "view my courses",
    "check today's schedule",
    "see student progress",
    "manage assignments",
    "track attendance",
    "get performance analytics",
    "check notifications",
  ];

  const getScheduleForToday = () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return mySchedule.filter((item) => item.day === today);
  };

  const getUpcomingClasses = () => {
    return myCourses
      .filter(
        (course) => course.nextClass && course.nextClass.includes("Today")
      )
      .sort((a, b) => a.nextClass.localeCompare(b.nextClass));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
                    <PersonIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Faculty Dashboard
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <AutoAwesomeIcon fontSize="small" />
                    Welcome back,{" "}
                    <strong>Dr. {user?.name || "Faculty Member"}</strong> -
                    Smart Teaching Hub
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/generator"
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <AddCircleOutlineIcon className="group-hover:rotate-90 transition-transform duration-300" />
                    New Schedule
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-xl text-slate-700 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <QueryStatsIcon />
                    Home
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12"
        >
          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <BookIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalCourses}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  My Courses
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <PeopleAltIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalStudents}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Students
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <EventIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.upcomingClasses}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Upcoming Classes
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <GradeIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.avgRating}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Avg Rating
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                style={{ width: "94%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUpIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.attendance}%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Attendance
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <AccessTimeIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.completedHours}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Hours Taught
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Today's Schedule & Notifications */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Schedule */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <ScheduleIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Today's Schedule
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your classes today
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {getScheduleForToday().length > 0 ? (
                  getScheduleForToday().map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {item.subject}
                        </p>
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.room}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarMonthIcon className="text-4xl text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No classes scheduled for today
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <NotificationsIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {notifications.filter((n) => !n.read).length} unread
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      !notification.read
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800"
                        : "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "urgent"
                            ? "bg-red-500"
                            : notification.type === "info"
                            ? "bg-blue-500"
                            : notification.type === "success"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - My Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <ClassIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    My Courses
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Manage your teaching assignments
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <div className="col-span-2 text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Loading courses...
                    </p>
                  </div>
                ) : (
                  myCourses.map((course) => (
                    <div
                      key={course.id}
                      className="group p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {course.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {course.code}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <GradeIcon className="text-yellow-500 text-sm" />
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {course.rating}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {course.students} students
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">
                              Progress
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <AccessTimeIcon fontSize="small" />
                            <span>{course.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <EventIcon fontSize="small" />
                            <span>{course.room}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Next Class:
                            </span>
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {course.nextClass}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <CalendarMonthIcon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Weekly Schedule
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Your complete teaching schedule
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <WeekGrid slots={mySchedule} />
              </div>
            </div>
          </div>

          {/* Right Column - Analytics & Performance */}
          <div className="lg:col-span-1 space-y-6">
            {/* Performance Analytics */}
            <div
              ref={(el) => (cardsRef.current[4] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                  <AnalyticsIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Performance
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Teaching metrics
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Student Satisfaction
                    </span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {stats.avgRating}/5
                    </span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(stats.avgRating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Attendance Rate
                    </span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stats.attendance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Course Completion
                    </span>
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      78%
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              ref={(el) => (cardsRef.current[5] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                  <SmartToyIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Quick Actions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Streamlined tasks
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <AssignmentIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Create Assignment
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                    <TrendingUpIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Track Progress
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                    <AssessmentIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Generate Report
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/40 dark:hover:to-red-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Send Message
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Voice Assistant */}
      <AIVoiceAssistant pageName="Faculty Dashboard" features={voiceFeatures} />
    </div>
  );
}