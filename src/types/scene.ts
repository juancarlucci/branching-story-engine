//* src/types/scene.ts
export type Choice = {
  text: string;
  nextSceneId: string;
};

export interface Scene {
  id: string;
  text: string;
  choices: { text: string; nextSceneId: string }[];
}

export type StoryTree = Record<string, Scene>;