import { 
  Shirt, 
  Smartphone, 
  Home, 
  Laptop, 
  Zap, 
  Watch, 
  Tv, 
  ChefHat 
} from "lucide-react";

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: Smartphone },
  { id: "fashion", name: "Fashion", icon: Shirt },
  { id: "home", name: "Home & Kitchen", icon: Home },
  { id: "laptops", name: "Laptops", icon: Laptop },
  { id: "gadgets", name: "Gadgets", icon: Zap },
  { id: "accessories", name: "Accessories", icon: Watch },
  { id: "appliances", name: "Appliances", icon: Tv },
  { id: "grocery", name: "Grocery", icon: ChefHat },
];

export const APP_NAME = "Nexcart";
export * from "./products";
