import { lazy, Suspense, useState } from "react";
import { letters } from "./letters";
import "./Scene3Aquarium.css";

const AquariumEffects = lazy(() => import("./AquariumEffects"));

const captions = [
  "A little hello, just for you.",
  "For your little chef era.",
  "For every big sister moment.",
  "One more birthday memory.",
  "A small check-in from today.",
  "A note from someone who cares about you.",
];

export default function Scene3Aquarium({ onNext }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex === null ? null : letters[selectedIndex];

  return (
    <section className="aquarium-scene" aria-labelledby="aquarium-title">
      <Suspense fallback={null}><AquariumEffects /></Suspense>
      <div className="aquarium-content">
        <p className="aquarium-eyebrow">A little stop along the way</p>
        <h1 id="aquarium-title">A sea of memories</h1>
        <p className="aquarium-instruction">Tap a fish to see what it carries.</p>

        <div className="aquarium-fish-grid">
          {letters.map((letter, index) => (
            <button
              className="aquarium-fish"
              type="button"
              key={letter.id}
              aria-label={`Explore ${letter.title.trim()}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              style={{ "--fish-delay": `${index * -0.65}s` }}
            >
              <span className="aquarium-fish-art"><img src="/fish-portrait.png" alt="" /></span>
              <span className="aquarium-fish-label">{letter.title.trim()}</span>
            </button>
          ))}
        </div>

        <div className="aquarium-memory" aria-live="polite">
          {selected ? (
            <>
              <div>
                <h2>{selected.title.trim()}</h2>
                <p>{captions[selectedIndex]}</p>
              </div>
            </>
          ) : (
            <p>Each fish has a little something for you.</p>
          )}
        </div>

        {selected && <button className="aquarium-next" type="button" onClick={onNext}>Read your letters <span aria-hidden="true">→</span></button>}
      </div>
    </section>
  );
}
