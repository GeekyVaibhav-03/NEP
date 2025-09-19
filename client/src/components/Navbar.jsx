import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { gsap } from "gsap";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BugReportIcon from "@mui/icons-material/BugReport";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const { user, logout, adminUser, adminLogout, isAdmin } = useAuth();
  const initial = (user?.name || user?.email || adminUser?.name || "?")
    .charAt(0)
    .toUpperCase();
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    // Animate navbar on mount
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const pill = ({ isActive }) =>
    `group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"
        : "text-slate-700 dark:text-slate-300 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
    }`;

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 shadow-xl shadow-slate-900/5 dark:shadow-slate-900/20"
          : "bg-white/80 dark:bg-slate-900/80"
      } border-b border-slate-200/30 dark:border-slate-700/30`}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-6">
          {/* Enhanced Brand */}
          <Link
            to="/"
            className="group inline-flex items-center gap-3 font-bold text-xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
          >
            <div className="relative p-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300">
              <CalendarMonthIcon className="text-white text-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="relative">
              NEP Timetable
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </Link>

          {/* Simplified Center - Only brand, no navigation */}
          <div className="flex-1"></div>

          {/* Authentication Actions */}
          <div className="flex items-center gap-3">
            {!user && !adminUser && (
              <div className="flex items-center gap-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-2 border border-slate-200/30 dark:border-slate-700/30 shadow-lg">
                <NavLink to="/signin" className={pill}>
                  <LoginIcon fontSize="small" />
                  <span>Sign In</span>
                </NavLink>
                <NavLink to="/signup" className={pill}>
                  <PersonIcon fontSize="small" />
                  <span>Sign Up</span>
                </NavLink>
                <NavLink
                  to="/admin/login"
                  className={`${pill} bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600`}
                >
                  <AdminPanelSettingsIcon fontSize="small" />
                  <span>Admin</span>
                </NavLink>
              </div>
            )}

            {(user || adminUser) && (
              <div className="flex items-center gap-3">
                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-1 border border-slate-200/30 dark:border-slate-700/30 shadow-lg">
                  <NavLink to="/dashboard" className={pill}>
                    <DashboardIcon fontSize="small" />
                    <span>Dashboard</span>
                  </NavLink>
                  {/* Generator - Admin Only */}
                  {isAdmin && (
                    <NavLink to="/generator" className={pill}>
                      <AutoAwesomeIcon fontSize="small" />
                      <span>Generate</span>
                    </NavLink>
                  )}
                  {/* Admin Section - Only show for authenticated admin users */}
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                            : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-purple-200 dark:hover:border-purple-800 hover:text-purple-600 dark:hover:text-purple-400"
                        }`
                      }
                    >
                      <AdminPanelSettingsIcon fontSize="small" />
                      <span>Admin</span>
                    </NavLink>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    className="w-5 h-5 text-slate-600 dark:text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>

                {/* Notifications */}
                <button className="relative p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 hover:scale-110">
                  <NotificationsIcon
                    fontSize="small"
                    className="text-slate-600 dark:text-slate-300"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* Settings */}
                <button className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 hover:scale-110 hover:rotate-45">
                  <SettingsIcon
                    fontSize="small"
                    className="text-slate-600 dark:text-slate-300"
                  />
                </button>

                {/* User Avatar */}
                <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-slate-200/30 dark:border-slate-700/30 shadow-lg">
                  <div
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white grid place-items-center text-sm font-bold shadow-lg relative overflow-hidden group cursor-pointer"
                    title={user?.name || user?.email}
                  >
                    <span className="relative z-10 group-hover:scale-110 transition-transform">
                      {initial}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="hidden md:flex flex-col items-start pr-2">
                    <span className="text-xs font-medium text-slate-900 dark:text-white">
                      {adminUser?.name || user?.name || "User"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                      {adminUser ? "Administrator" : user?.userType || "Member"}
                    </span>
                  </div>

                  <button
                    onClick={adminUser ? adminLogout : logout}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-300 hover:scale-105 mr-1"
                  >
                    <LogoutIcon fontSize="small" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </div>
              </div>
            )}

            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/30 dark:border-slate-700/30 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex flex-col space-y-2">
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <DashboardIcon fontSize="small" />
                  <span>Dashboard</span>
                </NavLink>
                {/* Generator - Admin Only */}
                {isAdmin && (
                  <NavLink
                    to="/generator"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <AutoAwesomeIcon fontSize="small" />
                    <span>Generate Timetable</span>
                  </NavLink>
                )}
                {/* Admin Section - Only show for authenticated admin users */}
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <AdminPanelSettingsIcon fontSize="small" />
                    <span>Admin Panel</span>
                  </NavLink>
                )}
                <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <NotificationsIcon fontSize="small" />
                  <span>Notifications</span>
                  <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <SettingsIcon fontSize="small" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
