import React from "react";

export default function ActionPanel({
  loading,
  result,
  error,
  onGenerate,
  onExport,
}) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Actions</h3>
      <p className="sub">Run the solver and export the results.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn" onClick={onGenerate} disabled={loading}>
          {loading ? "Solving..." : "Generate"}
        </button>
        <button
          className="btn secondary"
          onClick={() => onExport("xlsx")}
          disabled={!result}
        >
          Export Excel
        </button>
        <button
          className="btn secondary"
          onClick={() => onExport("pdf")}
          disabled={!result}
        >
          Export PDF
        </button>
      </div>
      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
    </div>
  );
}
