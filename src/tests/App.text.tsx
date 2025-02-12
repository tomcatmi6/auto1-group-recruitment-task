import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router";

describe("App component", () => {
  it("renders Header, main Container, and Footer", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const banner = screen.getByRole("banner");
    expect(banner).toBeInTheDocument();

    const mainContainer = screen.getByRole("main");
    expect(mainContainer).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it('renders PanelHost at the root path ("/")', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Available cars/i)).toBeInTheDocument();
  });

  it("renders ErrorPage for unknown routes", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    window.history.pushState({}, "Test page", "/unknown-path");

    expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
  });
});
