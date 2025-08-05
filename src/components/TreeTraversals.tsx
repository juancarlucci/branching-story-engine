// src/components/TreeTraversals.tsx
import { useState } from "react";
import { sampleTree } from "../data/treeData";
import type { TreeNode } from "../types";
import D3TreeViewer from "./D3TreeViewer";
import "../App.css";

const bfsCodeLines = [
  "function bfs(root) {",
  "  const queue = [root];",
  "  while (queue.length > 0) {",
  "    const current = queue.shift();",
  "    visit(current);",
  "    for (const child of current.children) {",
  "      queue.push(child);",
  "    }",
  "  }",
  "}",
];

const bfsComments = [
  "Define the BFS traversal function.",
  "Initialize the queue with the root node.",
  "Loop while the queue is not empty.",
  "Remove the first node from the queue.",
  "Visit the current node.",
  "Iterate over the current node's children.",
  "Add each child to the end of the queue.",
  "End of children loop.",
  "End of queue loop.",
  "End of function.",
];

const dfsCodeLines = [
  "function dfs(root) {",
  "  const stack = [root];",
  "  while (stack.length > 0) {",
  "    const current = stack.pop();",
  "    visit(current);",
  "    for (const child of [...current.children].reverse()) {",
  "      stack.push(child);",
  "    }",
  "  }",
  "}",
];

const dfsComments = [
  "Define the DFS traversal function.",
  "Initialize the stack with the root node.",
  "Loop while the stack is not empty.",
  "Remove the last node from the stack.",
  "Visit the current node.",
  "Iterate over children in reverse order.",
  "Add each child to the top of the stack.",
  "End of children loop.",
  "End of stack loop.",
  "End of function.",
];

export default function TreeTraversals() {
  //* 'queue' and 'visited' represent internal state of the traversal
  const [queue, setQueue] = useState<TreeNode[]>([sampleTree]);
  const [visited, setVisited] = useState<number[]>([]);
  const [lastCurrent, setLastCurrent] = useState<TreeNode | null>(null);
  const [traversalMode, setTraversalMode] = useState<"bfs" | "dfs">("bfs");
  const [stepCount, setStepCount] = useState<number>(0);

  const step = () => {
    if (queue.length === 0) return;
    let current: TreeNode;
    let rest: TreeNode[];

    if (traversalMode === "bfs") {
      //* BFS uses a queue (FIFO) — take from front, add to end
      [current, ...rest] = queue;
      rest.push(...(current.children || []));
    } else {
      //* DFS uses a stack (LIFO) — take from end, add to end (after reversing children)
      current = queue[queue.length - 1];
      rest = queue.slice(0, -1);
      const children = current.children ? [...current.children].reverse() : [];
      rest.push(...children);
    }

    setVisited((prev) => [...prev, current.value]);
    setQueue(rest);
    setLastCurrent(current);
    setStepCount((prev) => Math.min(prev + 1, 9));
  };

  const reset = () => {
    setQueue([sampleTree]);
    setVisited([]);
    setLastCurrent(null);
    setStepCount(0);
  };

  const toggleMode = () => {
    reset();
    setTraversalMode((prev) => (prev === "bfs" ? "dfs" : "bfs"));
  };

  const codeLines = traversalMode === "bfs" ? bfsCodeLines : dfsCodeLines;
  const codeComments = traversalMode === "bfs" ? bfsComments : dfsComments;

  return (
    <div className="traversal-container">
      <h2 className="title">{traversalMode.toUpperCase()} Tree Traversal</h2>

      <div className="button-row">
        <button onClick={step} className="btn">
          Next Step
        </button>
        <button onClick={reset} className="btn secondary">
          Reset
        </button>
        <button onClick={toggleMode} className="btn secondary">
          Mode: {traversalMode.toUpperCase()}
        </button>
      </div>

      <div className="panel-wrapper">
        <div className="panel" aria-labelledby="panel-heading">
          <h3 id="panel-heading">
            <strong>Current:</strong> {lastCurrent?.value ?? "N/A"}
          </h3>
          <div>
            <strong>
              {traversalMode === "bfs" ? "Queue (FIFO):" : "Stack (LIFO):"}
            </strong>
            <div
              className="structure-view"
              style={{
                flexDirection:
                  traversalMode === "dfs" ? "column-reverse" : "row",
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {queue.map((node, idx) => (
                <div key={node.value} className="structure-item">
                  {traversalMode === "dfs" ? queue.length - idx : idx + 1}.{" "}
                  {node.value}
                </div>
              ))}
            </div>
          </div>
          <p>
            <strong>Order Visited:</strong> {visited.join(" → ")}
          </p>
        </div>

        <div id="right-panel" className="panel">
          <h3>How {traversalMode.toUpperCase()} Works</h3>
          <pre className="code-block">
            {codeLines.map((line, idx) => (
              <div
                key={idx}
                className={`code-line ${idx === stepCount ? "highlight" : ""}`}
              >
                <span className="code-pointer">
                  {idx === stepCount ? "👉" : ""}
                </span>{" "}
                {line}
                <div className="comment">
                  {idx === stepCount ? codeComments[idx] : null}
                </div>
              </div>
            ))}
          </pre>
          <p className="note">
            <strong>{traversalMode.toUpperCase()}</strong> uses a{" "}
            <strong>
              {traversalMode === "bfs" ? "queue (FIFO)" : "stack (LIFO)"}
            </strong>
            .
            <br />
            <strong>Time:</strong> O(n), <strong>Space:</strong> O(w) or O(h)
          </p>
        </div>
      </div>

      <div className="tree-section">
        <h3>Tree Structure</h3>
        <section className="tree-viewer">
          <D3TreeViewer
            root={sampleTree}
            currentId={lastCurrent?.value}
            visited={visited}
          />
        </section>
      </div>
    </div>
  );
}
