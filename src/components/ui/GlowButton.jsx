export default function GlowButton({ text, onClick }) {
  return (
    <button className="glow-btn" onClick={onClick}>
      {text}
      <style>
        {`
        .glow-btn {
          padding: 18px 32px;
          font-size: 1.2rem;
          border-radius: 999px;
          border: none;
          background: rgba(243,164,200,0.15);
          color: white;
          cursor: pointer;
          animation: glowPulse 3s infinite;
          transition: transform 0.3s ease;
        }
        .glow-btn:hover {
          transform: scale(1.05);
        }
      `}
      </style>
    </button>
  );
}
