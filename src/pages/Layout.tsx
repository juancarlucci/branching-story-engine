// @ts-nocheck
import NavBar from "../components/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: "64px" }}>
        {children}
      </main>
    </>
  );
}
