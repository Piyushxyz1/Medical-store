import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Vitamin B12",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1690959794962-d8b3a18aa784?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dml0YW1pbiUyMGIxMnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Zinc Citrate",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1695634237714-81815523807b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHx6aW5jJTIwY2l0cmF0ZSUyMGNvbnRhaW5lcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Whey Protein Isolate",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdoZXklMjBwcm90ZWlufGVufDB8fDB8fHww",
  },
  {
    name: "Creatine Monohydrate",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1683394305929-5e7c8d942127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3JlYXRpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Magnesium Glycinate",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1729708273852-b63222c8b35d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFnbmVzaXVtJTIwZ2x5Y2luYXRlfGVufDB8fDB8fHww",
  },
  {
    name: "B-complex",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1729701494012-8e9d5c5ed6b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YiUyMGNvbXBsZXh8ZW58MHx8MHx8fDA%3D",
  },
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Database seeded successfully");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // failure code
  }
}

seedDatabase();