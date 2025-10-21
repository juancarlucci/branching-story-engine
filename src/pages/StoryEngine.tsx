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
      {history.length > 0 && (
        <div className="path-history">
          <strong>Path so far:</strong>{" "}
          {history.map((scene) => scene.id).join(" → ")} → {currentScene.id}
        </div>
      )}
      <div className="traversal-columns">
  {/* BFS Column */}
  <div className="traversal-panel">
    <button className="explanation-toggle" onClick={() => setShowExplanation(!showExplanation)}>
      {showExplanation ? "Hide BFS Explanation" : "Why BFS?"}
    </button>

    {showExplanation && (
      <div className="bfs-explanation">
        <p>
          This engine uses <strong>Breadth-First Search (BFS)</strong> to discover all scenes reachable from the current one.
          This is useful for debugging, visualizing alternate endings, and building full story maps.
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
  </div>

  {/* DFS Column */}
  <div className="traversal-panel">
    <div className="path-history">
      <h2>Current Path (DFS):</h2>
      <p>
        {history.map((scene) => scene.id).join(" → ")} → <strong>{currentScene.id}</strong>
      </p>
    </div>

    <div className="dfs-explanation">
      <p>
        This path is derived via <strong>Depth-First Search (DFS)</strong> — exploring each scene deeply along one path before backtracking.
        It's ideal for simulating linear story immersion or alternate endings, just like Galatea's chat narratives.
      </p>
    </div>
  </div>
</div>

    </main>
  );
}

