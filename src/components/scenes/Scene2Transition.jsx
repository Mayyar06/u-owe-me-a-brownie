import { useEffect } from "react";

export default function Scene2Transition({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2500); // emotional pause

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="scene2">
      <div className="text">
        Let’s rewatch some old memories, shall we ❤️
      </div>

      <style>
        {`
        .scene2 {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          animation: fadeIn 1.5s ease-in-out;
        }

        .scene2 .text {
          font-family: var(--font-romantic);
          font-size: 2rem;
          color: var(--pink);
          animation: floatUp 1.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        `}
      </style>
    </div>
  );
}
