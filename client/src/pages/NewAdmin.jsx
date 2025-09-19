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
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
