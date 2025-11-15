"use client";

import { useState, useEffect } from "react";
import { Food, FoodFormData } from "@/types/food";
import { foodApi } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import FoodModal from "@/components/FoodModal";
import DeleteModal from "@/components/DeleteModal";
import EmptyState from "@/components/EmptyState";
import { FiChevronRight } from "react-icons/fi";

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(8); // Initial number of items to display

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  // Load foods on mount
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await foodApi.getFoods();
      setFoods(data);
      setFilteredFoods(data);
    } catch (err) {
      setError("Failed to load foods. Please try again later.");
      console.error("Error loading foods:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredFoods(foods);
      setDisplayCount(8); // Reset display count

      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await foodApi.searchFoods(query);
      setFilteredFoods(results);
      setDisplayCount(8); // Reset display count
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Error searching foods:", err);
      // Fallback to client-side filtering
      const filtered = foods.filter((food) =>
        food.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredFoods(filtered);
      setDisplayCount(8); // Reset display count
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };

  const handleAddFood = async (data: FoodFormData) => {
    try {
      const newFood = await foodApi.createFood(data);
      setFoods((prev) => [newFood, ...prev]);
      setFilteredFoods((prev) => [newFood, ...prev]);
    } catch (err) {
      console.error("Error creating food:", err);
      throw err;
    }
  };

  const handleEditFood = async (data: FoodFormData) => {
    if (!selectedFood) return;

    try {
      const updatedFood = await foodApi.updateFood(selectedFood.id, data);
      setFoods((prev) =>
        prev.map((food) => (food.id === updatedFood.id ? updatedFood : food)),
      );
      setFilteredFoods((prev) =>
        prev.map((food) => (food.id === updatedFood.id ? updatedFood : food)),
      );
      setSelectedFood(null);
    } catch (err) {
      console.error("Error updating food:", err);
      throw err;
    }
  };

  const handleDeleteFood = async () => {
    if (!selectedFood) return;

    try {
      await foodApi.deleteFood(selectedFood.id);
      setFoods((prev) => prev.filter((food) => food.id !== selectedFood.id));
      setFilteredFoods((prev) =>
        prev.filter((food) => food.id !== selectedFood.id),
      );
      setSelectedFood(null);
    } catch (err) {
      console.error("Error deleting food:", err);
      throw err;
    }
  };

  const openEditModal = (food: Food) => {
    setSelectedFood(food);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (foodId: string) => {
    const food = foods.find((f) => f.id === foodId);
    if (food) {
      setSelectedFood(food);
      setIsDeleteModalOpen(true);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8); // Load 8 more items
  };

  // Get the foods to display based on displayCount
  const displayedFoods = filteredFoods.slice(0, displayCount);
  const hasMoreItems = filteredFoods.length > displayCount;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={handleSearch}
        onAddMeal={() => setIsAddModalOpen(true)}
      />

      <main className="flex-1 bg-white">
        {/* Featured Meals Section */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-center mb-[74.8px]"
              style={{
                fontFamily: "var(--font-source-sans)",
                fontWeight: 700,
                fontSize: "36.55px",
                lineHeight: "112%",
                letterSpacing: "0%",
              }}
            >
              Featured Meals
            </h2>

            {error && (
              <div className="bg-red-badge/10 border border-red-badge text-red-badge px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="inline-block animate-spin text-5xl mb-4">
                    ⏳
                  </div>
                  <p className="text-gray-medium">Loading delicious foods...</p>
                </div>
              </div>
            ) : filteredFoods.length === 0 ? (
              <EmptyState
                message="No foods found"
                description="Try searching for something else or add a new food item"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                  />
                ))}
              </div>
            )}

            {!isLoading && hasMoreItems && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="text-white px-8 py-3 rounded-md font-semibold transition-colors flex items-center gap-2 mx-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, #FFBA26 0%, #FF9A0E 100%)",
                  }}
                >
                  Load more
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <FoodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddFood}
        mode="add"
      />

      <FoodModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFood(null);
        }}
        onSubmit={handleEditFood}
        food={selectedFood}
        mode="edit"
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedFood(null);
        }}
        onConfirm={handleDeleteFood}
        foodName={selectedFood?.name || ""}
      />
    </div>
  );
}
