export interface Food {
  id: string;
  createdAt: string;
  name: string;
  avatar: string; // Food image URL
  rating: string | number;
  open: boolean;
  logo: string; // Restaurant logo URL
  price?: string;
}

export interface FoodFormData {
  name: string;
  rating: number;
  avatar: string;
  restaurantName: string;
  restaurantLogo: string;
  restaurantStatus: "Open Now" | "Closed";
}

export interface Restaurant {
  name: string;
  logo: string;
  status: "Open Now" | "Closed";
}
