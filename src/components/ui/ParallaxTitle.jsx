import { useEffect, useRef } from "react";
import "./ParallaxTitle.css";

const letters = ["O", "P", "E", "N", " ", "M", "E"];
const depths = [8, 13, 18, 11, 0, 16, 9];

export default function ParallaxTitle() {
  const titleRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const tilt = (element, x, y) => {
    element.querySelectorAll(".parallax-glyph").forEach((glyph, index) => {
      const depth = depths[index];
      glyph.style.transform = `translate3d(${x * depth * 0.55}px, ${y * depth * 0.45}px, ${depth}px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
    });
  };

  const handlePointerMove = (event) => {
    const element = titleRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => tilt(element, x, y));
  };

  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current);
    if (titleRef.current) tilt(titleRef.current, 0, 0);
  };

  return (
    <h1
      className="parallax-title"
      aria-label="Open me"
      ref={titleRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {letters.map((letter, index) => (
        <span
          className={`parallax-glyph${letter === " " ? " parallax-space" : ""}`}
          key={index}
          aria-hidden="true"
          style={{ transform: `translateZ(${depths[index]}px)`, "--glyph-delay": `${index * -0.22}s` }}
        >
          <span className="parallax-glyph-face">{letter === " " ? "\u00a0" : letter}</span>
        </span>
      ))}
    </h1>
  );
}
