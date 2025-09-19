import React from "react";
import AnimatedList from "./AnimatedList.jsx";

export default function ResultPanel({ result }) {
  return (
    <div className="card" id="result">
      <h3 style={{ marginTop: 0 }}>Result (by Program)</h3>
      {!result && <p className="sub">No result yet. Click Generate.</p>}
      {result && (
        <div>
          {Object.keys(result.byProgram).map((p) => (
            <div key={p} style={{ marginBottom: 12 }}>
              <h4>{p}</h4>
              {Object.entries(result.byProgram[p]).map(([cid, sessions]) => (
                <div key={cid}>
                  <strong>{cid}</strong>
                  <AnimatedList
                    items={sessions.map(
                      (s) =>
                        `${s.timeslot.day} ${s.timeslot.start}-${s.timeslot.end} | ${s.room.name} | ${s.faculty.name}`
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
