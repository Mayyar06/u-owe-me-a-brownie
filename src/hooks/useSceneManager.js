import { useState } from "react";

export default function useSceneManager() {
  // 1 → Landing
  // 2 → Transition
  // 3 → Aquarium memories
  // 4 → Letters
  // 5 → Final Fireworks

  const [scene, setScene] = useState(0);

  const nextScene = () => {
    setScene((prev) => prev + 1);
  };

  const goToScene = (number) => {
    setScene(number);
  };

  return {
    scene,
    setScene,
    nextScene,
    goToScene,
    resetScene: () => setScene(0),
  };
}
