//* src/pages/StoryEngine.tsx
import React from "react";
import { storyTree } from "../data/storyTree";
import SceneView from "../components/SceneView";
import { useStoryTraversal } from "../hooks/useStoryTraversal";

export default function StoryEngine() {
  const { currentScene, goToScene, backtrack, history } = useStoryTraversal(storyTree);

  return (
    <main className="story-engine">
      <h1 className="engine-title">Galatea Story Engine</h1>
      <SceneView
        scene={currentScene}
        onChoice={goToScene}
        onBack={backtrack}
        canGoBack={history.length > 0}
      />
    </main>
  );
}
