// src/pages/StoryEngine.tsx
import React, { useState } from "react";
import { storyTree } from "../data/storyTree";
import SceneView from "../components/SceneView";
import { useStoryTraversal } from "../hooks/useStoryTraversal";
import { bfsTraversal, dfsPath } from "../lib/traversals";
import "./StoryEngine.css";

export default function StoryEngine() {
  const { currentScene, goToScene, backtrack } = useStoryTraversal(storyTree);
  const [showExplanation, setShowExplanation] = useState(false);
  const reachable = bfsTraversal(currentScene.id, storyTree);
  const path = dfsPath(storyTree, currentScene.id);

  return (
    <main className="story-engine-layout">
      <section className="story-content">
        <h1 className="engine-title">Galatea Story Engine</h1>
        <SceneView
          scene={currentScene}
          onChoice={goToScene}
          onBack={backtrack}
          canGoBack={path.length > 1}
          backLabel="← Go Back"
        />
      </section>

      <aside className="traversal-sidebar">
        <div className="traversal-panel">
          <button
            className="explanation-toggle"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? "Hide BFS Explanation" : "Why BFS?"}
          </button>

          {showExplanation && (
            <div className="bfs-explanation">
              <p>
                This engine uses <strong>Breadth-First Search (BFS)</strong> to
                discover all scenes reachable from the current one. This is
                useful for debugging, visualizing alternate endings, and
                building full story maps.
              </p>
            </div>
          )}

          <div className="reachable-list">
            <h2>Reachable Scenes:</h2>
            <ul>
              {reachable.map((scene) => (
                <li key={scene.id}>
                  <code>{scene.id}</code> — {scene.text.slice(0, 40)}…
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="traversal-panel">
          <div className="path-history">
            <h2>Current Path (DFS):</h2>
            <p>{path.join(" → ")}</p>
          </div>

          <div className="dfs-explanation">
            <p>
              This path is derived via <strong>Depth-First Search (DFS)</strong>{" "}
              — exploring each scene deeply along one path before backtracking.
              It's ideal for simulating linear story immersion or alternate
              endings — commonly used in chat-based or character-driven
              narratives.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
