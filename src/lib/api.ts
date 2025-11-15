import { Food, FoodFormData } from "@/types/food";

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io";

export const foodApi = {
  // Get all foods
  async getFoods(): Promise<Food[]> {
    const response = await fetch(`${API_BASE_URL}/Food`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch foods");
    }
    return response.json();
  },

  // Search foods by name
  async searchFoods(searchParam: string): Promise<Food[]> {
    const response = await fetch(
      `${API_BASE_URL}/Food?name=${encodeURIComponent(searchParam)}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to search foods");
    }
    return response.json();
  },

  // Create a new food
  async createFood(data: FoodFormData): Promise<Food> {
    const payload = {
      name: data.name,
      avatar: data.avatar,
      rating: data.rating,
      open: data.restaurantStatus === "Open Now",
      logo: data.restaurantLogo,
      // Store restaurant name in a custom field if needed
      restaurantName: data.restaurantName,
    };

    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create food");
    }
    return response.json();
  },

  // Update a food
  async updateFood(id: string, data: FoodFormData): Promise<Food> {
    const payload = {
      name: data.name,
      avatar: data.avatar,
      rating: data.rating,
      open: data.restaurantStatus === "Open Now",
      logo: data.restaurantLogo,
      restaurantName: data.restaurantName,
    };

    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update food");
    }
    return response.json();
  },

  // Delete a food
  async deleteFood(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete food");
    }
  },
};
