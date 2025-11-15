import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { foodApi } from "@/lib/api";
import { Food } from "@/types/food";

// Mock the API module
jest.mock("@/lib/api", () => ({
  foodApi: {
    getFoods: jest.fn(),
    searchFoods: jest.fn(),
    createFood: jest.fn(),
    updateFood: jest.fn(),
    deleteFood: jest.fn(),
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, fill, ...rest } = props;
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...rest} />;
  },
}));

describe("Home Page", () => {
  const mockFoods: Food[] = [
    {
      id: "1",
      createdAt: "2025-01-01",
      name: "Delicious Pizza",
      avatar: "https://example.com/pizza.jpg",
      rating: 4.5,
      open: true,
      logo: "https://example.com/logo.png",
      price: "$$$",
    },
    {
      id: "2",
      createdAt: "2025-01-02",
      name: "Tasty Burger",
      avatar: "https://example.com/burger.jpg",
      rating: 4.2,
      open: false,
      logo: "https://example.com/logo2.png",
      price: "$$",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 4: API Mocking - Successful Data Fetch
  test("fetches and displays food items on load", async () => {
    // Mock successful API response
    (foodApi.getFoods as jest.Mock).mockResolvedValue(mockFoods);

    render(<Home />);

    // Check loading state
    expect(screen.getByText(/Loading delicious foods/i)).toBeInTheDocument();

    // Wait for foods to load
    await waitFor(() => {
      expect(screen.getByText("Delicious Pizza")).toBeInTheDocument();
      expect(screen.getByText("Tasty Burger")).toBeInTheDocument();
    });

    // Verify API was called
    expect(foodApi.getFoods).toHaveBeenCalledTimes(1);

    // Verify Featured Meals heading is present
    expect(screen.getByText("Featured Meals")).toBeInTheDocument();
  });

  // Test 5: API Mocking - Error Handling
  test("displays error message when API fetch fails", async () => {
    // Mock failed API response
    (foodApi.getFoods as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    render(<Home />);

    // Wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load foods. Please try again later./i)
      ).toBeInTheDocument();
    });

    // Verify API was called
    expect(foodApi.getFoods).toHaveBeenCalledTimes(1);
  });

  // Test 6: Empty State
  test("displays empty state when no foods are available", async () => {
    // Mock empty API response
    (foodApi.getFoods as jest.Mock).mockResolvedValue([]);

    render(<Home />);

    // Wait for empty state
    await waitFor(() => {
      expect(screen.getByText(/No foods found/i)).toBeInTheDocument();
    });

    // Verify empty state has proper class
    const emptyState = screen.getByText(/No foods found/i).closest("div");
    expect(emptyState).toHaveClass("empty-state-message");
  });

  // Test 7: Add Food Button
  test("renders add food button with correct test id", async () => {
    (foodApi.getFoods as jest.Mock).mockResolvedValue(mockFoods);

    render(<Home />);

    await waitFor(() => {
      const addButton = screen.getByText(/Add Meal/i);
      expect(addButton).toBeInTheDocument();
    });
  });
});
