import { useEffect, useRef } from "react";

import useSceneManager from "./hooks/useSceneManager";
import StarBackground from "./components/ui/StarBackground";

import Scene0Intro from "./components/scenes/Scene0Intro";
import Scene1Landing from "./components/scenes/Scene1Landing";
import Scene2Transition from "./components/scenes/Scene2Transition";
import Scene3Aquarium from "./components/scenes/Scene3Aquarium";
import Scene3Letters from "./components/scenes/Scene3Letter";
import Scene4Final from "./components/scenes/Scene4Final";

export default function App() {
  const { scene, nextScene, resetScene } = useSceneManager();
   const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/midnight.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    const unlockAudio = () => {
      audioRef.current?.play().catch(() => {});
      window.removeEventListener("click", unlockAudio);
    };
    window.addEventListener("click", unlockAudio);
    return () => {
      window.removeEventListener("click", unlockAudio);
      audioRef.current?.pause();
    };
  }, []);


  return (
    <>
      {/* 🌌 Background always visible */}
      <StarBackground />

      {scene === 0 && <Scene0Intro onNext={nextScene} />}
      {scene === 1 && <Scene1Landing onNext={nextScene} />}
      {scene === 2 && <Scene2Transition onNext={nextScene} />}
      {scene === 3 && <Scene3Aquarium onNext={nextScene} />}
      {scene === 4 && <Scene3Letters onNext={nextScene} />}
      {scene === 5 && <Scene4Final onRestart={resetScene} />}
    </>
  );
}

