"use client";

import { useState, useEffect } from "react";
import { Food, FoodFormData } from "@/types/food";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FoodFormData) => Promise<void>;
  food?: Food | null;
  mode: "add" | "edit";
}

interface FormErrors {
  food_name?: string;
  food_rating?: string;
  food_image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: string;
}

export default function FoodModal({
  isOpen,
  onClose,
  onSubmit,
  food,
  mode,
}: FoodModalProps) {
  const [formData, setFormData] = useState<FoodFormData>({
    name: "",
    rating: 1,
    avatar: "",
    restaurantName: "",
    restaurantLogo: "",
    restaurantStatus: "Open Now",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (food && mode === "edit") {
      setFormData({
        name: food.name || "",
        rating:
          typeof food.rating === "string"
            ? parseFloat(food.rating)
            : food.rating || 1,
        avatar: food.avatar || "",
        restaurantName: "Restaurant", // Default since API might not have this
        restaurantLogo: food.logo || "",
        restaurantStatus: food.open ? "Open Now" : "Closed",
      });
    } else {
      resetForm();
    }
  }, [food, mode, isOpen]);

  const resetForm = () => {
    setFormData({
      name: "",
      rating: 1,
      avatar: "",
      restaurantName: "",
      restaurantLogo: "",
      restaurantStatus: "Open Now",
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Food Name validation
    if (!formData.name.trim()) {
      newErrors.food_name = "Food Name is required";
    }

    // Food Rating validation
    if (!formData.rating || isNaN(formData.rating)) {
      newErrors.food_rating = "Food Rating must be a number";
    } else if (formData.rating < 1 || formData.rating > 5) {
      newErrors.food_rating = "Food Rating must be between 1 and 5";
    }

    // Food Image URL validation
    if (!formData.avatar.trim()) {
      newErrors.food_image = "Food Image URL is required";
    } else {
      try {
        new URL(formData.avatar);
        if (!formData.avatar.match(/^https?:\/\//i)) {
          newErrors.food_image = "Food Image URL must start with http:// or https://";
        }
      } catch {
        newErrors.food_image = "Food Image URL must be a valid URL";
      }
    }

    // Restaurant Name validation
    if (!formData.restaurantName.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required";
    }

    // Restaurant Logo URL validation
    if (!formData.restaurantLogo.trim()) {
      newErrors.restaurant_logo = "Restaurant Logo URL is required";
    } else {
      try {
        new URL(formData.restaurantLogo);
        if (!formData.restaurantLogo.match(/^https?:\/\//i)) {
          newErrors.restaurant_logo = "Restaurant Logo URL must start with http:// or https://";
        }
      } catch {
        newErrors.restaurant_logo = "Restaurant Logo URL must be a valid URL";
      }
    }

    // Restaurant Status validation
    if (
      formData.restaurantStatus !== "Open Now" &&
      formData.restaurantStatus !== "Closed"
    ) {
      newErrors.restaurant_status =
        "Restaurant Status must be 'Open Now' or 'Closed'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "rating"
          ? parseFloat(value) || 0
          : name === "restaurantStatus"
          ? (value as "Open Now" | "Closed")
          : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-center flex-1"
              style={{
                fontFamily: "var(--font-source-sans)",
                fontWeight: 700,
                fontSize: "34px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FF9A0E",
              }}
            >
              {mode === "add" ? "Add Meal" : "Edit Meal"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-medium hover:text-foreground text-2xl"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food Name */}
            <div>
              <label
                htmlFor="food_name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Food Name
              </label>
              <input
                type="text"
                id="food_name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter food name"
                className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "6.8px",
                  paddingTop: "6px",
                  paddingBottom: "6.8px",
                  paddingLeft: "13.6px",
                  height: "51px",
                  border: "none",
                }}
                aria-describedby={errors.food_name ? "food-name-error" : undefined}
              />
              {errors.food_name && (
                <p
                  id="food-name-error"
                  className="text-red-badge text-sm mt-1"
                  role="alert"
                >
                  {errors.food_name}
                </p>
              )}
            </div>

            {/* Food Rating */}
            <div>
              <label
                htmlFor="food_rating"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Food Rating (1-5)
              </label>
              <input
                type="number"
                id="food_rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
                placeholder="Enter food rating"
                className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "6.8px",
                  paddingTop: "6px",
                  paddingBottom: "6.8px",
                  paddingLeft: "13.6px",
                  height: "51px",
                  border: "none",
                }}
                aria-describedby={errors.food_rating ? "food-rating-error" : undefined}
              />
              {errors.food_rating && (
                <p
                  id="food-rating-error"
                  className="text-red-badge text-sm mt-1"
                  role="alert"
                >
                  {errors.food_rating}
                </p>
              )}
            </div>

            {/* Food Image URL */}
            <div>
              <label
                htmlFor="food_image"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Food Image URL
              </label>
              <input
                type="url"
                id="food_image"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/food-image.jpg"
                className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "6.8px",
                  paddingTop: "6px",
                  paddingBottom: "6.8px",
                  paddingLeft: "13.6px",
                  height: "51px",
                  border: "none",
                }}
                aria-describedby={errors.food_image ? "food-image-error" : undefined}
              />
              {errors.food_image && (
                <p
                  id="food-image-error"
                  className="text-red-badge text-sm mt-1"
                  role="alert"
                >
                  {errors.food_image}
                </p>
              )}
            </div>

            {/* Restaurant Name */}
            <div>
              <label
                htmlFor="restaurant_name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurant_name"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "6.8px",
                  paddingTop: "6px",
                  paddingBottom: "6.8px",
                  paddingLeft: "13.6px",
                  height: "51px",
                  border: "none",
                }}
                aria-describedby={errors.restaurant_name ? "restaurant-name-error" : undefined}
              />
              {errors.restaurant_name && (
                <p
                  id="restaurant-name-error"
                  className="text-red-badge text-sm mt-1"
                  role="alert"
                >
                  {errors.restaurant_name}
                </p>
              )}
            </div>

            {/* Restaurant Logo URL */}
            <div>
              <label
                htmlFor="restaurant_logo"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Restaurant Logo URL
              </label>
              <input
                type="url"
                id="restaurant_logo"
                name="restaurantLogo"
                value={formData.restaurantLogo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "6.8px",
                  paddingTop: "6px",
                  paddingBottom: "6.8px",
                  paddingLeft: "13.6px",
                  height: "51px",
                  border: "none",
                }}
                aria-describedby={errors.restaurant_logo ? "restaurant-logo-error" : undefined}
              />
              {errors.restaurant_logo && (
                <p
                  id="restaurant-logo-error"
                  className="text-red-badge text-sm mt-1"
                  role="alert"
                >
                  {errors.restaurant_logo}
                </p>
              )}
            </div>

            {/* Restaurant Status */}
            <div>
              <label
                htmlFor="restaurant_status"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Restaurant Status
              </label>
              <select
                id="restaurant_status"
                name="restaurantStatus"
                value={formData.restaurantStatus}
                onChange={handleChange}
                className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "6.8px",
                  paddingTop: "6px",
                  paddingBottom: "6.8px",
                  paddingLeft: "13.6px",
                  height: "51px",
                  border: "none",
                }}
                aria-describedby={errors.restaurant_status ? "restaurant-status-error" : undefined}
              >
                <option value="Open Now">Open Now</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.restaurant_status && (
                <p
                  id="restaurant-status-error"
                  className="text-red-badge text-sm mt-1"
                  role="alert"
                >
                  {errors.restaurant_status}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="food-btn flex-1 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  background: "linear-gradient(90deg, #FFBA26 0%, #FF9A0E 100%)",
                  borderRadius: "11.9px",
                  paddingTop: "17.85px",
                  paddingRight: "40.8px",
                  paddingBottom: "17.85px",
                  paddingLeft: "40.8px",
                  height: "51px",
                  fontFamily: "var(--font-source-sans)",
                  fontWeight: 700,
                  fontSize: "15.3px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  boxShadow: "0px 14px 32px 0px rgba(255, 178, 14, 0.29), 0px 5px 8px 0px rgba(222, 151, 0, 0.24)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    {mode === "add" ? "Adding Meal..." : "Updating Meal..."}
                  </>
                ) : (
                  "Save"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="food-btn flex-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #FFBA26",
                  borderRadius: "11.9px",
                  paddingTop: "17.85px",
                  paddingRight: "40.8px",
                  paddingBottom: "17.85px",
                  paddingLeft: "40.8px",
                  height: "51px",
                  fontFamily: "var(--font-source-sans)",
                  fontWeight: 700,
                  fontSize: "15.3px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
