import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import WeekGrid from "../components/WeekGrid.jsx";
import http from "../services/http.js";
import LandingPage from "./LandingPage.jsx";
import AIVoiceAssistant from "../components/AIVoiceAssistant.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTimetables: 0,
    totalCourses: 0,
    facultyMembers: 38,
    conflictsDetected: 0,
    efficiency: 94,
    satisfaction: 4.8,
    thisWeekGenerated: 3,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);

  // Show landing page for non-authenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Redirect based on user type
  if (user?.userType === "faculty") {
    return <Navigate to="/faculty" replace />;
  }
  if (user?.userType === "student") {
    return <Navigate to="/student" replace />;
  }

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

    // Floating animation for decorative elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    });

    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const res = await http.get("/api/timetable/list");
      const timetableList = res.data.list || [];
      setTimetables(timetableList);

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalTimetables: timetableList.length,
        totalCourses:
          timetableList.length > 0
            ? timetableList[timetableList.length - 1].timetable.flat.length
            : 0,
      }));

      // Generate recent activity
      const activities = timetableList
        .slice(-5)
        .reverse()
        .map((tt, index) => ({
          id: tt.id,
          action: `Generated timetable for ${tt.options.domain} (${tt.options.role})`,
          time: new Date(tt.createdAt).toLocaleString(),
          type: index === 0 ? "success" : "info",
        }));
      setRecentActivity(activities);
    } catch (e) {
      console.error("Failed to fetch timetables:", e);
    } finally {
      setLoading(false);
    }
  };

  // Get the latest timetable for preview
  const latestTimetable =
    timetables.length > 0 ? timetables[timetables.length - 1] : null;
  const previewSlots = latestTimetable ? latestTimetable.timetable.flat : [];

  // Demo data for workload visualization
  const workload = [
    { name: "Dr. Smith", hours: 8, efficiency: 92 },
    { name: "Dr. Johnson", hours: 10, efficiency: 88 },
    { name: "Dr. Williams", hours: 6, efficiency: 95 },
    { name: "Dr. Brown", hours: 9, efficiency: 90 },
    { name: "Dr. Davis", hours: 7, efficiency: 87 },
  ];
  const maxHours = Math.max(...workload.map((w) => w.hours));

  const voiceFeatures = [
    "generate timetables",
    "view analytics",
    "check faculty workload",
    "manage schedules",
    "export reports",
    "get AI insights",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                    <DashboardIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <AutoAwesomeIcon fontSize="small" />
                    Welcome back,{" "}
                    <strong>{user?.name || "Administrator"}</strong> -
                    AI-Powered Management System
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/generator"
                  className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <AddCircleOutlineIcon className="group-hover:rotate-90 transition-transform duration-300" />
                    New Timetable
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <GridViewIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {loading ? "..." : stats.totalTimetables}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Generated Timetables
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              +12% from last month
            </p>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <SchoolIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {loading ? "..." : stats.totalCourses}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Courses
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Active this semester
            </p>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <GroupsIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stats.facultyMembers}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Faculty Members
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              All departments
            </p>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <WarningAmberIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stats.conflictsDetected}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Conflicts Detected
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                style={{ width: "5%" }}
              ></div>
            </div>
            <p className="text-xs text-green-500 mt-2">
              Excellent! 98% conflict-free
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Analytics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions Card */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                  <ScheduleIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Quick Actions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Streamlined operations
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/generator"
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <AddCircleOutlineIcon className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      Generate Timetable
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Create AI-optimized schedules
                    </p>
                  </div>
                </Link>

                <Link
                  to="/analytics"
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-300 group"
                >
                  <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                    <AnalyticsIcon className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      View Analytics
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Performance insights
                    </p>
                  </div>
                </Link>

                <Link
                  to="/reports"
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 transition-all duration-300 group"
                >
                  <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                    <AssessmentIcon className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      Generate Reports
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Export & analyze data
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <NotificationsIcon className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>

              <div className="space-y-4 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Loading activity...
                    </p>
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <EventIcon className="text-4xl text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No recent activity
                    </p>
                  </div>
                ) : (
                  recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Faculty Workload Overview */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                  <PeopleIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Faculty Workload Overview
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Real-time teaching hours distribution
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                    Current Week Distribution
                  </h4>
                  <div className="space-y-4">
                    {workload.map(({ name, hours, efficiency }) => {
                      const width = Math.round((hours / maxHours) * 100);
                      return (
                        <div
                          key={name}
                          className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {hours}h
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  efficiency >= 90
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                    : efficiency >= 85
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                }`}
                              >
                                {efficiency}%
                              </span>
                            </div>
                          </div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Average Efficiency
                        </span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          90.4%
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "90.4%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Optimal Distribution
                        </span>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          87%
                        </span>
                      </div>
                      <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "87%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Satisfaction Score
                        </span>
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          4.8/5
                        </span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timetable Preview */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                    <CalendarMonthIcon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Latest Timetable Preview
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Interactive schedule visualization
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {previewSlots.length > 0 ? (
                  <WeekGrid slots={previewSlots} />
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                      <CalendarMonthIcon className="text-4xl text-slate-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      No Timetables Generated Yet
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Create your first AI-optimized timetable to see the
                      preview here
                    </p>
                    <Link
                      to="/generator"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <AddCircleOutlineIcon />
                      Generate Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Voice Assistant */}
      <AIVoiceAssistant pageName="Admin Dashboard" features={voiceFeatures} />
    </div>
  );
}
