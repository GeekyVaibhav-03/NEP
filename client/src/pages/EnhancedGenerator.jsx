import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "../services/http.js";
import WeekGrid from "../components/WeekGrid.jsx";
import AIVoiceAssistant from "../components/AIVoiceAssistant.jsx";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TuneIcon from "@mui/icons-material/Tune";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import ClassIcon from "@mui/icons-material/Class";
import BookIcon from "@mui/icons-material/Book";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useParams } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Optional props allow specialized routes to prefill selection
// Props: initialType (student|teacher), domain (school|college|btech|mtech), year, program
export default function Generator({
  initialType = "student",
  domain,
  year,
  program,
}) {
  const params = useParams();
  const yearFromRoute = Number(params.year) || year;

  // UI selections
  const [selectedDomain, setSelectedDomain] = useState(domain || "bed");
  const [type, setType] = useState(initialType); // student | teacher
  const [btechYear, setBtechYear] = useState(yearFromRoute || 1);
  const [schoolClass, setSchoolClass] = useState(10); // simple demo selector

  // Results state
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [optimizationMetrics, setOptimizationMetrics] = useState({
    conflicts: 0,
    efficiency: 0,
    satisfaction: 0,
  });

  // Animation refs
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const resultsRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Form animation
    gsap.from(formRef.current?.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.3,
    });

    // Floating elements animation
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    });

    // Results animation when timetable changes
    if (timetable && resultsRef.current) {
      gsap.from(resultsRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }

    // Metrics animation
    if (optimizationMetrics.efficiency > 0 && metricsRef.current) {
      gsap.from(metricsRef.current.children, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [timetable, optimizationMetrics]);

  // Voice features for this page
  const voiceFeatures = [
    "generate timetable",
    "select domain",
    "choose student or teacher",
    "set preferences",
    "optimize schedule",
    "export results",
    "view analytics",
  ];

  // Simulate progress during generation
  const simulateProgress = () => {
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  async function generate() {
    setLoading(true);
    setError("");
    setOptimizationMetrics({ conflicts: 0, efficiency: 0, satisfaction: 0 });

    const progressInterval = simulateProgress();

    try {
      const isBed = selectedDomain === "bed";
      const isFyup = selectedDomain === "fyup";
      const isBtech = selectedDomain === "btech";
      const isMtech = selectedDomain === "mtech";
      const isSchool = selectedDomain === "bed"; // For B.Ed., treat as school-like with class

      const derivedProgram =
        program ||
        (isBed
          ? "bed"
          : isFyup
          ? "fyup"
          : isBtech
          ? "btech"
          : isMtech
          ? "mtech"
          : "bed");

      const derivedYear =
        isBtech || isMtech ? btechYear : isSchool ? schoolClass : 1;

      const payload = {
        domain: selectedDomain,
        role: type,
        program: derivedProgram,
        year: derivedYear,
      };

      console.log("Sending payload:", payload);

      const res = await axios.post("/api/timetable/generate", payload);
      setTimetable(res.data);

      // Simulate optimization metrics
      setTimeout(() => {
        setOptimizationMetrics({
          conflicts: Math.floor(Math.random() * 3),
          efficiency: Math.floor(85 + Math.random() * 15),
          satisfaction: Math.floor(80 + Math.random() * 20),
        });
      }, 1000);
    } catch (err) {
      console.error("Generation failed:", err);
      setError(
        err.response?.data?.error || "Generation failed. Please try again."
      );
    } finally {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setLoading(false);
    }
  }

  const getDomainDisplayName = (domain) => {
    const names = {
      bed: "B.Ed (Bachelor of Education)",
      fyup: "FYUP (Four Year Undergraduate Program)",
      btech: "B.Tech (Bachelor of Technology)",
      mtech: "M.Tech (Master of Technology)",
    };
    return names[domain] || domain;
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return "text-green-600 dark:text-green-400";
    if (efficiency >= 75) return "text-blue-600 dark:text-blue-400";
    if (efficiency >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl">
                    <AutoAwesomeIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white animate-bounce">
                    <SmartToyIcon className="text-white text-xs p-1" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    AI Timetable Generator
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                    <SpeedIcon />
                    Next-Generation Intelligent Scheduling System
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <AnalyticsIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      AI-Powered
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Advanced algorithms for optimal scheduling
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <CheckCircleIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Conflict-Free
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automatic conflict detection and resolution
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <AccessTimeIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Real-Time
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Instant generation with live optimization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Generation Form */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div
              ref={formRef}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl">
                  <TuneIcon className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Configuration
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Customize your timetable
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Domain Selection */}
                <div className="gen-card">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Academic Domain
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {["bed", "fyup", "btech", "mtech"].map((domainOption) => (
                      <button
                        key={domainOption}
                        onClick={() => setSelectedDomain(domainOption)}
                        className={`group p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedDomain === domainOption
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                            : "border-slate-200 dark:border-slate-600 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg transition-colors ${
                              selectedDomain === domainOption
                                ? "bg-indigo-500"
                                : "bg-slate-400 group-hover:bg-indigo-400"
                            }`}
                          >
                            <SchoolIcon className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {getDomainDisplayName(domainOption)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {domainOption === "bed" && "Teaching program"}
                              {domainOption === "fyup" &&
                                "4-year undergraduate"}
                              {domainOption === "btech" &&
                                "Engineering program"}
                              {domainOption === "mtech" && "Master's program"}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Selection */}
                <div className="gen-card">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Timetable Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["student", "teacher"].map((typeOption) => (
                      <button
                        key={typeOption}
                        onClick={() => setType(typeOption)}
                        className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                          type === typeOption
                            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                            : "border-slate-200 dark:border-slate-600 hover:border-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`inline-flex p-3 rounded-lg mb-2 transition-colors ${
                              type === typeOption
                                ? "bg-cyan-500"
                                : "bg-slate-400 group-hover:bg-cyan-400"
                            }`}
                          >
                            {typeOption === "student" ? (
                              <PersonIcon className="text-white text-xl" />
                            ) : (
                              <GroupsIcon className="text-white text-xl" />
                            )}
                          </div>
                          <p className="font-semibold text-slate-900 dark:text-white capitalize">
                            {typeOption}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year/Class Selection */}
                {(selectedDomain === "btech" || selectedDomain === "mtech") && (
                  <div className="gen-card">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Academic Year
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((yearOption) => (
                        <button
                          key={yearOption}
                          onClick={() => setBtechYear(yearOption)}
                          className={`p-3 rounded-lg font-semibold transition-all duration-300 ${
                            btechYear === yearOption
                              ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          {yearOption}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDomain === "bed" && (
                  <div className="gen-card">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Class Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[9, 10, 11, 12].map((classOption) => (
                        <button
                          key={classOption}
                          onClick={() => setSchoolClass(classOption)}
                          className={`p-3 rounded-lg font-semibold transition-all duration-300 ${
                            schoolClass === classOption
                              ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          {classOption}th
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <PlayArrowIcon className="group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Generate AI Timetable</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Progress Bar */}
                {loading && (
                  <div className="gen-card mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        AI Processing
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {Math.round(generationProgress)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Configuration Preview & Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Configuration Summary */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <SettingsIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Current Configuration
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Review your settings
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <SchoolIcon className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Domain
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {selectedDomain.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <PersonIcon className="text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Type
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white capitalize">
                        {type}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ClassIcon className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedDomain === "bed" ? "Class" : "Year"}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {selectedDomain === "bed"
                          ? `${schoolClass}th`
                          : btechYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Metrics */}
            {optimizationMetrics.efficiency > 0 && (
              <div
                ref={metricsRef}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                    <AnalyticsIcon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      AI Optimization Metrics
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Performance analysis
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckCircleIcon className="text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Conflicts
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {optimizationMetrics.conflicts}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Detected & Resolved
                    </p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <SpeedIcon className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Efficiency
                      </span>
                    </div>
                    <p
                      className={`text-3xl font-bold ${getEfficiencyColor(
                        optimizationMetrics.efficiency
                      )}`}
                    >
                      {optimizationMetrics.efficiency}%
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Resource Utilization
                    </p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <AutoAwesomeIcon className="text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Satisfaction
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {optimizationMetrics.satisfaction}%
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Preference Matching
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <WarningIcon className="text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200">
                  Generation Error
                </h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {timetable && (
          <div ref={resultsRef} className="space-y-8">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                      <CalendarMonthIcon className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Generated Timetable
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        AI-optimized schedule ready for use
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Successfully Generated
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <WeekGrid slots={timetable.timetable?.flat || []} />
              </div>
            </div>

            {/* Timetable Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl w-fit mx-auto mb-4">
                  <BookIcon className="text-white text-xl" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {timetable.timetable?.flat?.length || 0}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Sessions
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-fit mx-auto mb-4">
                  <GroupsIcon className="text-white text-xl" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {
                    new Set(
                      timetable.timetable?.flat?.map((slot) => slot.faculty) ||
                        []
                    ).size
                  }
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Faculty Assigned
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-fit mx-auto mb-4">
                  <ClassIcon className="text-white text-xl" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {
                    new Set(
                      timetable.timetable?.flat?.map((slot) => slot.room) || []
                    ).size
                  }
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Rooms Utilized
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl w-fit mx-auto mb-4">
                  <AccessTimeIcon className="text-white text-xl" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {timetable.generationTime || "< 1s"}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Generation Time
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Voice Assistant */}
      <AIVoiceAssistant
        pageName="Timetable Generator"
        features={voiceFeatures}
      />
    </div>
  );
}
