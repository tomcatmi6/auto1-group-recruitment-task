import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer component", () => {
  it("renders the footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/© AUTO1 Group 2018/i)).toBeInTheDocument();
  });
});
