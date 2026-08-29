import burger from "../assets/images/hero-burger.png";
import pizza from "../assets/images/hero-pizza.png";
import pasta from "../assets/images/pasta.png";
import momos from "../assets/images/momos.png";
import biryani from "../assets/images/biryani.png";
import fries from "../assets/images/fries.png";
import dessert from "../assets/images/dessert.png";
import drink from "../assets/images/drink.png";
import paratha from "../assets/images/aloo-paratha.png";
import tacos from "../assets/images/tacos.png";

export const categories = [
  { id: 1, name: "Burger", image: burger },
  { id: 2, name: "Pizza", image: pizza },
  { id: 3, name: "Biryani", image: biryani },
  { id: 4, name: "Momos", image: momos },
  { id: 5, name: "Dessert", image: dessert },
  { id: 6, name: "Drinks", image: drink },
];

export const foodItems = [
  {
    id: 1,
    restaurantId: 2,
    name: "Cheese Burger Combo",
    category: "Burger",
    price: 249,
    rating: 4.8,
    time: "25 min",
    image: burger,
  },

  {
    id: 2,
    restaurantId: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.9,
    time: "30 min",
    image: pizza,
  },

  {
    id: 3,
    restaurantId: 3,
    name: "Creamy White Pasta",
    category: "Pasta",
    price: 229,
    rating: 4.7,
    time: "22 min",
    image: pasta,
  },

  {
    id: 4,
    restaurantId: 2,
    name: "Steamed Momos",
    category: "Momos",
    price: 149,
    rating: 4.6,
    time: "18 min",
    image: momos,
  },

  {
    id: 5,
    restaurantId: 1,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 279,
    rating: 4.9,
    time: "35 min",
    image: biryani,
  },

  {
    id: 6,
    restaurantId: 2,
    name: "Crispy Fries",
    category: "Snacks",
    price: 99,
    rating: 4.5,
    time: "15 min",
    image: fries,
  },

  {
    id: 7,
    restaurantId: 3,
    name: "Chocolate Dessert",
    category: "Dessert",
    price: 179,
    rating: 4.8,
    time: "20 min",
    image: dessert,
  },

  {
    id: 8,
    restaurantId: 1,
    name: "Mint Lemon Drink",
    category: "Drinks",
    price: 89,
    rating: 4.6,
    time: "10 min",
    image: drink,
  },

  {
    id: 9,
    restaurantId: 1,
    name: "Aloo Paratha",
    category: "Indian",
    price: 129,
    rating: 4.7,
    time: "20 min",
    image: paratha,
  },

  {
    id: 10,
    restaurantId: 2,
    name: "Loaded Tacos",
    category: "Mexican",
    price: 199,
    rating: 4.8,
    time: "25 min",
    image: tacos,
  },
];