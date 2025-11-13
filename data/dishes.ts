// data/dishes.ts
export type Course = "Starter" | "Main" | "Dessert" | "Drink" | "Special";

export type Dish = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number; // number (Rands)
  course: Course;
};

export const DISHES: Dish[] = [
  // Starters
  { id: "s1", name: "Tomato Basil Soup", description: "Creamy tomato soup infused with basil and garlic, served with toasted sourdough.", ingredients: ["Tomato","Basil","Garlic"], price: 70, course: "Starter" },
  { id: "s2", name: "Caesar Salad", description: "Romaine, parmesan, anchovies and croutons tossed in house Caesar dressing.", ingredients: ["Lettuce","Parmesan","Anchovy","Croutons"], price: 90, course: "Starter" },
  { id: "s3", name: "Grilled Halloumi Skewers", description: "Char-grilled halloumi with lemon and sweet chilli glaze.", ingredients: ["Halloumi","Lemon","Chilli"], price: 95, course: "Starter" },
  { id: "s4", name: "Garlic Prawns", description: "Pan-seared prawns in garlic butter with parsley and a splash of white wine.", ingredients: ["Prawns","Garlic","Butter"], price: 110, course: "Starter" },
  { id: "s5", name: "Butternut Soup", description: "Roasted butternut puree topped with cream and toasted seeds.", ingredients: ["Butternut","Cream","Pumpkin seeds"], price: 65, course: "Starter" },
  { id: "s6", name: "Mini Beef Sliders", description: "Two bite-sized beef burgers with cheddar and caramelised onions.", ingredients: ["Beef","Cheddar","Onion"], price: 105, course: "Starter" },

  // Mains
  { id: "m1", name: "Grilled Ribeye Steak", description: "Flame-grilled ribeye with peppercorn sauce and rustic chips.", ingredients: ["Ribeye","Peppercorn sauce","Chips"], price: 190, course: "Main" },
  { id: "m2", name: "Chicken Alfredo Pasta", description: "Fettuccine in a creamy parmesan Alfredo with grilled chicken.", ingredients: ["Pasta","Chicken","Parmesan"], price: 150, course: "Main" },
  { id: "m3", name: "Lamb Chops with Rosemary Jus", description: "Tender lamb chops with rosemary gravy and garlic mash.", ingredients: ["Lamb","Rosemary","Potato"], price: 210, course: "Main" },
  { id: "m4", name: "Seafood Platter", description: "Chef’s selection: prawns, calamari and grilled fish with lemon butter.", ingredients: ["Prawns","Calamari","Fish"], price: 230, course: "Main" },
  { id: "m5", name: "Beef Lasagna", description: "Layers of pasta with rich beef ragu and béchamel.", ingredients: ["Beef","Pasta","Cheese"], price: 160, course: "Main" },
  { id: "m6", name: "Vegetarian Stir Fry", description: "Colourful vegetables in soy-ginger glaze with rice noodles.", ingredients: ["Vegetables","Soy","Noodles"], price: 130, course: "Main" },
  { id: "m7", name: "BBQ Ribs", description: "Fall-off-the-bone ribs glazed in smoky barbecue sauce.", ingredients: ["Pork","BBQ sauce"], price: 200, course: "Main" },
  { id: "m8", name: "Butter Chicken Curry", description: "Tender chicken in a rich creamy tomato sauce with basmati rice.", ingredients: ["Chicken","Cream","Spices"], price: 170, course: "Main" },
  { id: "m9", name: "Pan-Seared Salmon", description: "Salmon on mashed potatoes with lemon butter and asparagus.", ingredients: ["Salmon","Potato","Asparagus"], price: 220, course: "Main" },

  // Desserts
  { id: "d1", name: "Chocolate Lava Cake", description: "Warm cake with a molten chocolate centre and vanilla ice cream.", ingredients: ["Chocolate","Egg","Butter"], price: 95, course: "Dessert" },
  { id: "d2", name: "Malva Pudding", description: "Traditional South African sponge pudding with caramel sauce.", ingredients: ["Sugar","Flour","Butter"], price: 85, course: "Dessert" },
  { id: "d3", name: "Fruit Tart", description: "Buttery tart with custard and fresh seasonal fruit.", ingredients: ["Pastry","Custard","Fruit"], price: 80, course: "Dessert" },
  { id: "d4", name: "Tiramisu", description: "Layers of mascarpone and espresso-soaked sponge with cocoa.", ingredients: ["Mascarpone","Coffee","Cocoa"], price: 100, course: "Dessert" },
  { id: "d5", name: "Cheesecake", description: "Creamy baked cheesecake with a berry coulis.", ingredients: ["Cheese","Biscuit","Berries"], price: 90, course: "Dessert" },

  // Drinks
  { id: "dr1", name: "Fresh Lemonade", description: "House-made lemonade with fresh mint.", ingredients: ["Lemon","Sugar","Mint"], price: 45, course: "Drink" },
  { id: "dr2", name: "Iced Coffee", description: "Chilled espresso with milk and vanilla syrup.", ingredients: ["Coffee","Milk","Vanilla"], price: 55, course: "Drink" },
  { id: "dr3", name: "Sparkling Water", description: "Lightly carbonated mineral water.", ingredients: ["Water"], price: 30, course: "Drink" },
  { id: "dr4", name: "House Red Wine (Glass)", description: "Full-bodied Cabernet Sauvignon.", ingredients: ["Grapes"], price: 85, course: "Drink" },

  // Specials
  { id: "sp1", name: "Chef's Special Platter", description: "A seasonal tasting platter curated by Chef Christoffel.", ingredients: ["Seasonal selection"], price: 250, course: "Special" },
];
