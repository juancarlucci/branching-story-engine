import type { StoryTree } from "../types/scene";
import type { Scene } from "../types/scene";

// Breadth-First Search to get reachable scenes
export function bfsTraversal(startId: string, tree: StoryTree): Scene[] {
  const visited = new Set<string>();
  const queue: string[] = [startId];
  const result: Scene[] = [];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (!visited.has(currentId)) {
      visited.add(currentId);
      const currentScene = tree[currentId];
      if (currentScene) {
        result.push(currentScene);
        for (const choice of currentScene.choices) {
          queue.push(choice.nextSceneId);
        }
      }
    }
  }

  return result;
}

// Depth-First Search to get a path to a target scene
export function dfsPath(
  tree: StoryTree,
  targetId: string,
  currentId: string = "start",
  path: string[] = []
): string[] {
  path.push(currentId);
  if (currentId === targetId) return path;

  const currentScene = tree[currentId];
  if (!currentScene) return [];

  for (const choice of currentScene.choices) {
    const result = dfsPath(tree, targetId, choice.nextSceneId, [...path]);
    if (result.includes(targetId)) return result;
  }

  return [];
}
