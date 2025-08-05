// src/data/storyTree.ts
import { StoryTree } from "../types/scene";

export const storyTree: StoryTree = {
  start: {
    id: "start",
    text: "You wake up in a dark forest...",
    choices: [
      { text: "Follow the path", nextSceneId: "path" },
      { text: "Stay put", nextSceneId: "stay" },
    ],
  },
  path: {
    id: "path",
    text: "The path winds deeper into the trees...",
    choices: [{ text: "Keep walking", nextSceneId: "clearing" }],
  },
  stay: {
    id: "stay",
    text: "You stay still. Something howls nearby...",
    choices: [{ text: "Run!", nextSceneId: "path" }],
  },
  clearing: {
    id: "clearing",
    text: "A clearing opens up, sunlight pouring in...",
    choices: [],
  },
};
