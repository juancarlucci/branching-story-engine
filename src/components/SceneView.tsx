//* src/components/SceneView.tsx
import React from "react";
import type { Scene } from "../types/scene";

interface Props {
  scene: Scene;
  onChoice: (nextId: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export default function SceneView({ scene, onChoice, onBack, canGoBack }: Props) {
  return (
    <section className="scene-view">
      <p className="scene-text" role="region" aria-label="Scene Description">
        {scene.text}
      </p>

      <div className="choices" role="group" aria-label="Choices">
        {scene.choices.map((choice) => (
          <button
            key={choice.text}
            onClick={() => onChoice(choice.nextSceneId)}
            className="choice-button"
          >
            {choice.text}
          </button>
        ))}
      </div>

      {canGoBack && onBack && (
        <button onClick={onBack} className="back-button" aria-label="Backtrack">
          ⬅️ Go Back
        </button>
      )}
    </section>
  );
}