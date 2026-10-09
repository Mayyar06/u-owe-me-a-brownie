export default function SanaSignature() {
  return (
    <div className="signature-wrap">
      <svg
        viewBox="0 0 900 220"
        className="signature-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sana path */}
        <path
          d="
            M120 120
            C80 40, 240 20, 220 90
            C200 150, 80 140, 140 190
            C200 230, 320 200, 300 130

            C320 70, 380 70, 400 120
            C420 170, 360 180, 380 120

            C400 60, 460 60, 480 120
            C500 180, 460 180, 480 120

            C500 60, 560 60, 580 120
            C600 180, 540 180, 560 120
          "
          className="signature-path"
        />

        {/* From text */}
        <text x="450" y="200" className="from-text">
          — from Mayyar Abbad
        </text>
      </svg>

      <style>
        {`
        .signature-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .signature-svg {
          width: 90vw;
          max-width: 700px;
        }

        .signature-path {
          stroke: #ffb6c1;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: drawName 6s ease forwards;
          filter: drop-shadow(0 0 12px rgba(255,182,193,0.6));
        }

        .from-text {
          fill: rgba(255,255,255,0.85);
          font-size: 24px;
          font-family: var(--font-romantic);
          opacity: 0;
          animation: fadeIn 2s ease forwards;
          animation-delay: 5.5s;
          text-anchor: middle;
        }

        @keyframes drawName {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        `}
      </style>
    </div>
  );
}
