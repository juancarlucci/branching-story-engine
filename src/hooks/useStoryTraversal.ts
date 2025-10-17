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

export function getReachableScenes(tree: StoryTree, startId: string): Scene[] {
  const visited = new Set<string>();
  const queue = [startId];
  const result: Scene[] = [];

  while (queue.length) {
    const currentId = queue.shift()!;
    if (visited.has(currentId)) continue;

    const scene = tree[currentId];
    if (scene) {
      result.push(scene);
      visited.add(currentId);
      scene.choices.forEach(choice => {
        if (!visited.has(choice.nextSceneId)) {
          queue.push(choice.nextSceneId);
        }
      });
    }
  }

  return result;
}