import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { gsap } from "gsap";
import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WeekGrid from "../components/WeekGrid.jsx";
import http from "../services/http.js";
import LandingPage from "./LandingPage.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

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
    gsap.from(".db-card", {
      opacity: 0,
      y: 12,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    });
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const res = await http.get("/api/timetable/list");
      setTimetables(res.data.list || []);
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

  // Demo data for workload bars (no chart library)
  const workload = [
    { name: "Dr. A", hours: 8 },
    { name: "Dr. B", hours: 10 },
    { name: "Dr. C", hours: 6 },
    { name: "Dr. D", hours: 9 },
    { name: "Dr. E", hours: 7 },
  ];
  const maxHours = Math.max(...workload.map((w) => w.hours));

  // Calculate pie chart data
  const totalHours = workload.reduce((sum, w) => sum + w.hours, 0);
  const pieData = workload.map((w, i) => ({
    ...w,
    percentage: (w.hours / totalHours) * 100,
    color: `hsl(${i * 60}, 70%, 50%)`,
  }));

  // Line chart data (simulated over weeks)
  const lineData = [
    { week: 1, hours: workload.map((w) => w.hours) },
    { week: 2, hours: [9, 8, 7, 10, 6] },
    { week: 3, hours: [7, 9, 8, 6, 11] },
    { week: 4, hours: [10, 7, 9, 8, 5] },
  ];

  // Pie Chart Component
  const PieChart = ({ data, width = 200, height = 200 }) => {
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    let cumulativeAngle = 0;
    const paths = data.map((item, index) => {
      const angle = (item.percentage / 100) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");

      cumulativeAngle += angle;

      return (
        <path
          key={index}
          d={pathData}
          fill={item.color}
          stroke="#fff"
          strokeWidth="2"
        />
      );
    });

    const totalHours = data.reduce((sum, item) => sum + item.hours, 0);

    return (
      <svg width={width} height={height}>
        {paths}
        <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="#f8f9fa" />
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill="#333"
        >
          Total
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#333"
          fontWeight="bold"
        >
          {totalHours}h
        </text>
      </svg>
    );
  };

  // Line Chart Component
  const LineChart = ({ data, facultyData, width = 300, height = 200 }) => {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const allHours = data.flatMap((d) => d.hours);
    const maxValue = Math.max(...allHours);
    const minValue = Math.min(...allHours);

    const xScale = (index) =>
      padding + (index / (data.length - 1)) * chartWidth;
    const yScale = (value) =>
      height -
      padding -
      ((value - minValue) / (maxValue - minValue)) * chartHeight;

    const lines = facultyData.map((faculty, facultyIndex) => {
      const points = data
        .map((week, weekIndex) => {
          const x = xScale(weekIndex);
          const y = yScale(week.hours[facultyIndex]);
          return `${x},${y}`;
        })
        .join(" ");

      return (
        <polyline
          key={facultyIndex}
          points={points}
          fill="none"
          stroke={`hsl(${facultyIndex * 60}, 70%, 50%)`}
          strokeWidth="2"
        />
      );
    });

    return (
      <svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`grid-${i}`}
            x1={padding}
            y1={yScale(minValue + (i * (maxValue - minValue)) / 4)}
            x2={width - padding}
            y2={yScale(minValue + (i * (maxValue - minValue)) / 4)}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        ))}

        {/* X-axis labels */}
        {data.map((week, index) => (
          <text
            key={`x-${index}`}
            x={xScale(index)}
            y={height - padding + 15}
            textAnchor="middle"
            fontSize="10"
            fill="#666"
          >
            Week {week.week}
          </text>
        ))}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={`y-${i}`}
            x={padding - 10}
            y={yScale(minValue + (i * (maxValue - minValue)) / 4)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="10"
            fill="#666"
          >
            {Math.round(minValue + (i * (maxValue - minValue)) / 4)}
          </text>
        ))}

        {lines}

        {/* Data points */}
        {facultyData.map((faculty, facultyIndex) =>
          data.map((week, weekIndex) => (
            <circle
              key={`point-${facultyIndex}-${weekIndex}`}
              cx={xScale(weekIndex)}
              cy={yScale(week.hours[facultyIndex])}
              r="3"
              fill={`hsl(${facultyIndex * 60}, 70%, 50%)`}
              stroke="#fff"
              strokeWidth="1"
            />
          ))
        )}

        {/* Legend */}
        {facultyData.map((faculty, index) => (
          <g key={`legend-${index}`}>
            <line
              x1={width - 100}
              y1={padding + index * 15}
              x2={width - 80}
              y2={padding + index * 15}
              stroke={`hsl(${index * 60}, 70%, 50%)`}
              strokeWidth="2"
            />
            <text
              x={width - 75}
              y={padding + index * 15 + 3}
              fontSize="10"
              fill="#666"
            >
              {faculty.name}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <AddCircleOutlineIcon fontSize="small" /> New Timetable
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300/60 dark:border-slate-700/50"
          >
            <QueryStatsIcon fontSize="small" /> Home
          </Link>
        </div>
      </div>

      {user && (
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Welcome back, <strong>{user.name}</strong>!
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="db-card bg-white dark:bg-slate-800 rounded-lg shadow p-5">
          <div className="flex items-center gap-3">
            <GridViewIcon className="text-indigo-600" />
            <div>
              <div className="text-slate-500 text-sm">Generated Timetables</div>
              <div className="text-2xl font-bold">
                {loading ? "..." : timetables.length}
              </div>
            </div>
          </div>
        </div>
        <div className="db-card bg-white dark:bg-slate-800 rounded-lg shadow p-5">
          <div className="flex items-center gap-3">
            <SchoolIcon className="text-indigo-600" />
            <div>
              <div className="text-slate-500 text-sm">Total Courses</div>
              <div className="text-2xl font-bold">
                {loading
                  ? "..."
                  : latestTimetable
                  ? latestTimetable.timetable.flat.length
                  : 0}
              </div>
            </div>
          </div>
        </div>
        <div className="db-card bg-white dark:bg-slate-800 rounded-lg shadow p-5">
          <div className="flex items-center gap-3">
            <GroupsIcon className="text-indigo-600" />
            <div>
              <div className="text-slate-500 text-sm">Faculty Members</div>
              <div className="text-2xl font-bold">38</div>
            </div>
          </div>
        </div>
        <div className="db-card bg-white dark:bg-slate-800 rounded-lg shadow p-5">
          <div className="flex items-center gap-3">
            <WarningAmberIcon className="text-red-500" />
            <div>
              <div className="text-slate-500 text-sm">Conflicts Detected</div>
              <div className="text-2xl font-bold text-red-500">0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty workload (with charts) */}
      <div className="db-card mt-6 bg-white dark:bg-slate-800 rounded-lg shadow p-5">
        <h3 className="font-semibold mb-3">Faculty Workload Overview</h3>
        <p className="text-sm text-slate-500 mb-4">
          Relative teaching hours across faculty (demo data).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Current Week</h4>
            <div className="space-y-3">
              {workload.map(({ name, hours }) => {
                const width = Math.round((hours / maxHours) * 100);
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-200">
                        {name}
                      </span>
                      <span className="text-slate-500">{hours}h</span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pie Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Workload Distribution</h4>
            <div className="flex justify-center">
              <PieChart data={pieData} />
            </div>
            <div className="mt-4 space-y-1">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center text-xs">
                  <div
                    className="w-3 h-3 rounded mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.name}: {item.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Workload Trend (4 Weeks)</h4>
          <div className="flex justify-center">
            <LineChart data={lineData} facultyData={workload} />
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="db-card mt-6 bg-white dark:bg-slate-800 rounded-lg shadow p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CalendarMonthIcon /> Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700"
          >
            Generate (Student)
          </Link>
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700"
          >
            Generate (Teacher)
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Preview grid */}
      <div className="db-card mt-6 bg-white dark:bg-slate-800 rounded-lg shadow p-5">
        <h3 className="font-semibold mb-3">Timetable Preview</h3>
        <WeekGrid slots={previewSlots} />
      </div>

      {/* Recent activity */}
      <div className="db-card mt-6 bg-white dark:bg-slate-800 rounded-lg shadow p-5">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        {loading ? (
          <p>Loading...</p>
        ) : timetables.length === 0 ? (
          <p>No recent activity to display.</p>
        ) : (
          <div className="space-y-2">
            {timetables
              .slice(-5)
              .reverse()
              .map((tt) => (
                <div
                  key={tt.id}
                  className="text-sm text-slate-600 dark:text-slate-300"
                >
                  Generated timetable for {tt.options.domain} ({tt.options.role}
                  ) on {new Date(tt.createdAt).toLocaleString()}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
