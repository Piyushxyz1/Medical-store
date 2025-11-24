import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Vitamin B12",
    price: 299.99,
    image:
      "https://images.pexels.com/photos/29278040/pexels-photo-29278040.jpeg",
  },
  {
    name: "Zinc Citrate",
    price: 159.99,
    image:
      "https://cdn.nutrabay.com/wp-content/uploads/2021/11/NB-OPT-1012-04-01.jpg",
  },
  {
    name: "Whey Protein Isolate",
    price: 249.99,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.ELEgMYrxV907MSWfVQY-ngHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
  },
  {
    name: "Creatine Monohydrate",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Magnesium Glycinate",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "B-complex",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Vitamin C",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Probiotics",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
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