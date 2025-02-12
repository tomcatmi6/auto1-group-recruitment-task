import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header component", () => {
  it("renders the logo and navigation links", () => {
    render(<Header />);
    const logo = screen.getByAltText(/AUTO1\.com logo/i);
    expect(logo).toBeInTheDocument();
    expect(screen.getByText(/Purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/My Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Sell/i)).toBeInTheDocument();
  });
});
