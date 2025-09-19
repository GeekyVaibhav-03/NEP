import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import { gsap } from "gsap";
import Navbar from "../components/Navbar.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";
import LandingPage from "./LandingPage.jsx";
import FacultyDashboard from "./FacultyDashboard.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AdminProtectedRoute from "../components/AdminProtectedRoute.jsx";
import Authorize from "./Authorize.jsx";
import Generator from "./Generator.jsx";
import ProblemSolving from "./ProblemSolving.jsx";
import Admin from "./Admin.jsx";
import AdminLogin from "./AdminLogin.jsx";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const page = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 });
    }, page);
    return () => ctx.revert();
  }, [result]);

  async function download(type) {
    if (!result) return;
    const url =
      type === "xlsx"
        ? "/api/timetable/export/xlsx"
        : "/api/timetable/export/pdf";
    const res = await axios.post(
      url,
      { timetable: result, meta: { title: "Demo Timetable" } },
      {
        responseType: "blob",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    const blob = new Blob([res.data], {
      type:
        type === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/pdf",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `timetable.${type}`;
    link.click();
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div ref={page}>
        <AnimatedBackground />
        <Routes>
          {/* Home shows Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Problem Solving Environment */}
          <Route path="/problems" element={<ProblemSolving />} />

          {/* Timetable Generator - Admin Only */}
          <Route
            path="/generator"
            element={
              <AdminProtectedRoute>
                <Generator />
              </AdminProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          />

          {/* Faculty Dashboard */}
          <Route
            path="/faculty"
            element={
              <ProtectedRoute>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Student Dashboard */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Specialized generators */}
          <Route
            path="/generator/school/student"
            element={<Generator domain="school" initialType="student" />}
          />
          <Route
            path="/generator/school/teacher"
            element={<Generator domain="school" initialType="teacher" />}
          />
          <Route
            path="/generator/btech/year/:year/student"
            element={<Generator domain="btech" initialType="student" />}
          />
          <Route
            path="/generator/btech/year/:year/teacher"
            element={<Generator domain="btech" initialType="teacher" />}
          />
          <Route
            path="/generator/mtech/student"
            element={<Generator domain="mtech" initialType="student" />}
          />
          <Route
            path="/generator/mtech/teacher"
            element={<Generator domain="mtech" initialType="teacher" />}
          />

          {/* Auth routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/authorize" element={<Authorize />} />

          {/* Protected dashboard (legacy path) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
