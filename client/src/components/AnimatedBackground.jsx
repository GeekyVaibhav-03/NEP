import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Fixed, animated gradient blobs background
export default function AnimatedBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.to(".bg-blur", {
        xPercent: (i) => (i % 2 === 0 ? 20 : -15),
        yPercent: (i) => (i % 2 === 0 ? -10 : 18),
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <div
        className="bg-blur"
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          left: -140,
          top: -120,
          filter: "blur(80px)",
          background:
            "radial-gradient(circle at 30% 30%, rgba(95,118,255,0.35), transparent 60%)",
        }}
      />
      <div
        className="bg-blur"
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          right: -120,
          bottom: -140,
          filter: "blur(90px)",
          background:
            "radial-gradient(circle at 70% 70%, rgba(255,118,205,0.28), transparent 60%)",
        }}
      />
    </div>
  );
}
