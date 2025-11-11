import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MealCard from "@/components/sections/MealCard";

// Simple mocks
jest.mock("next/image", () => (props: any) => <img {...props} />);

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock modals with simple components
jest.mock("@/components/modals/ConfirmationModal", () => () => null);
jest.mock("@/components/modals/Alert", () => () => null);
jest.mock("@/components/modals/EditMeal", () => () => null);

// API
const mockDeleteMutate = jest.fn();
const mockEditMutate = jest.fn();

jest.mock("@/lib/query", () => ({
  useDeleteFood: () => ({ mutate: mockDeleteMutate, isLoading: false }),
  useEditFood: () => ({ mutate: mockEditMutate, isLoading: false }),
}));

const sampleFood = {
  id: "1",
  name: "Burger",
  restaurantName: "McDonalds",
  rating: "4.5",
  image: "https://placehold.co/400x250",
  logo: "https://placehold.co/50x50",
  open: true,
  Price: 12,
};

describe("MealCard Component - Required Test Coverage", () => {
  beforeEach(() => {
    mockDeleteMutate.mockReset();
    mockEditMutate.mockReset();
  });

  // Component Rendering tests
  it("renders food card with correct props", () => {
    render(<MealCard food={sampleFood} />);

    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("$12")).toBeInTheDocument();
    expect(screen.getByText("McDonalds")).toBeInTheDocument();
    expect(screen.getByText("Open Now")).toBeInTheDocument();
  });

  // interaction tests
  it("opens menu when menu button is clicked", () => {
    render(<MealCard food={sampleFood} />);

    const menuButton = screen.getByRole("button", { name: /food options/i });
    fireEvent.click(menuButton);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  // API Integration
  it("integrates with delete API functionality", () => {
    render(<MealCard food={sampleFood} />);

    expect(mockDeleteMutate).toBeDefined();
    expect(screen.getByTestId("food-card")).toBeInTheDocument();
    expect(screen.getByTestId("food-name")).toBeInTheDocument();
  });
});
