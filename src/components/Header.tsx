"use client";

import { useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { MdDeliveryDining } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";

interface HeaderProps {
  onSearch: (query: string) => void;
  onAddMeal: () => void;
}

export default function Header({ onSearch, onAddMeal }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className="food-header">
      {/* Top Navigation */}
      <nav className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              <Image
                src="/foodwagen.svg"
                alt="Delicious food"
                className="object-contain drop-shadow-2xl"
                height={37}
                width={197}
                sizes="320px"
                priority
              />
            </span>
          </div>
          <button
            onClick={onAddMeal}
            data-test-id="food-add-btn"
            className="food-btn text-white px-6 py-2 rounded-md font-medium transition-colors"
            style={{
              background: "linear-gradient(90deg, #FFBA26 0%, #FF9A0E 100%)",
            }}
          >
            Add Meal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#FFB30E] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1
                className="text-white font-bold mb-4"
                style={{ fontSize: "42.5px" }}
              >
                Are you starving?
              </h1>
              <p className="text-white/90 mb-8" style={{ fontSize: "15.3px" }}>
                Within a few clicks, find meals that are accessible near you
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="food-search-form">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  {/* Delivery/Pickup Tabs */}
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setSearchType("delivery")}
                      className="food-tab flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
                      style={
                        searchType === "delivery"
                          ? {
                              backgroundColor: "#F172281A",
                              color: "#F17228",
                              fontFamily: "var(--font-source-sans)",
                              fontWeight: 700,
                              fontSize: "15.3px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }
                          : {
                              backgroundColor: "transparent",
                              color: "#757575",
                              fontFamily: "var(--font-source-sans)",
                              fontWeight: 700,
                              fontSize: "15.3px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }
                      }
                    >
                      <MdDeliveryDining
                        size={20}
                        color={
                          searchType === "delivery" ? "#F17228" : "#757575"
                        }
                      />
                      <span>Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchType("pickup")}
                      className="food-tab flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
                      style={
                        searchType === "pickup"
                          ? {
                              backgroundColor: "#F172281A",
                              color: "#F17228",
                              fontFamily: "var(--font-source-sans)",
                              fontWeight: 700,
                              fontSize: "15.3px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }
                          : {
                              backgroundColor: "transparent",
                              color: "#757575",
                              fontFamily: "var(--font-source-sans)",
                              fontWeight: 700,
                              fontSize: "15.3px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }
                      }
                    >
                      <IoBagHandle
                        size={20}
                        color={
                          searchType === "delivery" ? "#757575" : "#F17228"
                        }
                      />
                      <span>Pickup</span>
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="flex" style={{ gap: "12px" }}>
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <FiSearch size={20} color="#F17228" />
                      </div>
                      <input
                        type="text"
                        id="food-search"
                        name="search_query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What do you like to eat today?"
                        className="food-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        style={{
                          backgroundColor: "#F5F5F5",
                          borderRadius: "6.8px",
                          paddingTop: "6px",
                          paddingBottom: "6.8px",
                          paddingLeft: "40.8px",
                          height: "51px",
                          border: "none",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="food-btn text-white font-semibold transition-colors whitespace-nowrap flex items-center gap-2"
                      style={{
                        background:
                          "linear-gradient(90deg, #FF7A7A 0%, #F65900 100%)",
                        borderRadius: "6.8px",
                        paddingTop: "13.6px",
                        paddingRight: "40.8px",
                        paddingBottom: "13.6px",
                        paddingLeft: "40.8px",
                      }}
                    >
                      <FiSearch size={20} color="white" />
                      Find Meal
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex justify-center items-end overflow-visible">
              <div
                className="relative"
                style={{
                  width: "497.14px",
                  height: "497.14px",
                  marginBottom: "-88px",
                }}
              >
                <Image
                  src="/hero-foold.svg"
                  alt="Delicious food"
                  fill
                  className="object-contain"
                  sizes="497px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
