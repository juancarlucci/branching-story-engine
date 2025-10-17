//* src/pages/StoryEngine.tsx
import { useState } from "react";
import { storyTree } from "../data/storyTree";
import SceneView from "../components/SceneView";
import { useStoryTraversal, getReachableScenes } from "../hooks/useStoryTraversal";
import "./StoryEngine.css";

export default function StoryEngine() {
  const { currentScene, goToScene, backtrack, history } = useStoryTraversal(storyTree);
  const [showExplanation, setShowExplanation] = useState(false);

  const reachable = getReachableScenes(storyTree, currentScene.id);

  return (
    <main className="story-page">
      <h1 className="story-heading">Galatea Story Engine</h1>

      <div className="scene-container">
        <SceneView
          scene={currentScene}
          onChoice={goToScene}
          onBack={backtrack}
          canGoBack={history.length > 0}
        />
      </div>

      <button className="explanation-toggle" onClick={() => setShowExplanation(!showExplanation)}>
        {showExplanation ? "Hide Explanation" : "Why BFS?"}
      </button>

      {showExplanation && (
        <div className="bfs-explanation">
          <p>
            This story engine uses <strong>Breadth-First Search (BFS)</strong> to identify all reachable scenes from the current point in the story. 
            This ensures that even branching paths and alternate endings can be previewed or visualized — mimicking Galatea’s dynamic narrative engine.
          </p>
        </div>
      )}

      <div className="reachable-list">
        <h2>Reachable Scenes:</h2>
        <ul>
          {reachable.map(scene => (
            <li key={scene.id}>{scene.id} — {scene.text.slice(0, 40)}…</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

