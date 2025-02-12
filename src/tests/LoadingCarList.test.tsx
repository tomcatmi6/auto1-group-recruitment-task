import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingCarList from "../components/LoadingCarList";

describe("LoadingCarList component", () => {
  it("renders 10 skeleton items with 1 image and 3 text skeletons", () => {
    render(<LoadingCarList />);
    const skeletonImageElements = screen.getAllByTestId("image-skeleton");
    expect(skeletonImageElements).toHaveLength(10);
    const skeletonTextElements = screen.getAllByTestId("text-skeleton");
    expect(skeletonTextElements).toHaveLength(30);
  });
});
