import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FancyHeader({
  onGenerate,
  onExportXlsx,
  onExportPdf,
  disableExports,
}) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".logo", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(".title", { y: 10, opacity: 0, duration: 0.6 }, "-=0.1")
        .from(".sub", { y: 8, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(
          ".cta",
          { scale: 0.9, opacity: 0, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        );
      gsap.to(".glow", {
        opacity: 0.9,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="container" style={{ position: "relative" }}>
      <div
        className="glow"
        style={{
          position: "absolute",
          inset: -40,
          background:
            "radial-gradient(600px 200px at 10% -10%, rgba(95,118,255,0.22), transparent)",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
      <div className="header">
        <div className="logo badge">NEP</div>
        <h1 className="title">Timetable Generator</h1>
      </div>
      <p className="sub">
        Generate conflict-free schedules with smart optimization and export them
        to Excel or PDF.
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="btn cta" id="btn-generate" onClick={onGenerate}>
          Generate
        </button>
        <button
          className="btn secondary cta"
          id="btn-xlsx"
          onClick={onExportXlsx}
          disabled={disableExports}
        >
          Export Excel
        </button>
        <button
          className="btn secondary cta"
          id="btn-pdf"
          onClick={onExportPdf}
          disabled={disableExports}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
