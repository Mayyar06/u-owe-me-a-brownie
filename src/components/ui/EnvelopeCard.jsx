export default function EnvelopeCard({
  letter,
  isOpen,
  onOpen,
  onClose,
  locked,
}) {
  return (
    <>
      {/* Envelope */}
      <div
  className={`envelope ${locked ? "locked" : ""}`}
  onClick={() => {
    if (locked || isOpen) return;
    onOpen();
  }}
>

        <div className="front">
          <span>Open me 💌</span>
        </div>
      </div>

      {/* Letter Modal (rendered OUTSIDE envelope) */}
      {isOpen && (
  <div
    className="letter-overlay"
    onClick={onClose}   // outside tap closes
  >
    <div
      className="letter"
      onClick={(e) => e.stopPropagation()} // block bubbling
    >
      <button
        className="close-btn"
        onClick={(e) => {
          e.stopPropagation(); // 🔥 THIS WAS MISSING
          onClose();
        }}
      >
        ✕
      </button>

      {letter.image && (
        <img
          src={letter.image}
          alt={letter.title}
          className="letter-image"
        />
      )}

      <h2>{letter.title}</h2>
      <p>{letter.content}</p>
    </div>
  </div>
)}


      <style>
        {`
        .envelope {
          width: 160px;
          height: 110px;
          background: repeating-linear-gradient(0deg, rgba(110,75,40,0.025) 0 1px, transparent 1px 4px), linear-gradient(145deg, #f5e8cf, #dfc9a6);
          position: relative;
          border: 1px solid #cbb58e;
          box-shadow: 0 8px 18px rgba(0,0,0,0.35), inset 0 0 0 4px rgba(255,255,255,0.15);
          border-radius: 3px;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.4s ease;
        }

        .envelope:hover {
          transform: translateY(-6px);
        }

        .envelope.locked {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .envelope::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(155deg, #f7ecd7, #d9c29d);
          clip-path: polygon(0 0, 100% 0, 50% 55%);
          pointer-events: none;
        }
        .front {
          position: relative; padding-top: 35px;
          font-family: var(--font-romantic);
          color: #934653;
          font-size: 1.1rem;
        }

        /* Overlay */
        .letter-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,4,4,0.78);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 14px;
        }

        .letter-overlay::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/letter-open-background.png") center / cover no-repeat;
          opacity: 0.3;
          pointer-events: none;
          animation: letterBackdropIn 0.5s ease-out both;
        }

        @keyframes letterBackdropIn {
          from { opacity: 0; }
          to { opacity: 0.3; }
        }

        @media (max-width: 600px) {
          .letter-overlay::before { background-position: 76% center; }
        }

        /* Letter */
        .letter {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          max-height: 92vh;
          background: repeating-linear-gradient(0deg, rgba(110,75,40,0.025) 0 1px, transparent 1px 4px), linear-gradient(135deg, #fff8e9, #efdfc3);
          color: #49362e;
          border: 1px solid #cbb58e;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 6px rgba(255,255,255,0.3);
          border-radius: 3px;
          padding: 58px 24px 30px;
          overflow-y: auto;
          text-align: center;
          animation: openLetter 0.5s ease;
        }

        .close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #e6d3b5;
          color: #643c3b;
          font-size: 18px;
          cursor: pointer;
        }

        .letter-image {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          border-radius: 2px;
          border: 6px solid #fffaf0;
          margin-bottom: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }

        .letter h2 {
          font-family: var(--font-romantic);
          color: #934653;
          margin-bottom: 16px;
          font-size: 1.7rem;
        }

        .letter p {
          font-family: var(--font-elegant);
          line-height: 1.7;
          white-space: pre-line;
          font-size: 1.05rem;
        }

        @keyframes openLetter {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .envelope {
        pointer-events: auto;
    }

        .letter-overlay {
         pointer-events: auto;
    }

        `}
      </style>
    </>
  );
}
