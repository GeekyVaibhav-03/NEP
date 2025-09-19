import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import http from "../services/http.js";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import ClassIcon from "@mui/icons-material/Class";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BackupIcon from "@mui/icons-material/Backup";
import RestoreIcon from "@mui/icons-material/Restore";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReportIcon from "@mui/icons-material/Report";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingItem, setEditingItem] = useState(null);
  const adminRef = useRef(null);
  const [analytics, setAnalytics] = useState({
    totalHours: 0,
    averageClassSize: 0,
    roomUtilization: 0,
    facultyWorkload: 0,
  });
  const [notifications, setNotifications] = useState([]);
  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    emailNotifications: true,
    darkMode: false,
    maxClassSize: 60,
    workingHours: { start: "09:00", end: "17:00" },
  });
  const [importExportState, setImportExportState] = useState({
    importing: false,
    exporting: false,
    progress: 0,
  });

  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    department: "",
    maxHoursPerWeek: 10,
    specialization: "",
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    studentId: "",
    program: "",
    semester: 1,
    batch: "",
  });
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "lecture",
    capacity: 60,
    building: "",
    floor: "",
  });
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    credits: 3,
    department: "",
    semester: 1,
  });

  // Timetable generation state
  const [generatingTimetable, setGeneratingTimetable] = useState(false);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationSettings, setGenerationSettings] = useState({
    domain: "btech",
    year: 1,
    program: "Computer Science",
    generateDummyData: true,
    conflictResolution: "auto",
    optimizationLevel: "high",
  });

  useEffect(() => {
    fetchData();

    // Animate admin cards
    gsap.from(".admin-card", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [courRes, facRes, studRes, roomRes, ttRes] = await Promise.all([
        http.get("/api/timetable/courses"),
        http.get("/api/timetable/faculty"),
        http.get("/api/timetable/students"),
        http.get("/api/timetable/rooms"),
        http.get("/api/timetable/list"),
      ]);
      setCourses(courRes.data.courses || []);
      setFaculty(facRes.data.faculty || []);
      setStudents(studRes.data.students || []);
      setRooms(roomRes.data.rooms || []);
      setTimetables(ttRes.data.list || []);
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setLoading(false);
    }
  };

  const addFaculty = async () => {
    if (!newFaculty.name || !newFaculty.email) return;
    try {
      await http.post("/api/timetable/faculty", newFaculty);
      setNewFaculty({
        name: "",
        email: "",
        department: "",
        maxHoursPerWeek: 10,
        specialization: "",
      });
      fetchData();
    } catch (e) {
      console.error("Failed to add faculty:", e);
    }
  };

  const addStudent = async () => {
    if (!newStudent.name || !newStudent.email) return;
    try {
      await http.post("/api/timetable/students", newStudent);
      setNewStudent({
        name: "",
        email: "",
        studentId: "",
        program: "",
        semester: 1,
        batch: "",
      });
      fetchData();
    } catch (e) {
      console.error("Failed to add student:", e);
    }
  };

  const addRoom = async () => {
    if (!newRoom.name) return;
    try {
      await http.post("/api/timetable/rooms", newRoom);
      setNewRoom({
        name: "",
        type: "lecture",
        capacity: 60,
        building: "",
        floor: "",
      });
      fetchData();
    } catch (e) {
      console.error("Failed to add room:", e);
    }
  };

  const addCourse = async () => {
    if (!newCourse.name || !newCourse.code) return;
    try {
      await http.post("/api/timetable/courses", newCourse);
      setNewCourse({
        name: "",
        code: "",
        credits: 3,
        department: "",
        semester: 1,
      });
      fetchData();
    } catch (e) {
      console.error("Failed to add course:", e);
    }
  };

  const deleteItem = async (type, id) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      await http.delete(`/api/timetable/${type}/${id}`);
      fetchData();
    } catch (e) {
      console.error(`Failed to delete ${type}:`, e);
    }
  };

  const saveEdit = async (type, item) => {
    try {
      await http.put(`/api/timetable/${type}/${item.id}`, item);
      setEditingItem(null);
      fetchData();
    } catch (e) {
      console.error(`Failed to update ${type}:`, e);
    }
  };

  // Generate dummy timetable function
  const generateDummyTimetable = async () => {
    setGeneratingTimetable(true);
    setGenerationProgress(0);
    setGeneratedTimetable(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      const payload = {
        domain: generationSettings.domain,
        role: "student",
        program: generationSettings.program,
        year: generationSettings.year,
        generateDummyData: generationSettings.generateDummyData,
      };

      console.log("Generating dummy timetable with payload:", payload);

      const response = await http.post("/api/timetable/generate", payload);

      setTimeout(() => {
        console.log("Timetable generation response:", response.data);
        setGeneratedTimetable(response.data);
        setGenerationProgress(100);
        clearInterval(progressInterval);

        // Add to timetables list
        setTimetables((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: `Generated Timetable ${new Date().toLocaleDateString()}`,
            created: new Date().toISOString(),
            data: response.data,
            settings: generationSettings,
          },
        ]);

        // Show success notification
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "success",
            message: "Dummy timetable generated successfully!",
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 1000);
    } catch (error) {
      console.error("Failed to generate timetable:", error);
      console.error("Error details:", error.response?.data || error.message);
      clearInterval(progressInterval);
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "error",
          message: `Failed to generate timetable: ${
            error.response?.data?.error || error.message
          }`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setTimeout(() => {
        setGeneratingTimetable(false);
      }, 1500);
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg"
          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
      }`}
    >
      <Icon fontSize="small" />
      {label}
    </button>
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {timetables.slice(-5).map((tt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Timetable Generated
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {tt.options?.domain || "General"} -{" "}
                  {new Date(tt.createdAt).toLocaleDateString()}
                </p>
              </div>
              <CalendarMonthIcon className="text-indigo-600" />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Quick Stats
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-300">
              Average Faculty Hours
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {faculty.length > 0
                ? Math.round(
                    faculty.reduce(
                      (sum, f) => sum + (f.maxHoursPerWeek || 0),
                      0
                    ) / faculty.length
                  )
                : 0}
              h
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-300">
              Total Room Capacity
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {rooms.reduce((sum, r) => sum + (r.capacity || 0), 0)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-300">
              Total Credits
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {courses.reduce((sum, c) => sum + (c.credits || 0), 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacultyTab = () => (
    <div className="space-y-8">
      {/* Add Faculty Form */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <AddIcon />
          Add New Faculty
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Dr. John Smith"
              value={newFaculty.name}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="john.smith@university.edu"
              value={newFaculty.email}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Department
            </label>
            <input
              type="text"
              placeholder="Computer Science"
              value={newFaculty.department}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, department: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Specialization
            </label>
            <input
              type="text"
              placeholder="Machine Learning"
              value={newFaculty.specialization}
              onChange={(e) =>
                setNewFaculty({ ...newFaculty, specialization: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Max Hours/Week
            </label>
            <input
              type="number"
              min="1"
              max="40"
              value={newFaculty.maxHoursPerWeek}
              onChange={(e) =>
                setNewFaculty({
                  ...newFaculty,
                  maxHoursPerWeek: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addFaculty}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AddIcon fontSize="small" />
              Add Faculty
            </button>
          </div>
        </div>
      </div>

      {/* Faculty List */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Faculty Members ({faculty.length})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faculty.map((f) => (
            <div
              key={f.id}
              className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <SchoolIcon className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {f.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {f.email}
                    </p>
                    {f.department && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {f.department}
                      </p>
                    )}
                    {f.specialization && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                        {f.specialization}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    {f.maxHoursPerWeek}h/week
                  </span>
                  <button
                    onClick={() => deleteItem("faculty", f.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-8">
      {/* Add Student Form */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <AddIcon />
          Add New Student
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="john.doe@student.edu"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Student ID
            </label>
            <input
              type="text"
              placeholder="2025001"
              value={newStudent.studentId}
              onChange={(e) =>
                setNewStudent({ ...newStudent, studentId: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Program
            </label>
            <input
              type="text"
              placeholder="B.Tech Computer Science"
              value={newStudent.program}
              onChange={(e) =>
                setNewStudent({ ...newStudent, program: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Semester
            </label>
            <input
              type="number"
              min="1"
              max="8"
              value={newStudent.semester}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  semester: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addStudent}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AddIcon fontSize="small" />
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Students ({students.length})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {students.map((s) => (
            <div
              key={s.id}
              className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <GroupsIcon className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {s.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {s.email}
                    </p>
                    {s.studentId && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        ID: {s.studentId}
                      </p>
                    )}
                    {s.program && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                        {s.program}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    Sem {s.semester}
                  </span>
                  <button
                    onClick={() => deleteItem("students", s.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="space-y-8">
      {/* Add Course Form */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <AddIcon />
          Add New Course
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Data Structures and Algorithms"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Course Code
            </label>
            <input
              type="text"
              placeholder="CS301"
              value={newCourse.code}
              onChange={(e) =>
                setNewCourse({ ...newCourse, code: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Credits
            </label>
            <input
              type="number"
              min="1"
              max="6"
              value={newCourse.credits}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  credits: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Department
            </label>
            <input
              type="text"
              placeholder="Computer Science"
              value={newCourse.department}
              onChange={(e) =>
                setNewCourse({ ...newCourse, department: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Semester
            </label>
            <input
              type="number"
              min="1"
              max="8"
              value={newCourse.semester}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  semester: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addCourse}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AddIcon fontSize="small" />
              Add Course
            </button>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Courses ({courses.length})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div
              key={c.id}
              className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ClassIcon className="text-purple-600 dark:text-purple-400" />
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {c.name}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                    Code: {c.code}
                  </p>
                  {c.department && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      {c.department}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {c.credits} Credits
                    </span>
                    {c.semester && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                        Sem {c.semester}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteItem("courses", c.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoomsTab = () => (
    <div className="space-y-8">
      {/* Add Room Form */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <AddIcon />
          Add New Room
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Room Name
            </label>
            <input
              type="text"
              placeholder="Lecture Hall 1"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Room Type
            </label>
            <select
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="lecture">Lecture Hall</option>
              <option value="lab">Laboratory</option>
              <option value="tutorial">Tutorial Room</option>
              <option value="seminar">Seminar Room</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Capacity
            </label>
            <input
              type="number"
              min="1"
              max="500"
              value={newRoom.capacity}
              onChange={(e) =>
                setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Building
            </label>
            <input
              type="text"
              placeholder="Main Building"
              value={newRoom.building}
              onChange={(e) =>
                setNewRoom({ ...newRoom, building: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Floor
            </label>
            <input
              type="text"
              placeholder="2nd Floor"
              value={newRoom.floor}
              onChange={(e) =>
                setNewRoom({ ...newRoom, floor: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addRoom}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AddIcon fontSize="small" />
              Add Room
            </button>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Rooms ({rooms.length})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {rooms.map((r) => (
            <div
              key={r.id}
              className="border border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <MeetingRoomIcon className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {r.name}
                    </h4>
                    {r.building && (
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {r.building} - {r.floor}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          r.type === "lecture"
                            ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : r.type === "lab"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                            : r.type === "tutorial"
                            ? "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                            : "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {r.type}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                        {r.capacity} seats
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteItem("rooms", r.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-8">
      {/* Advanced Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUpIcon className="text-green-500" />
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Avg. Class Utilization
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-3/4"></div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  75%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Faculty Workload Balance
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 w-4/5"></div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  80%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Room Efficiency
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 w-5/6"></div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  83%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Statistics */}
        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <TimelineIcon className="text-indigo-500" />
            Real-time Data
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {timetables.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Active Timetables
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {faculty.reduce((sum, f) => sum + (f.maxHoursPerWeek || 0), 0)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Total Teaching Hours
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(
                  rooms.reduce((sum, r) => sum + (r.capacity || 0), 0) /
                    rooms.length || 0
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Avg. Room Capacity
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <AutoFixHighIcon className="text-orange-500" />
            AI Suggestions
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                Optimize Schedule
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Redistribute 3 classes for better balance
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Room Utilization
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Consolidate 2 small classes in Room A
              </div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Faculty Load
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                Balance workload for Prof. Smith
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Charts and Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
            Weekly Distribution
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <div key={day} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-cyan-500 rounded-t-lg mb-2 transition-all duration-500 hover:from-indigo-600 hover:to-cyan-600"
                  style={{ height: `${(index + 1) * 20 + 40}%` }}
                ></div>
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
            Department Distribution
          </h3>
          <div className="space-y-3">
            {["Computer Science", "Mathematics", "Physics", "Chemistry"].map(
              (dept, index) => (
                <div key={dept} className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    {dept}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          index === 0
                            ? "bg-gradient-to-r from-indigo-400 to-indigo-500"
                            : index === 1
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : index === 2
                            ? "bg-gradient-to-r from-purple-400 to-purple-500"
                            : "bg-gradient-to-r from-orange-400 to-orange-500"
                        }`}
                        style={{ width: `${(4 - index) * 20 + 20}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {(4 - index) * 5 + 10}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-8">
      {/* Report Generation */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <ReportIcon className="text-indigo-500" />
          Generate Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:shadow-lg transition-all duration-300">
            <AssignmentIcon className="text-indigo-600 dark:text-indigo-400 text-2xl mb-2" />
            <div className="font-medium text-slate-900 dark:text-white">
              Faculty Workload
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Detailed teaching hours analysis
            </div>
          </button>

          <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
            <ClassIcon className="text-green-600 dark:text-green-400 text-2xl mb-2" />
            <div className="font-medium text-slate-900 dark:text-white">
              Room Utilization
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Space efficiency metrics
            </div>
          </button>

          <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
            <GroupsIcon className="text-purple-600 dark:text-purple-400 text-2xl mb-2" />
            <div className="font-medium text-slate-900 dark:text-white">
              Student Distribution
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Enrollment and attendance data
            </div>
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Recent Reports
        </h3>
        <div className="space-y-3">
          {[
            {
              name: "Weekly Faculty Report",
              date: "2025-01-15",
              size: "2.3 MB",
              type: "PDF",
            },
            {
              name: "Room Utilization Analysis",
              date: "2025-01-14",
              size: "1.8 MB",
              type: "Excel",
            },
            {
              name: "Student Enrollment Summary",
              date: "2025-01-13",
              size: "945 KB",
              type: "PDF",
            },
          ].map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <ReportIcon className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {report.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {report.date} • {report.size} • {report.type}
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImportExportTab = () => (
    <div className="space-y-8">
      {/* Import/Export Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <FileUploadIcon className="text-green-500" />
            Import Data
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
              <FileUploadIcon className="text-4xl text-slate-400 dark:text-slate-500 mb-4 mx-auto" />
              <div className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Drop files here or click to browse
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Supports CSV, Excel, and JSON formats
              </div>
              <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                Select Files
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all">
                <SchoolIcon className="text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  Import Faculty
                </div>
              </button>
              <button className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-md transition-all">
                <GroupsIcon className="text-green-600 dark:text-green-400 mb-2" />
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  Import Students
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <FileDownloadIcon className="text-indigo-500" />
            Export Data
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:shadow-lg transition-all duration-300">
                <div className="font-medium text-slate-900 dark:text-white mb-2">
                  Complete Database
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  All data in JSON format
                </div>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
                <div className="font-medium text-slate-900 dark:text-white mb-2">
                  Faculty Only
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  CSV spreadsheet
                </div>
              </button>
            </div>
            <button className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              <CloudSyncIcon className="mr-2" />
              Export All Data
            </button>
          </div>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <BackupIcon className="text-orange-500" />
          Backup & Restore
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-3">
              Automatic Backups
            </h4>
            <div className="space-y-2">
              {[
                {
                  name: "Daily Backup",
                  date: "Today, 3:00 AM",
                  size: "15.2 MB",
                },
                {
                  name: "Weekly Backup",
                  date: "Jan 14, 2025",
                  size: "58.7 MB",
                },
                {
                  name: "Monthly Backup",
                  date: "Jan 1, 2025",
                  size: "156.3 MB",
                },
              ].map((backup, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      {backup.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {backup.date} • {backup.size}
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm transition-colors">
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-3">
              Manual Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <BackupIcon fontSize="small" />
                Create Backup Now
              </button>
              <button className="w-full p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <RestoreIcon fontSize="small" />
                Restore from File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8">
      {/* System Settings */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="text-indigo-500" />
          System Configuration
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Maximum Class Size
              </label>
              <input
                type="number"
                min="10"
                max="200"
                value={systemSettings.maxClassSize}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    maxClassSize: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Working Hours
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={systemSettings.workingHours.start}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        workingHours: {
                          ...systemSettings.workingHours,
                          start: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={systemSettings.workingHours.end}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        workingHours: {
                          ...systemSettings.workingHours,
                          end: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    Auto Backup
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Automatically backup data daily
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.autoBackup}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        autoBackup: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    Email Notifications
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Receive updates via email
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.emailNotifications}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            <SaveIcon className="mr-2" fontSize="small" />
            Save Settings
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
          <SecurityIcon className="text-red-500" />
          Security & Access Control
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <button className="w-full p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 text-left">
              <div className="font-medium text-red-700 dark:text-red-300 mb-2">
                Reset Admin Password
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Change your administrator password
              </div>
            </button>
            <button className="w-full p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 text-left">
              <div className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                Audit Logs
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                View system access logs
              </div>
            </button>
          </div>
          <div className="space-y-4">
            <button className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 text-left">
              <div className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                User Permissions
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Manage role-based access
              </div>
            </button>
            <button className="w-full p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 text-left">
              <div className="font-medium text-green-700 dark:text-green-300 mb-2">
                Two-Factor Auth
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Enable 2FA for security
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimetableTab = () => (
    <div className="space-y-8">
      {/* Timetable Generation Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <AutoFixHighIcon className="text-indigo-600 text-2xl" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Timetable Generator
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Generate optimized timetables with dummy data for testing and
          demonstration purposes.
        </p>
      </div>

      {/* Generation Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
          Generation Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Domain Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Academic Domain
            </label>
            <select
              value={generationSettings.domain}
              onChange={(e) =>
                setGenerationSettings((prev) => ({
                  ...prev,
                  domain: e.target.value,
                }))
              }
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="btech">B.Tech Engineering</option>
              <option value="mtech">M.Tech Engineering</option>
              <option value="bed">B.Ed Education</option>
              <option value="fyup">4-Year Undergraduate</option>
            </select>
          </div>

          {/* Year Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Academic Year
            </label>
            <select
              value={generationSettings.year}
              onChange={(e) =>
                setGenerationSettings((prev) => ({
                  ...prev,
                  year: parseInt(e.target.value),
                }))
              }
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value={1}>Year 1</option>
              <option value={2}>Year 2</option>
              <option value={3}>Year 3</option>
              <option value={4}>Year 4</option>
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Program/Branch
            </label>
            <input
              type="text"
              value={generationSettings.program}
              onChange={(e) =>
                setGenerationSettings((prev) => ({
                  ...prev,
                  program: e.target.value,
                }))
              }
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="e.g., Computer Science"
            />
          </div>

          {/* Optimization Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Optimization Level
            </label>
            <select
              value={generationSettings.optimizationLevel}
              onChange={(e) =>
                setGenerationSettings((prev) => ({
                  ...prev,
                  optimizationLevel: e.target.value,
                }))
              }
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="high">High</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>

          {/* Conflict Resolution */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Conflict Resolution
            </label>
            <select
              value={generationSettings.conflictResolution}
              onChange={(e) =>
                setGenerationSettings((prev) => ({
                  ...prev,
                  conflictResolution: e.target.value,
                }))
              }
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="auto">Automatic</option>
              <option value="manual">Manual Review</option>
              <option value="strict">Strict Mode</option>
            </select>
          </div>

          {/* Dummy Data Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="generateDummyData"
              checked={generationSettings.generateDummyData}
              onChange={(e) =>
                setGenerationSettings((prev) => ({
                  ...prev,
                  generateDummyData: e.target.checked,
                }))
              }
              className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
            />
            <label
              htmlFor="generateDummyData"
              className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Generate with dummy data
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8">
          <button
            onClick={generateDummyTimetable}
            disabled={generatingTimetable}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl"
          >
            <div className="flex items-center justify-center gap-3">
              {generatingTimetable ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Generating Timetable...</span>
                </>
              ) : (
                <>
                  <AutoFixHighIcon />
                  <span>Generate Dummy Timetable</span>
                </>
              )}
            </div>
          </button>

          {/* Progress Bar */}
          {generatingTimetable && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Generation Progress
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {Math.round(generationProgress)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generated Timetable Display */}
      {generatedTimetable && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircleIcon className="text-green-500" />
              Generated Timetable
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <FileDownloadIcon className="w-4 h-4 mr-1" />
                Export PDF
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <SaveIcon className="w-4 h-4 mr-1" />
                Save Template
              </button>
            </div>
          </div>

          {/* Timetable Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {generatedTimetable.timetable?.length || 0}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Total Classes
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {generatedTimetable.stats?.facultyCount || 0}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Faculty Assigned
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {generatedTimetable.stats?.roomsUsed || 0}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Rooms Utilized
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {generatedTimetable.stats?.utilizationRate || 0}%
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                Utilization Rate
              </div>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 dark:border-slate-600">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                    Time Slot
                  </th>
                  <th className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                    Monday
                  </th>
                  <th className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                    Tuesday
                  </th>
                  <th className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                    Wednesday
                  </th>
                  <th className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                    Thursday
                  </th>
                  <th className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                    Friday
                  </th>
                </tr>
              </thead>
              <tbody>
                {generatedTimetable.timetable
                  ?.slice(0, 8)
                  .map((slot, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <td className="border border-slate-300 dark:border-slate-600 p-3 font-medium text-slate-900 dark:text-white">
                        {slot.timeSlot || `${9 + index}:00 - ${10 + index}:00`}
                      </td>
                      <td className="border border-slate-300 dark:border-slate-600 p-3">
                        {slot.monday && (
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-2 text-sm">
                            <div className="font-medium text-blue-800 dark:text-blue-200">
                              {slot.monday.subject}
                            </div>
                            <div className="text-blue-600 dark:text-blue-300">
                              {slot.monday.faculty}
                            </div>
                            <div className="text-blue-500 dark:text-blue-400">
                              {slot.monday.room}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="border border-slate-300 dark:border-slate-600 p-3">
                        {slot.tuesday && (
                          <div className="bg-green-100 dark:bg-green-900/30 rounded p-2 text-sm">
                            <div className="font-medium text-green-800 dark:text-green-200">
                              {slot.tuesday.subject}
                            </div>
                            <div className="text-green-600 dark:text-green-300">
                              {slot.tuesday.faculty}
                            </div>
                            <div className="text-green-500 dark:text-green-400">
                              {slot.tuesday.room}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="border border-slate-300 dark:border-slate-600 p-3">
                        {slot.wednesday && (
                          <div className="bg-purple-100 dark:bg-purple-900/30 rounded p-2 text-sm">
                            <div className="font-medium text-purple-800 dark:text-purple-200">
                              {slot.wednesday.subject}
                            </div>
                            <div className="text-purple-600 dark:text-purple-300">
                              {slot.wednesday.faculty}
                            </div>
                            <div className="text-purple-500 dark:text-purple-400">
                              {slot.wednesday.room}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="border border-slate-300 dark:border-slate-600 p-3">
                        {slot.thursday && (
                          <div className="bg-orange-100 dark:bg-orange-900/30 rounded p-2 text-sm">
                            <div className="font-medium text-orange-800 dark:text-orange-200">
                              {slot.thursday.subject}
                            </div>
                            <div className="text-orange-600 dark:text-orange-300">
                              {slot.thursday.faculty}
                            </div>
                            <div className="text-orange-500 dark:text-orange-400">
                              {slot.thursday.room}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="border border-slate-300 dark:border-slate-600 p-3">
                        {slot.friday && (
                          <div className="bg-red-100 dark:bg-red-900/30 rounded p-2 text-sm">
                            <div className="font-medium text-red-800 dark:text-red-200">
                              {slot.friday.subject}
                            </div>
                            <div className="text-red-600 dark:text-red-300">
                              {slot.friday.faculty}
                            </div>
                            <div className="text-red-500 dark:text-red-400">
                              {slot.friday.room}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Timetables */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Recent Generated Timetables
        </h3>

        {timetables.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <CalendarMonthIcon className="mx-auto text-4xl mb-2 opacity-50" />
            <p>
              No timetables generated yet. Click the generate button above to
              create your first timetable.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {timetables.slice(0, 5).map((tt, index) => (
              <div
                key={tt.id || index}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {tt.name || `Timetable ${index + 1}`}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Created:{" "}
                    {new Date(tt.created || Date.now()).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                    <FileDownloadIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "faculty":
        return renderFacultyTab();
      case "students":
        return renderStudentsTab();
      case "courses":
        return renderCoursesTab();
      case "rooms":
        return renderRoomsTab();
      case "analytics":
        return renderAnalyticsTab();
      case "reports":
        return renderReportsTab();
      case "importexport":
        return renderImportExportTab();
      case "timetable":
        return renderTimetableTab();
      case "settings":
        return renderSettingsTab();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto" ref={adminRef}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <AdminPanelSettingsIcon
                className="text-indigo-600"
                fontSize="large"
              />
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Manage your institution's academic data and timetabling system
            </p>
          </div>
          <Link
            to="/generator"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <CalendarMonthIcon fontSize="small" />
            Generate Timetable
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <SchoolIcon className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium">
                  Total Faculty
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {faculty.length}
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <GroupsIcon className="text-green-600 dark:text-green-400 text-2xl" />
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium">
                  Total Students
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {students.length}
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <ClassIcon className="text-purple-600 dark:text-purple-400 text-2xl" />
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium">
                  Total Courses
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {courses.length}
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <MeetingRoomIcon className="text-orange-600 dark:text-orange-400 text-2xl" />
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium">
                  Total Rooms
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {rooms.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
          <TabButton
            id="overview"
            label="Overview"
            icon={BarChartIcon}
            isActive={activeTab === "overview"}
            onClick={setActiveTab}
          />
          <TabButton
            id="faculty"
            label="Faculty"
            icon={SchoolIcon}
            isActive={activeTab === "faculty"}
            onClick={setActiveTab}
          />
          <TabButton
            id="students"
            label="Students"
            icon={GroupsIcon}
            isActive={activeTab === "students"}
            onClick={setActiveTab}
          />
          <TabButton
            id="courses"
            label="Courses"
            icon={ClassIcon}
            isActive={activeTab === "courses"}
            onClick={setActiveTab}
          />
          <TabButton
            id="rooms"
            label="Rooms"
            icon={MeetingRoomIcon}
            isActive={activeTab === "rooms"}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            icon={AnalyticsIcon}
            isActive={activeTab === "analytics"}
            onClick={setActiveTab}
          />
          <TabButton
            id="reports"
            label="Reports"
            icon={ReportIcon}
            isActive={activeTab === "reports"}
            onClick={setActiveTab}
          />
          <TabButton
            id="importexport"
            label="Import/Export"
            icon={CloudSyncIcon}
            isActive={activeTab === "importexport"}
            onClick={setActiveTab}
          />
          <TabButton
            id="timetable"
            label="Timetable Generator"
            icon={AutoFixHighIcon}
            isActive={activeTab === "timetable"}
            onClick={setActiveTab}
          />
          <TabButton
            id="settings"
            label="Settings"
            icon={SettingsIcon}
            isActive={activeTab === "settings"}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
