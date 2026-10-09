import { useState } from "react";
import { letters } from "./letters";
import EnvelopeCard from "../ui/EnvelopeCard";
import ParallaxTitle from "../ui/ParallaxTitle";

export default function Scene3Letters({ onNext }) {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [unlocked, setUnlocked] = useState(0);
  const [lastLetterOpened, setLastLetterOpened] = useState(false);

  const handleOpen = (index) => {
    // already open → do nothing
    if (openedIndex === index) return;

    setOpenedIndex(index);

    // unlock next letter only once
    if (index === unlocked) {
      setUnlocked((prev) => prev + 1);
    }

    // mark that final letter has been opened
    if (index === letters.length - 1) {
      setLastLetterOpened(true);
    }
  };

  const handleClose = () => {
    setOpenedIndex(null);

    // if final letter was read → wait for close animation, then advance
    if (lastLetterOpened) {
      setTimeout(() => {
        onNext();
      }, 1200); // ⏳ MUST match close animation duration
    }
  };

  return (
    <div className="scene3">
      <ParallaxTitle />

      <div className="grid">
        {letters.map((letter, index) => (
          <EnvelopeCard
            key={letter.id}
            letter={letter}
            isOpen={openedIndex === index}
            locked={index > unlocked}
            onOpen={() => handleOpen(index)}
            onClose={handleClose}
          />
        ))}
      </div>

      <style>
        {`
        .scene3 {
          min-height: 100vh;
          padding-top: 60px;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
          padding: 0 24px;
        }
        `}
      </style>
    </div>
  );
}
