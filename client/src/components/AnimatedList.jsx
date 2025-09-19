import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedList({ items }) {
  const container = useRef(null);

  useEffect(() => {
    if (!items?.length) return;
    const ctx = gsap.context(() => {
      gsap.from(".li-item", {
        opacity: 0,
        y: 10,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05,
      });
    }, container);
    return () => ctx.revert();
  }, [items]);

  return (
    <ul className="list" ref={container}>
      {items.map((txt, i) => (
        <li className="li-item" key={i}>
          {txt}
        </li>
      ))}
    </ul>
  );
}
