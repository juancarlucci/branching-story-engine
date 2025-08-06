# 🌿 branching-story-engine

> **React | TypeScript | Tree Traversal | Accessibility | Responsive Design**  
> A partial clone of the Galatea app homepage and story engine — built to demonstrate alignment with Inkitt's frontend architecture and product vision.

---

## 📘 About

**branching-story-engine** is an interactive branching narrative app built in React + TypeScript.  
It mimics the immersive storytelling structure used in apps like **Galatea**, including a choice-driven scene flow and optional tree visualization.

---

## 🎯 Purpose

Built as a technical capstone for a frontend interview with **Inkitt**, this project demonstrates:

- ⚛️ React proficiency
- 🌳 Real-world tree traversal (BFS & DFS)
- 🎭 UI/UX empathy for interactive storytelling
- ♿️ Accessible, responsive component design

---

## 🧱 Features

- 📖 Scene-based story rendering from a JSON tree  
- 🔀 Choice-driven navigation with branching paths  
- 🧠 **BFS**: Preview all reachable future scenes  
- 🧵 **DFS**: Track the current story path (root to current)  
- 🗺️ Responsive layout with light UX polish  
- ♿ Accessible buttons, ARIA roles, and keyboard nav

---

## 🧠 Architecture

src/
├── components/
│ ├── SceneView.tsx // Story node UI
│ ├── D3TreeViewer.tsx // Optional: tree visualization
├── data/
│ └── storyTree.ts // Story graph definition
├── hooks/
│ └── useStoryTraversal.ts // Custom hook with BFS + DFS logic
├── pages/
│ └── StoryEngine.tsx // Story engine main entry
├── types/
│ └── scene.ts // Scene + tree typings
├── styles/
│ └── *.css // Theme tokens + layout

## 🚀 Run It Locally
npm install
npm run dev

#### Navigate to /story in your browser to start reading.

## 🧪 BFS vs DFS Usage

### BFS (Breadth-First Search):
Used to preview all reachable scenes from the current scene — helpful for mapping story structure or debugging branching logic.

### DFS (Depth-First Search):
Used to model the user’s current path — a single storyline, from root to current scene. Ideal for simulating immersive reads or alternate endings.

