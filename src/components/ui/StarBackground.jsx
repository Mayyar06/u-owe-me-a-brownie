const stars = Array.from({ length: 120 }, () => ({
  size: Math.random() * 2 + 1,
  duration: Math.random() * 20 + 20,
  delay: Math.random() * 20,
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

export default function StarBackground() {
  return (
    <div className="stars">
      {stars.map(({ size, duration, delay, left, top }, i) => (
          <span
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
      ))}

      <style>
        {`
        .stars {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: -1;
        }

        .stars span {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation:
            twinkle 4s ease-in-out infinite,
            fall linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
}
