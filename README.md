# 🌿 branching-story-engine

> **React | TypeScript | Tree Traversal | Accessibility | Responsive Design**
> A partial clone of the Galatea app homepage and story engine — built to demonstrate alignment with Inkitt's frontend architecture and product vision.

---

### Homepage
![Homepage Screenshot](/screenshots/homepage.png)

### Story Engine View
![Story Engine Screenshot](/screenshots/story-engine.png)

---

## 📘 About

**branching-story-engine** is an interactive branching narrative app built in React + TypeScript.
It mimics the immersive storytelling structure used in apps like **Galatea**, including a choice-driven scene flow.

---

## 🎯 Purpose

Built as a technical capstone for a frontend interview with **Inkitt**, this project demonstrates:

* ⚛️ React proficiency
* 🌳 Real-world tree traversal (BFS & DFS)
* 🎝️ UI/UX empathy for interactive storytelling
* ♿️ Accessible, responsive component design

---

## 🧱 Features

* 📖 Scene-based story rendering from a JSON tree
* 🔀 Choice-driven navigation with branching paths
* 🧠 **BFS**: Preview all reachable future scenes
* 🧵 **DFS**: Track the current story path (root to current)
* 🗘️ Responsive layout with light UX polish
* ♿ Accessible buttons, ARIA roles, and keyboard nav

---

## 🧠 Architecture Overview

The app uses locally mocked data (`mockBooks.js` and `storyTree.ts`) to simulate a real-world backend. Originally, I started with a basic utility module (`bookService.js`) to keep things modular. But as the UI evolved and required richer data (like nested genres and chapters), I transitioned to directly importing full mock datasets for flexibility during development.

To demonstrate real-world data fetching, I refactored the `BookDetail` component to use **React Query**, even though it still pulls from mock data. This simulates async fetching with latency, enables caching, and shows how I’d scale the app with a real API later.

### Common Questions & Answers

**Q: Why React Query for mock data?**  
Because it lets me simulate real-world async flows: loading states, caching, etc. It's future-proof — I could swap in `fetch` or Axios without rewriting UI logic.

**Q: Why not Context or Zustand?**  
I considered them, but the state is mostly local, and the app is read-heavy. Zustand or Context would be more useful if multiple components needed to sync shared state, like filters or bookmarks.

---

## 🧰 Architecture - structure

```
src/
├── components/
│   ├── SceneView.tsx        // Story node UI
│   ├── D3TreeViewer.tsx     // Optional: tree visualization
├── data/
│   └── storyTree.ts         // Story graph definition
├── hooks/
│   └── useStoryTraversal.ts // Custom hook with BFS + DFS logic
├── pages/
│   └── StoryEngine.tsx      // Story engine main entry
├── types/
│   └── scene.ts             // Scene + tree typings
├── styles/
│   └── *.css                // Theme tokens + layout
```

---

## 🚀 Run It Locally

```bash
npm install
npm run dev
```

Then open your browser to [http://localhost:3000/story](http://localhost:3000/story)

---

## 🦪 Testing

This project uses **Jest** and **React Testing Library** for unit tests.

```bash
npm test
```

### ✅ Covered tests:

* Scene rendering on load
* Navigation via user choice
* Backtracking to previous scene
* BFS and DFS panels render correctly

---

## 🤖 BFS vs DFS

**BFS** (Breadth-First Search):
Used to preview *all reachable scenes* from the current node — helpful for mapping story structure or debugging logic.

**DFS** (Depth-First Search):
Used to model the *user’s current path* — a single immersive storyline, from root to current scene. Ideal for alternate endings or nonlinear depth.

---

## 🗭 Inspiration

This project is partially styled and functionally inspired by **[Galatea](https://galatea.com)** — but was built from scratch as an engineering interview artifact and learning exercise.

---
