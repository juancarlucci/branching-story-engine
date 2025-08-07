import { JSX, ReactNode } from "react";
import "./SectionWrapper.css";

interface SectionWrapperProps {
  children: ReactNode;
}

export default function SectionWrapper({
  children,
}: SectionWrapperProps): JSX.Element {
  return <section className="section-wrapper">{children}</section>;
}
