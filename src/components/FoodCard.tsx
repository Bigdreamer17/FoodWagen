"use client";

import { Food } from "@/types/food";
import Image from "next/image";
import { useState } from "react";

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: string) => void;
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formatPrice = (price?: string | number) => {
    if (!price) return "$2.99";
    // Convert to string and ensure price has $ sign
    const priceStr = String(price);
    return priceStr.startsWith("$") ? priceStr : `$${priceStr}`;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getImageSrc = () => {
    if (imgError || !food.avatar || !isValidUrl(food.avatar)) {
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
    }
    return food.avatar;
  };

  const formatRating = (rating: string | number) => {
    const numRating = typeof rating === "string" ? parseFloat(rating) : rating;
    return numRating.toFixed(1);
  };

  return (
    <div className="food-card food-slide-up bg-white transition-transform duration-150 ease-out hover:-translate-y-1 relative max-w-[357px]">
      {/* Image Section */}
      <div className="relative w-full aspect-[357/301] rounded-[16px] overflow-hidden mb-[28px]">
        <Image
          src={getImageSrc()}
          alt={food.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 307px"
          onError={() => setImgError(true)}
        />

        {/* Price Badge */}
        <div
          className="absolute top-4 left-4 bg-[#F17228] rounded-[8px] flex items-center gap-1 shadow-md"
          style={{
            paddingTop: "8px",
            paddingRight: "16px",
            paddingBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          <span className="text-lg">🏷️</span>
          <span
            style={{
              fontFamily: "var(--font-source-sans)",
              fontWeight: 700,
              fontSize: "18.7px",
              lineHeight: "120%",
              letterSpacing: "0%",
              color: "#FFFFFF",
            }}
          >
            {formatPrice(food.price)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="bg-white">
        <div className="pt-2">
          {/* Restaurant Logo, Name/Rating, and Menu Icon in Flexbox */}
          <div className="flex items-start mb-[36px]" style={{ gap: "24px" }}>
            {/* Restaurant Logo - No background or shadow */}
            <div className="w-[64px] h-[64px] flex-shrink-0">
              {food.logo && isValidUrl(food.logo) ? (
                <div className="relative w-full h-full rounded-sm">
                  <Image
                    src={food.logo}
                    alt="Restaurant logo"
                    fill
                    className="restaurant-logo object-contain rounded-sm"
                    sizes="64px"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🍴
                </div>
              )}
            </div>

            {/* Food Name and Rating */}
            <div className="flex-1 min-w-0" style={{ marginRight: "8px" }}>
              <h3
                className="food-name text-foreground mb-1 truncate"
                style={{
                  fontFamily: "var(--font-source-sans)",
                  fontWeight: 700,
                  fontSize: "18.7px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                }}
              >
                {food.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-base">⭐</span>
                <span
                  className="food-rating"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 400,
                    fontSize: "18.7px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    color: "#FFB30E",
                  }}
                >
                  {formatRating(food.rating)}
                </span>
              </div>
            </div>

            {/* Menu Icon (3 dots) - Third element in flex */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-medium hover:text-foreground p-1"
                aria-label="Menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-light/50 py-2 min-w-[140px] z-20">
                    <button
                      onClick={() => {
                        onEdit(food);
                        setIsMenuOpen(false);
                      }}
                      data-test-id="food-edit-btn"
                      className="food-btn w-full text-left px-4 py-2 hover:bg-gray-light/30 transition-colors text-sm font-medium text-foreground"
                    >
                      Edit Food
                    </button>
                    <button
                      onClick={() => {
                        onDelete(food.id);
                        setIsMenuOpen(false);
                      }}
                      data-test-id="food-delete-btn"
                      className="food-btn w-full text-left px-4 py-2 hover:bg-red-badge/10 transition-colors text-sm font-medium text-red-badge"
                    >
                      Delete Food
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div>
            <span
              className="restaurant-status rounded-md inline-block"
              style={
                food.open
                  ? {
                      backgroundColor: "#79B93C33",
                      color: "#79B93C",
                      fontFamily: "var(--font-source-sans)",
                      fontWeight: 700,
                      fontSize: "18.7px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      paddingTop: "8px",
                      paddingRight: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      whiteSpace: "nowrap",
                    }
                  : {
                      backgroundColor: "#F1722833",
                      color: "#F17228",
                      fontFamily: "var(--font-source-sans)",
                      fontWeight: 700,
                      fontSize: "18.7px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      paddingTop: "8px",
                      paddingRight: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      whiteSpace: "nowrap",
                    }
              }
            >
              {food.open ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
