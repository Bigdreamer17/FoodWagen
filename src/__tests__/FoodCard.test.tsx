import { render, screen, fireEvent } from "@testing-library/react";
import FoodCard from "@/components/FoodCard";
import { Food } from "@/types/food";

describe("FoodCard Component", () => {
  const mockFood: Food = {
    id: "1",
    createdAt: "2025-01-01",
    name: "Delicious Pizza",
    avatar: "https://example.com/pizza.jpg",
    rating: 4.5,
    open: true,
    logo: "https://example.com/logo.png",
    price: "$$$",
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component Rendering
  test("renders food card with expected props", () => {
    render(
      <FoodCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Check if food name is displayed
    const foodName = screen.getByText("Delicious Pizza");
    expect(foodName).toBeInTheDocument();
    expect(foodName).toHaveClass("food-name");

    // Check if rating is displayed
    expect(screen.getByText(/4.5/)).toBeInTheDocument();

    // Check if price is displayed
    expect(screen.getByText("$$$")).toBeInTheDocument();

    // Check if restaurant status is displayed
    expect(screen.getByText("Open")).toBeInTheDocument();

    // Check if menu button is present
    expect(screen.getByLabelText("Menu")).toBeInTheDocument();
  });

  // Test 2: User Interaction - Button Click
  test("calls onEdit when edit button is clicked", () => {
    render(
      <FoodCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Open the menu first
    const menuButton = screen.getByLabelText("Menu");
    fireEvent.click(menuButton);

    // Now click the edit button
    const editButton = screen.getByText("Edit Food");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockFood);
  });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <FoodCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Open the menu first
    const menuButton = screen.getByLabelText("Menu");
    fireEvent.click(menuButton);

    // Now click the delete button
    const deleteButton = screen.getByText("Delete Food");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockFood.id);
  });

  test("displays correct status badge when restaurant is closed", () => {
    const closedFood = { ...mockFood, open: false };
    render(
      <FoodCard
        food={closedFood}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Closed")).toBeInTheDocument();
  });
});
