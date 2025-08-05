//* src/types/scene.ts
export type Choice = {
  text: string;
  nextSceneId: string;
};

export type Scene = {
  id: string;
  text: string;
  choices: Choice[];
};

export type StoryTree = Record<string, Scene>;