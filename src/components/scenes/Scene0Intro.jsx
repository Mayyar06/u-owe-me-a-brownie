import { useEffect } from "react";
import SwirlingStars from "../ui/SwirlingStars";

export default function Scene0Intro({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 12000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="intro-scene">
      <SwirlingStars />
      <p>This was specifically requested for you cause you deserve this and much much more I love u queen😘</p>
    </div>
  );
}
