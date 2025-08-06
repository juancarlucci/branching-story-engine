// src/__tests__/StoryEngine.jest.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import StoryEngine from "../pages/StoryEngine";
import "@testing-library/jest-dom";

// 🧪 Test 1: Starting scene renders correctly
test("renders the starting scene", () => {
  render(<StoryEngine />);
  const scenes = screen.getAllByText(/You wake beneath blood-colored skies/i);
  expect(scenes.length).toBeGreaterThan(0);
});

// 🧪 Test 2: Navigates forward correctly
test("navigates forward via a user choice", () => {
  render(<StoryEngine />);
  const lookAroundBtn = screen.getByRole("button", { name: /look around/i });
  fireEvent.click(lookAroundBtn);
  const followups = screen.getAllByText(/Around you, a desolate forest twists/i);
  expect(followups.length).toBeGreaterThan(0);
});

// 🧪 Test 3: Backtrack returns to the previous scene
test("goes back to previous scene using Go Back button", () => {
  render(<StoryEngine />);
  const lookAroundBtn = screen.getByRole("button", { name: /look around/i });
  fireEvent.click(lookAroundBtn);
  const backBtn = screen.getByRole("button", { name: /go back/i });
  fireEvent.click(backBtn);
  const origin = screen.getAllByText(/You wake beneath blood-colored skies/i);
  expect(origin.length).toBeGreaterThan(0);
});

// 🧪 Test 4: BFS and DFS panels are visible
test("renders traversal side panels with reachable scenes and DFS path", () => {
  render(<StoryEngine />);
  expect(screen.getByText(/Reachable Scenes/i)).toBeInTheDocument();
  expect(screen.getByText(/Current Path \(DFS\)/i)).toBeInTheDocument();
});
