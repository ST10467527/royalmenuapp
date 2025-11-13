// data/dishes.ts
export type Course = "Starter" | "Main" | "Dessert" | "Drink" | "Special";

export interface Dish {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  course: Course;
}

export const DISHES: Dish[] = [
  { id: "s1", name: "Bruschetta", description: "Grilled bread with tomato", ingredients: ["Bread", "Tomato", "Basil"], price: 35, course: "Starter" },
  { id: "s3", name: "Greek Salad", description: "Fresh salad with feta cheese", ingredients: ["Lettuce", "Feta", "Olives"], price: 40, course: "Starter" },
  { id: "s6", name: "Bobotie", description: "South African spiced minced meat", ingredients: ["Minced meat", "Eggs", "Spices"], price: 55, course: "Starter" },

  { id: "m1", name: "Cheeseburger", description: "Classic beef burger with cheese", ingredients: ["Beef", "Cheese", "Lettuce"], price: 65, course: "Main" },
  { id: "m2", name: "Spaghetti Carbonara", description: "Pasta with creamy sauce", ingredients: ["Pasta", "Bacon", "Eggs"], price: 75, course: "Main" },
  { id: "m4", name: "Grilled Chicken", description: "Served with vegetables", ingredients: ["Chicken", "Peppers", "Onions"], price: 80, course: "Main" },
  { id: "m5", name: "Lasagna", description: "Classic Italian layered pasta", ingredients: ["Pasta", "Cheese", "Tomato Sauce"], price: 70, course: "Main" },
  { id: "m6", name: "Sushi Platter", description: "Assorted sushi selection", ingredients: ["Rice", "Fish", "Seaweed"], price: 90, course: "Main" },
  { id: "m7", name: "Burger Deluxe", description: "Double beef with toppings", ingredients: ["Beef", "Cheese", "Onion Rings"], price: 85, course: "Main" },
  { id: "m8", name: "Pad Thai", description: "Thai style noodles", ingredients: ["Noodles", "Tofu", "Peanuts"], price: 75, course: "Main" },

  { id: "d2", name: "Milk Tart", description: "Traditional South African dessert", ingredients: ["Milk", "Sugar", "Pastry"], price: 30, course: "Dessert" },
  { id: "d3", name: "Baklava", description: "Sweet layered pastry", ingredients: ["Nuts", "Honey", "Phyllo"], price: 35, course: "Dessert" },
  { id: "d4", name: "Tiramisu", description: "Coffee-flavored Italian dessert", ingredients: ["Mascarpone", "Coffee", "Cocoa"], price: 40, course: "Dessert" },
  { id: "d5", name: "Cheesecake", description: "Classic cheesecake with berries", ingredients: ["Cheese", "Biscuit", "Berries"], price: 45, course: "Dessert" },

  { id: "dr1", name: "Coca Cola", description: "Soft drink", ingredients: ["Carbonated Water", "Sugar"], price: 15, course: "Drink" },
  { id: "dr2", name: "Green Tea", description: "Refreshing green tea", ingredients: ["Tea Leaves", "Water"], price: 20, course: "Drink" },
];
