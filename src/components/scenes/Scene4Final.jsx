import { useEffect, useRef, useState } from "react";
import "../../styles/scene4.css";

export default function Scene4Final({ onRestart }) {
  const canvasRef = useRef(null);

  const [draw, setDraw] = useState(false);
  const [fireworksOn, setFireworksOn] = useState(false);
  const [petalsOn, setPetalsOn] = useState(false);
  const [heartbeatOn, setHeartbeatOn] = useState(false);
  const [candleOn, setCandleOn] = useState(false);

  const [fadeOut, setFadeOut] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  /* ✍️ Start handwriting */
  useEffect(() => {
    const t = setTimeout(() => setDraw(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* 🎆 Fireworks AFTER name finishes */
  useEffect(() => {
    if (!draw) return;
    const t = setTimeout(() => setFireworksOn(true), 7200);
    return () => clearTimeout(t);
  }, [draw]);

  /* 🎵 Midnight audio swell */
  useEffect(() => {
    if (!candleOn) return;

    const audio = new Audio("/audio/midnight.mp3");
    audio.volume = 0;
    audio.play();

    const fade = setInterval(() => {
      audio.volume = Math.min(audio.volume + 0.02, 0.6);
    }, 200);

    return () => {
      clearInterval(fade);
      audio.pause();
    };
  }, [candleOn]);

  /* 🌑 Final emotional ending timing */
  useEffect(() => {
    if (!candleOn) return;

    const whisperT = setTimeout(() => setShowWhisper(true), 6000);
    const fadeT = setTimeout(() => setFadeOut(true), 12000);
    const replayT = setTimeout(() => setShowReplay(true), 16000);

    return () => {
      clearTimeout(whisperT);
      clearTimeout(fadeT);
      clearTimeout(replayT);
    };
  }, [candleOn]);

  /* 🎆 FIREWORKS ENGINE */
  useEffect(() => {
    if (!fireworksOn) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "#ffb703",
      "#ffd166",
      "#ef476f",
      "#06d6a0",
      "#8ecae6",
      "#f1faee"
    ];

    let fireworks = [];
    let animationFrame;
    let heartLaunched = false;

    class Rocket {
      constructor(x, y, targetY, heart = false) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.speed = 8;
        this.heart = heart;
        this.exploded = false;
        this.particles = [];
      }

      update() {
        if (!this.exploded) {
          this.y -= this.speed;
          if (this.y <= this.targetY) this.explode();
        } else {
          this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02;
            p.life--;
          });
        }
      }

      explode() {
        this.exploded = true;

        if (this.heart) {
          for (let i = 0; i < 140; i++) {
            const t = (i / 140) * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y =
              13 * Math.cos(t) -
              5 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t);

            this.particles.push({
              x: this.x,
              y: this.y,
              vx: x * 0.16,
              vy: -y * 0.16,
              life: 120,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }

          setTimeout(() => setPetalsOn(true), 1200);
          setTimeout(() => setHeartbeatOn(true), 1600);
          setTimeout(() => setCandleOn(true), 2200);
        } else {
          for (let i = 0; i < 80; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = Math.random() * 3 + 2;
            this.particles.push({
              x: this.x,
              y: this.y,
              vx: Math.cos(a) * s,
              vy: Math.sin(a) * s,
              life: 90,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
      }

      draw() {
        if (!this.exploded) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(this.x, this.y, 2, 14);
        } else {
          this.particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 2, 2);
          });
        }
      }

      isDead() {
        return this.exploded && this.particles.every(p => p.life <= 0);
      }
    }

    function launchWave() {
      for (let i = 0; i < 4; i++) {
        fireworks.push(
          new Rocket(
            canvas.width * (0.2 + Math.random() * 0.6),
            canvas.height,
            canvas.height * (0.25 + Math.random() * 0.2)
          )
        );
      }

      if (!heartLaunched) {
        heartLaunched = true;
        fireworks.push(
          new Rocket(
            canvas.width / 2,
            canvas.height,
            canvas.height * 0.28,
            true
          )
        );
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(5, 8, 18, 0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach(f => {
        f.update();
        f.draw();
      });
      fireworks = fireworks.filter(f => !f.isDead());
      animationFrame = requestAnimationFrame(animate);
    }

    launchWave();
    animate();
    const interval = setInterval(launchWave, 1800);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [fireworksOn]);

  return (
    <div className="scene scene4">
      <canvas ref={canvasRef} className="fireworks-canvas" />
      <div className="scene4-stars" />

      {petalsOn && (
        <div className="petals">
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="petal"
              style={{
                "--petal-left": `${(i * 37) % 100}%`,
                "--petal-size": `${8 + (i % 4) * 3}px`,
                "--petal-duration": `${12 + (i * 7) % 11}s`,
                "--petal-delay": `${-((i * 5) % 22)}s`,
              }}
            />
          ))}
        </div>
      )}

      {candleOn && <div className="candle-glow" />}

      <div className="scene4-content">
        <svg
          viewBox="0 0 800 240"
          className={`name-svg ${draw ? "draw" : ""} ${
            heartbeatOn ? "heartbeat" : ""
          }`}
        >
          <defs>
            <linearGradient id="birthday-gradient"><stop offset="0%" stopColor="#ffc2d5" /><stop offset="100%" stopColor="#d86676" /></linearGradient>
          </defs>
          <text x="50%" y="55%" textAnchor="middle" className="name-text">
            Aiman’s 21st
          </text>

          <text x="50%" y="82%" textAnchor="middle" className="from-text show">
            — from Mayyar Abbad
          </text>
        </svg>
      </div>

      {showWhisper && (
        <div className="whisper-text">
          Some moments are meant to stay forever.
        </div>
      )}

      <div className={`scene4-fade ${fadeOut ? "show" : ""}`} />

      {showReplay && (
        <button
        className="restart-btn"
        onClick={(e) => {
            e.stopPropagation();
            onRestart();
         }}
        >
         Restart the Night ✨
        </button>

      )}
    </div>
  );
}
