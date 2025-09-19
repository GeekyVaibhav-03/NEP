import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "../services/http.js";
import WeekGrid from "../components/WeekGrid.jsx";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    gsap.from(".gen-card", {
      opacity: 0,
      y: 10,
      duration: 0.35,
      stagger: 0.06,
    });
  }, [timetable]);

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const isBed = selectedDomain === "bed";
      const isFyup = selectedDomain === "fyup";
      const isBtech = selectedDomain === "btech";
      const isMtech = selectedDomain === "mtech";
      const isSchool = selectedDomain === "bed"; // For B.Ed., treat as school-like with class

      const derivedProgram =
        program ||
        (isBed
          ? "B.Ed."
          : isFyup
          ? "FYUP"
          : isBtech
          ? "B.Tech"
          : isMtech
          ? "M.Tech"
          : "");
      const yr = isBtech || isMtech ? btechYear : isBed ? schoolClass : 1;

      // Demo course labels based on selection
      const derivedCourse =
        type === "student"
          ? isBed
            ? `B.Ed. Y${yr} Course`
            : isFyup
            ? "FYUP Course"
            : isBtech
            ? `B.Tech Y${yr} DS`
            : isMtech
            ? "M.Tech AI"
            : "Course"
          : isBed
          ? `Teach B.Ed. Y${yr}`
          : isFyup
          ? "Teach FYUP"
          : isBtech
          ? `Teach B.Tech Y${yr}`
          : isMtech
          ? "Teach M.Tech"
          : "Teach Course";

      // Let server build full dataset (all days/times) based on options
      const payload = {
        options: {
          role: type,
          domain: selectedDomain,
          year: yr,
          class: isSchool ? schoolClass : undefined,
        },
      };

      const res = await axios.post("/api/timetable/generate", payload);
      const tt = res.data.result?.timetable || res.data.result || null;
      setTimetable(tt);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }

  // Helpers to set domain + role quickly
  const choose = (dom, role) => {
    setSelectedDomain(dom);
    setType(role);
  };

  return (
    <div className="space-y-6">
      {/* Sections selector */}
      <div className="gen-card grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* B.Ed. */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <div className="font-semibold mb-2">B.Ed.</div>
          <div className="flex gap-2 mb-3">
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "bed" && type === "student"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("bed", "student")}
            >
              <SchoolIcon fontSize="small" /> Student
            </button>
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "bed" && type === "teacher"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("bed", "teacher")}
            >
              <PersonIcon fontSize="small" /> Teacher
            </button>
          </div>
          <label className="text-xs text-slate-500">Year</label>
          <select
            value={schoolClass}
            onChange={(e) => setSchoolClass(Number(e.target.value))}
            className="w-full mt-1 rounded border border-slate-300/60 dark:border-slate-700/50 bg-transparent px-2 py-1 text-sm"
          >
            {[1, 2].map((yr) => (
              <option key={yr} value={yr}>
                Year {yr}
              </option>
            ))}
          </select>
        </div>

        {/* FYUP */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <div className="font-semibold mb-2">FYUP</div>
          <div className="flex gap-2">
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "fyup" && type === "student"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("fyup", "student")}
            >
              <SchoolIcon fontSize="small" /> Student
            </button>
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "fyup" && type === "teacher"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("fyup", "teacher")}
            >
              <PersonIcon fontSize="small" /> Teacher
            </button>
          </div>
        </div>

        {/* B.Tech */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <div className="font-semibold mb-2">B.Tech</div>
          <div className="flex gap-2 mb-3">
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "btech" && type === "student"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("btech", "student")}
            >
              <SchoolIcon fontSize="small" /> Student
            </button>
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "btech" && type === "teacher"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("btech", "teacher")}
            >
              <PersonIcon fontSize="small" /> Teacher
            </button>
          </div>
          <label className="text-xs text-slate-500">Year</label>
          <select
            value={btechYear}
            onChange={(e) => setBtechYear(Number(e.target.value))}
            className="w-full mt-1 rounded border border-slate-300/60 dark:border-slate-700/50 bg-transparent px-2 py-1 text-sm"
          >
            {[1, 2, 3, 4].map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </div>

        {/* M.Tech */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <div className="font-semibold mb-2">M.Tech</div>
          <div className="flex gap-2">
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "mtech" && type === "student"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("mtech", "student")}
            >
              <SchoolIcon fontSize="small" /> Student
            </button>
            <button
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                selectedDomain === "mtech" && type === "teacher"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
              onClick={() => choose("mtech", "teacher")}
            >
              <PersonIcon fontSize="small" /> Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Generate controls */}
      <div className="gen-card flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">
          Selected: {selectedDomain} / {type}
          {selectedDomain === "bed" ? ` / Year ${schoolClass}` : ""}
          {selectedDomain === "btech" ? ` / Year ${btechYear}` : ""}
        </span>
        <button
          disabled={loading}
          onClick={generate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white disabled:opacity-60"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>

      {/* Result */}
      <div className="gen-card">
        {timetable ? (
          <WeekGrid
            slots={timetable.flat || timetable.slots || []}
            type={type}
          />
        ) : (
          <div className="text-slate-500">
            No timetable yet. Select a section and click Generate.
          </div>
        )}
      </div>
    </div>
  );
}
