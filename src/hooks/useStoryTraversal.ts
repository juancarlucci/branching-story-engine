//* src/hooks/useStoryTraversal.ts
import { useState } from "react";
import type { StoryTree, Scene } from "../types/scene";

export function useStoryTraversal(storyTree: StoryTree) {
  const [history, setHistory] = useState<Scene[]>([]);
  const [currentId, setCurrentId] = useState("start");

  const currentScene = storyTree[currentId];

  const goToScene = (id: string) => {
    const next = storyTree[id];
    if (next) {
      setHistory((prev) => [...prev, currentScene]);
      setCurrentId(id);
    }
  };

  const backtrack = () => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentId(last.id);
    }
  };

  const reset = () => {
    setHistory([]);
    setCurrentId("start");
  };

  return { currentScene, goToScene, backtrack, reset, history };
}