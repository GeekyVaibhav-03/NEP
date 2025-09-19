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
import BookIcon from "@mui/icons-material/Book";
import GradeIcon from "@mui/icons-material/Grade";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MessageIcon from "@mui/icons-material/Message";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import WeekGrid from "../components/WeekGrid.jsx";
// import AIVoiceAssistant from "../components/AIVoiceAssistant.jsx";
import http from "../services/http.js";
import {
  generateDemoStudentTimetable,
  generateDemoUpcomingClasses,
  generateDemoAssignments,
} from "../services/demoTimetable.js";
import { TimetableExportService } from "../services/timetableExport.js";

gsap.registerPlugin(ScrollTrigger);

export default function StudentDashboard() {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    enrolledCourses: 8,
    completedAssignments: 24,
    upcomingClasses: 12,
    gpa: 3.8,
    attendance: 94,
    creditsEarned: 45,
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
      // Load demo timetable data instead of fetching from API
      const demoTimetable = generateDemoStudentTimetable();
      setTimetables([demoTimetable]);

      // Enhanced student-specific data
      setMyCourses([
        {
          id: "C1",
          name: "Advanced Calculus",
          code: "MATH401",
          instructor: "Dr. Smith",
          credits: 4,
          room: "Room 201",
          time: "Mon-Wed-Fri 9:00-10:00",
          progress: 85,
          grade: "A-",
          nextClass: "Tomorrow 9:00 AM",
          attendance: 96,
        },
        {
          id: "C2",
          name: "Data Structures",
          code: "CS301",
          instructor: "Dr. Johnson",
          credits: 3,
          room: "Lab 105",
          time: "Tue-Thu 2:00-3:30",
          progress: 78,
          grade: "B+",
          nextClass: "Today 2:00 PM",
          attendance: 89,
        },
        {
          id: "C3",
          name: "Physics II",
          code: "PHYS201",
          instructor: "Dr. Williams",
          credits: 4,
          room: "Room 310",
          time: "Mon-Wed-Fri 11:00-12:00",
          progress: 92,
          grade: "A",
          nextClass: "Today 11:00 AM",
          attendance: 98,
        },
        {
          id: "C4",
          name: "English Literature",
          code: "ENG202",
          instructor: "Prof. Davis",
          credits: 3,
          room: "Room 115",
          time: "Tue-Thu 10:00-11:30",
          progress: 67,
          grade: "B",
          nextClass: "Thursday 10:00 AM",
          attendance: 85,
        },
        {
          id: "C5",
          name: "Chemistry Lab",
          code: "CHEM201L",
          instructor: "Dr. Brown",
          credits: 2,
          room: "Lab 301",
          time: "Friday 1:00-4:00",
          progress: 73,
          grade: "B+",
          nextClass: "Friday 1:00 PM",
          attendance: 92,
        },
        {
          id: "C6",
          name: "Statistics",
          code: "STAT301",
          instructor: "Dr. Wilson",
          credits: 3,
          room: "Room 205",
          time: "Mon-Wed 3:00-4:30",
          progress: 88,
          grade: "A-",
          nextClass: "Monday 3:00 PM",
          attendance: 94,
        },
        {
          id: "C7",
          name: "Philosophy",
          code: "PHIL101",
          instructor: "Prof. Taylor",
          credits: 3,
          room: "Room 120",
          time: "Tue-Thu 4:00-5:30",
          progress: 81,
          grade: "A-",
          nextClass: "Tuesday 4:00 PM",
          attendance: 90,
        },
        {
          id: "C8",
          name: "Art History",
          code: "ART201",
          instructor: "Prof. Anderson",
          credits: 2,
          room: "Room 180",
          time: "Wednesday 2:00-4:00",
          progress: 75,
          grade: "B+",
          nextClass: "Wednesday 2:00 PM",
          attendance: 87,
        },
      ]);

      // Load demo assignments
      const demoAssignments = generateDemoAssignments();
      setUpcomingAssignments(demoAssignments);

      // Load demo upcoming classes
      const demoUpcomingClasses = generateDemoUpcomingClasses(true);
      setMySchedule(demoUpcomingClasses);

      setNotifications([
        {
          id: 1,
          type: "assignment",
          title: "New Assignment Posted",
          message: "Calculus Problem Set 8 has been posted in MATH401",
          time: "30 minutes ago",
          read: false,
        },
        {
          id: 2,
          type: "grade",
          title: "Grade Published",
          message: "Your Physics Lab Report grade is now available",
          time: "2 hours ago",
          read: false,
        },
        {
          id: 3,
          type: "schedule",
          title: "Class Cancelled",
          message: "Tomorrow's English Literature class has been cancelled",
          time: "4 hours ago",
          read: true,
        },
        {
          id: 4,
          type: "announcement",
          title: "Campus Event",
          message: "Science Fair registration is now open",
          time: "1 day ago",
          read: true,
        },
      ]);

      // Mock schedule data
      setMySchedule([
        {
          day: "Monday",
          time: "09:00-10:00",
          subject: "Advanced Calculus",
          room: "Room 201",
          instructor: "Dr. Smith",
        },
        {
          day: "Monday",
          time: "11:00-12:00",
          subject: "Physics II",
          room: "Room 310",
          instructor: "Dr. Williams",
        },
        {
          day: "Monday",
          time: "15:00-16:30",
          subject: "Statistics",
          room: "Room 205",
          instructor: "Dr. Wilson",
        },
        {
          day: "Tuesday",
          time: "10:00-11:30",
          subject: "English Literature",
          room: "Room 115",
          instructor: "Prof. Davis",
        },
        {
          day: "Tuesday",
          time: "14:00-15:30",
          subject: "Data Structures",
          room: "Lab 105",
          instructor: "Dr. Johnson",
        },
        {
          day: "Tuesday",
          time: "16:00-17:30",
          subject: "Philosophy",
          room: "Room 120",
          instructor: "Prof. Taylor",
        },
        {
          day: "Wednesday",
          time: "09:00-10:00",
          subject: "Advanced Calculus",
          room: "Room 201",
          instructor: "Dr. Smith",
        },
        {
          day: "Wednesday",
          time: "11:00-12:00",
          subject: "Physics II",
          room: "Room 310",
          instructor: "Dr. Williams",
        },
        {
          day: "Wednesday",
          time: "14:00-16:00",
          subject: "Art History",
          room: "Room 180",
          instructor: "Prof. Anderson",
        },
        {
          day: "Wednesday",
          time: "15:00-16:30",
          subject: "Statistics",
          room: "Room 205",
          instructor: "Dr. Wilson",
        },
        {
          day: "Thursday",
          time: "10:00-11:30",
          subject: "English Literature",
          room: "Room 115",
          instructor: "Prof. Davis",
        },
        {
          day: "Thursday",
          time: "14:00-15:30",
          subject: "Data Structures",
          room: "Lab 105",
          instructor: "Dr. Johnson",
        },
        {
          day: "Thursday",
          time: "16:00-17:30",
          subject: "Philosophy",
          room: "Room 120",
          instructor: "Prof. Taylor",
        },
        {
          day: "Friday",
          time: "09:00-10:00",
          subject: "Advanced Calculus",
          room: "Room 201",
          instructor: "Dr. Smith",
        },
        {
          day: "Friday",
          time: "11:00-12:00",
          subject: "Physics II",
          room: "Room 310",
          instructor: "Dr. Williams",
        },
        {
          day: "Friday",
          time: "13:00-16:00",
          subject: "Chemistry Lab",
          room: "Lab 301",
          instructor: "Dr. Brown",
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
    "check assignments",
    "see today's schedule",
    "track my grades",
    "check attendance",
    "get study reminders",
    "view notifications",
  ];

  const getScheduleForToday = () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return mySchedule.filter((item) => item.day === today);
  };

  const getUpcomingAssignments = () => {
    return upcomingAssignments
      .filter((assignment) => assignment.status !== "completed")
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  };

  // Export functionality
  const handleExportToExcel = () => {
    if (timetables.length > 0) {
      try {
        const filename = TimetableExportService.exportToExcel(
          timetables[0],
          "student_timetable",
          true
        );
        console.log(`Timetable exported to Excel: ${filename}`);
        // You could add a toast notification here
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        // You could add an error toast notification here
      }
    }
  };

  const handleExportToPDF = () => {
    if (timetables.length > 0) {
      try {
        const filename = TimetableExportService.exportToPDF(
          timetables[0],
          "student_timetable",
          true
        );
        console.log(`Timetable exported to PDF: ${filename}`);
        // You could add a toast notification here
      } catch (error) {
        console.error("Error exporting to PDF:", error);
        // You could add an error toast notification here
      }
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-orange-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      case "low":
        return "from-green-500 to-emerald-500";
      default:
        return "from-blue-500 to-indigo-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                    <PersonIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Student Dashboard
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <AutoAwesomeIcon fontSize="small" />
                    Welcome back, <strong>{user?.name || "Student"}</strong> -
                    Your Academic Journey Hub
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/assignments"
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <AssignmentIcon className="group-hover:rotate-12 transition-transform duration-300" />
                    Assignments
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <BookIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.enrolledCourses}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Enrolled Courses
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircleIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.completedAssignments}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Completed Tasks
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
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
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <StarIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.gpa}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Current GPA
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                style={{ width: "95%" }}
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
                style={{ width: "94%" }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <AssessmentIcon className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.creditsEarned}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Credits Earned
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Today's Schedule & Assignments */}
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
                    Today's Classes
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your schedule today
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
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">
                          {item.subject}
                        </p>
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                        {item.instructor}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
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

            {/* Upcoming Assignments */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <AssignmentIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Due Soon
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {getUpcomingAssignments().length} pending
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {getUpcomingAssignments().map((assignment) => {
                  const daysUntil = getDaysUntilDue(assignment.dueDate);
                  return (
                    <div
                      key={assignment.id}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                        daysUntil <= 1
                          ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800"
                          : daysUntil <= 3
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800"
                          : "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">
                            {assignment.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {assignment.course}
                          </p>
                        </div>
                        <div
                          className={`p-1 rounded-lg ${
                            assignment.priority === "high"
                              ? "bg-red-500"
                              : assignment.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`font-medium ${
                            daysUntil <= 1
                              ? "text-red-600 dark:text-red-400"
                              : daysUntil <= 3
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {daysUntil === 0
                            ? "Due Today"
                            : daysUntil === 1
                            ? "Due Tomorrow"
                            : `Due in ${daysUntil} days`}
                        </span>
                        <span className="text-slate-500 dark:text-slate-500">
                          {assignment.progress}% done
                        </span>
                      </div>
                      {assignment.progress > 0 && (
                        <div className="mt-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1">
                          <div
                            className={`bg-gradient-to-r ${getPriorityColor(
                              assignment.priority
                            )} h-1 rounded-full transition-all duration-1000`}
                            style={{ width: `${assignment.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Column - Courses & Schedule */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
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
                    Track your academic progress
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <div className="col-span-2 text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
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
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {course.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {course.code} • {course.credits} credits
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold mb-1 ${
                              course.grade.startsWith("A")
                                ? "text-green-600 dark:text-green-400"
                                : course.grade.startsWith("B")
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {course.grade}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {course.attendance}% attendance
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
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="text-sm space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Instructor:
                            </span>
                            <span className="text-slate-900 dark:text-white">
                              {course.instructor}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Schedule:
                            </span>
                            <span className="text-slate-900 dark:text-white">
                              {course.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">
                              Room:
                            </span>
                            <span className="text-slate-900 dark:text-white">
                              {course.room}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Next Class:
                            </span>
                            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                      <CalendarMonthIcon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Weekly Schedule
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Your complete class timetable
                      </p>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportToExcel}
                      className="group flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      title="Export to Excel"
                    >
                      <TableViewIcon className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium">Excel</span>
                    </button>

                    <button
                      onClick={handleExportToPDF}
                      className="group flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      title="Export to PDF"
                    >
                      <PictureAsPdfIcon className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium">PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <WeekGrid slots={mySchedule} />
              </div>
            </div>
          </div>

          {/* Right Column - Notifications & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Notifications */}
            <div
              ref={(el) => (cardsRef.current[4] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
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
                        ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
                        : "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "assignment"
                            ? "bg-blue-500"
                            : notification.type === "grade"
                            ? "bg-green-500"
                            : notification.type === "schedule"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
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
                    Study tools
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <AssignmentIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Submit Assignment
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                    <GradeIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Check Grades
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                    <BookIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Study Materials
                  </span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/40 dark:hover:to-red-900/40 transition-all duration-300 group">
                  <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageIcon className="text-white text-sm" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Contact Professor
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Voice Assistant */}
      {/* <AIVoiceAssistant 
        pageName="Student Dashboard"
        features={voiceFeatures}
      /> */}
    </div>
  );
}
