//* src/components/SceneView.tsx
import type { Scene } from "../types/scene";
import "./SceneView.css";

interface Props {
  scene: Scene;
  onChoice: (nextId: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  backLabel?: string;
}

export default function SceneView({
  scene,
  onChoice,
  onBack,
  canGoBack,
  backLabel,
}: Props) {
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
       <button className="back-button" onClick={onBack}>
  {backLabel || "← Go Back"}
</button>

      )}
    </section>
  );
}
