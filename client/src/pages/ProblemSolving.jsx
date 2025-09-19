import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import AIVoiceAssistant from "../components/AIVoiceAssistant.jsx";
import BuildIcon from "@mui/icons-material/Build";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import SpeedIcon from "@mui/icons-material/Speed";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScienceIcon from "@mui/icons-material/Science";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolving() {
  const [detectedIssues, setDetectedIssues] = useState([]);
  const [suggestedSolutions, setSuggestedSolutions] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("room-conflict");
  const [simulationResults, setSimulationResults] = useState(null);

  const headerRef = useRef(null);
  const toolsRef = useRef(null);
  const resultsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Tools animation
    gsap.from(toolsRef.current?.children, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: toolsRef.current,
        start: "top 80%",
      },
    });

    // Cards animation
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

    // Initialize demo data
    initializeDemoData();
  }, []);

  const initializeDemoData = () => {
    setDetectedIssues([
      {
        id: 1,
        type: "room-conflict",
        severity: "high",
        title: "Room Double Booking",
        description:
          "Room 101 is scheduled for two classes at 10:00 AM on Monday",
        affectedSessions: [
          "MATH401 - Advanced Calculus",
          "PHYS201 - Physics Lab",
        ],
        impact: "High - affects 85 students",
        suggestions: 3,
      },
      {
        id: 2,
        type: "faculty-overload",
        severity: "medium",
        title: "Faculty Overload",
        description: "Dr. Smith has 6 consecutive hours on Tuesday",
        affectedSessions: ["MATH401", "MATH301", "STAT101"],
        impact: "Medium - faculty burnout risk",
        suggestions: 2,
      },
      {
        id: 3,
        type: "resource-shortage",
        severity: "low",
        title: "Lab Equipment Shortage",
        description:
          "Chemistry lab has insufficient equipment for concurrent classes",
        affectedSessions: ["CHEM201L", "CHEM301L"],
        impact: "Low - can be managed with scheduling",
        suggestions: 4,
      },
      {
        id: 4,
        type: "time-gap",
        severity: "low",
        title: "Large Time Gaps",
        description: "Students have 3-hour gap between classes on Wednesday",
        affectedSessions: ["ENG202", "HIST301"],
        impact: "Low - inconvenient but manageable",
        suggestions: 2,
      },
    ]);

    setSuggestedSolutions([
      {
        id: 1,
        issueId: 1,
        title: "Move PHYS201 to Lab 205",
        description:
          "Relocate Physics Lab to the available Lab 205 at the same time",
        impact: "Resolves conflict completely",
        difficulty: "Easy",
        estimatedTime: "5 minutes",
        confidence: 95,
      },
      {
        id: 2,
        issueId: 1,
        title: "Reschedule MATH401 to 11:00 AM",
        description: "Move Advanced Calculus to the next available slot",
        impact: "Minor schedule adjustment for 45 students",
        difficulty: "Medium",
        estimatedTime: "15 minutes",
        confidence: 88,
      },
      {
        id: 3,
        issueId: 2,
        title: "Split Dr. Smith's Tuesday load",
        description: "Assign STAT101 to Dr. Wilson to balance workload",
        impact: "Better faculty work-life balance",
        difficulty: "Medium",
        estimatedTime: "20 minutes",
        confidence: 85,
      },
    ]);
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        totalIssues: detectedIssues.length,
        criticalIssues: detectedIssues.filter((i) => i.severity === "high")
          .length,
        resolutionRate: 92,
        optimizationScore: 87,
        processingTime: "2.4s",
        recommendations: [
          "Consider implementing buffer times between classes",
          "Balance faculty workload across the week",
          "Optimize room utilization during peak hours",
          "Group related subjects for better student flow",
        ],
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const runSimulation = (scenario) => {
    setSelectedScenario(scenario);

    const scenarios = {
      "room-conflict": {
        name: "Room Conflict Resolution",
        before: { conflicts: 3, efficiency: 78, satisfaction: 72 },
        after: { conflicts: 0, efficiency: 94, satisfaction: 89 },
        changes: [
          "Moved PHYS201 from Room 101 to Lab 205",
          "Adjusted CHEM301L timing by 30 minutes",
          "Optimized room allocation algorithm",
        ],
      },
      "faculty-balance": {
        name: "Faculty Workload Balancing",
        before: { maxHours: 8, avgHours: 5.2, satisfaction: 71 },
        after: { maxHours: 6, avgHours: 5.5, satisfaction: 88 },
        changes: [
          "Redistributed 3 courses across faculty",
          "Introduced teaching load caps",
          "Balanced expertise requirements",
        ],
      },
      "time-optimization": {
        name: "Time Slot Optimization",
        before: { gaps: 12, utilization: 73, efficiency: 81 },
        after: { gaps: 4, utilization: 91, efficiency: 95 },
        changes: [
          "Minimized time gaps in student schedules",
          "Optimized consecutive class placement",
          "Improved resource utilization",
        ],
      },
    };

    setSimulationResults(scenarios[scenario]);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      default:
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <WarningIcon className="text-red-500" />;
      case "medium":
        return <BugReportIcon className="text-yellow-500" />;
      case "low":
        return <CheckCircleIcon className="text-green-500" />;
      default:
        return <AnalyticsIcon className="text-blue-500" />;
    }
  };

  const voiceFeatures = [
    "analyze timetable conflicts",
    "suggest optimizations",
    "run what-if scenarios",
    "resolve scheduling issues",
    "balance faculty workload",
    "optimize room utilization",
    "generate improvement reports",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-orange-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl">
                    <PsychologyIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse">
                    <ScienceIcon className="text-white text-xs p-1" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    AI Problem Solving Lab
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                    <AutoAwesomeIcon />
                    Intelligent Conflict Resolution & Optimization Engine
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <BugReportIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Detect Issues
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automated conflict detection
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <SmartToyIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      AI Solutions
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Intelligent recommendations
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-900/20 dark:to-green-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <ScienceIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Simulate
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    What-if scenario testing
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <SpeedIcon className="text-white text-sm" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Optimize
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Performance enhancement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tools Grid */}
        <div ref={toolsRef} className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Analysis Panel */}
          <div className="lg:col-span-1">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <AnalyticsIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    AI Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Deep learning insights
                  </p>
                </div>
              </div>

              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl mb-6"
              >
                <div className="flex items-center justify-center gap-3">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <PlayArrowIcon className="group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Run Deep Analysis</span>
                    </>
                  )}
                </div>
              </button>

              {analysisResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl text-center">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {analysisResults.criticalIssues}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Critical Issues
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {analysisResults.resolutionRate}%
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Resolution Rate
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      AI Recommendations
                    </h4>
                    <ul className="space-y-1">
                      {analysisResults.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                        >
                          <CheckCircleIcon className="text-green-500 text-sm mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* What-if Scenarios */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <ScienceIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    What-If Scenarios
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Simulation testing
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  {
                    id: "room-conflict",
                    name: "Room Conflict Resolution",
                    icon: RoomIcon,
                  },
                  {
                    id: "faculty-balance",
                    name: "Faculty Load Balancing",
                    icon: PersonIcon,
                  },
                  {
                    id: "time-optimization",
                    name: "Time Optimization",
                    icon: AccessTimeIcon,
                  },
                ].map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => runSimulation(id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedScenario === id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-slate-200 dark:border-slate-600 hover:border-purple-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        selectedScenario === id
                          ? "bg-purple-500"
                          : "bg-slate-400"
                      }`}
                    >
                      <Icon className="text-white text-sm" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white text-left">
                      {name}
                    </span>
                  </button>
                ))}
              </div>

              {simulationResults && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {simulationResults.name}
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                        Before
                      </p>
                      {Object.entries(simulationResults.before).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-slate-600 dark:text-slate-400 capitalize">
                              {key}:
                            </span>
                            <span className="text-red-600 dark:text-red-400">
                              {value}
                              {typeof value === "number" && value < 10
                                ? ""
                                : "%"}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                        After
                      </p>
                      {Object.entries(simulationResults.after).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-slate-600 dark:text-slate-400 capitalize">
                              {key}:
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                              {value}
                              {typeof value === "number" && value < 10
                                ? ""
                                : "%"}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Changes Applied
                    </p>
                    <ul className="space-y-1">
                      {simulationResults.changes.map((change, index) => (
                        <li
                          key={index}
                          className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2"
                        >
                          <SwapHorizIcon className="text-blue-500 text-sm mt-0.5" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Issues & Solutions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detected Issues */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                  <BugReportIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Detected Issues
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    AI-identified scheduling conflicts and problems
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detectedIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-6 rounded-xl border-2 ${getSeverityColor(
                      issue.severity
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getSeverityIcon(issue.severity)}
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">
                            {issue.title}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full capitalize ${
                              issue.severity === "high"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : issue.severity === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {issue.severity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                      {issue.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Affected Sessions:
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {issue.affectedSessions.map((session, index) => (
                            <span
                              key={index}
                              className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded"
                            >
                              {session}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Impact:{" "}
                          <span className="text-slate-900 dark:text-white">
                            {issue.impact}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {issue.suggestions} AI solutions available
                      </span>
                      <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors">
                        View Solutions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Solutions */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <SmartToyIcon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    AI-Suggested Solutions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Intelligent recommendations with confidence scores
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {suggestedSolutions.map((solution) => (
                  <div
                    key={solution.id}
                    className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                          {solution.title}
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                          {solution.description}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUpIcon className="text-green-500 text-sm" />
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            {solution.confidence}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Confidence
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Impact
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {solution.impact}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Difficulty
                        </p>
                        <p
                          className={`text-sm font-semibold ${
                            solution.difficulty === "Easy"
                              ? "text-green-600 dark:text-green-400"
                              : solution.difficulty === "Medium"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {solution.difficulty}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Est. Time
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {solution.estimatedTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="text-green-500 text-sm" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          Ready to implement
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors">
                          Apply Solution
                        </button>
                        <button className="text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-4 py-2 rounded-full transition-colors">
                          Simulate First
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        {analysisResults && (
          <div
            ref={resultsRef}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                <SpeedIcon className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Performance Metrics
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  System optimization analysis
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                <div className="p-3 bg-blue-500 rounded-xl w-fit mx-auto mb-4">
                  <AnalyticsIcon className="text-white text-xl" />
                </div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {analysisResults.optimizationScore}%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Optimization Score
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="p-3 bg-green-500 rounded-xl w-fit mx-auto mb-4">
                  <CheckCircleIcon className="text-white text-xl" />
                </div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {analysisResults.resolutionRate}%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Resolution Rate
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <div className="p-3 bg-purple-500 rounded-xl w-fit mx-auto mb-4">
                  <BugReportIcon className="text-white text-xl" />
                </div>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {analysisResults.totalIssues}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Issues Found
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                <div className="p-3 bg-orange-500 rounded-xl w-fit mx-auto mb-4">
                  <AccessTimeIcon className="text-white text-xl" />
                </div>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {analysisResults.processingTime}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Processing Time
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Voice Assistant */}
      {/* <AIVoiceAssistant 
        pageName="Problem Solving Lab"
        features={voiceFeatures}
      /> */}
    </div>
  );
}
