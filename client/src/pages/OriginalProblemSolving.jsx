import React from "react";

export default function ProblemSolving() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-3">
        Problem Solving Environment
      </h2>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        Use this workspace to analyze conflicts, constraints, and propose
        adjustments.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Detected Issues</h3>
          <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>No conflicts found (demo).</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">What-if Tools</h3>
          <p className="text-sm">
            Try changing room capacity, moving slots, or swapping faculty.
          </p>
        </div>
      </div>
    </div>
  );
}
