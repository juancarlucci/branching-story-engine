import { render, screen, waitFor } from "@testing-library/react";
import DataTable from "../components/DataTable-07-pagination";

// Set up mock before each test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Leanne Graham",
            email: "leanne@example.com",
            company: { name: "Graham Co." },
          },
        ]),
    })
  );
});

// Clean up after each test
afterEach(() => {
  jest.resetAllMocks();
});

test("renders user data after fetch", async () => {
  render(<DataTable />);
  await waitFor(() => {
    expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
  });
});
