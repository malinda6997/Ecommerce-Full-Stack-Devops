export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    category: "flagship",
    image:
      "https://images.unsplash.com/photo-1696446702183-cbd88e2a95f6?w=500&q=80",
    description:
      "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    specs: {
      display: "6.7-inch Super Retina XDR",
      processor: "A17 Pro chip",
      camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      battery: "Up to 29 hours video playback",
      storage: "256GB",
    },
    colors: [
      "Natural Titanium",
      "Blue Titanium",
      "White Titanium",
      "Black Titanium",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    category: "flagship",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
    description:
      "Premium Samsung flagship with S Pen, powerful AI features, and stunning display.",
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 3",
      camera: "200MP Main + 50MP Telephoto + 12MP Ultra Wide",
      battery: "5000mAh",
      storage: "512GB",
    },
    colors: [
      "Titanium Black",
      "Titanium Gray",
      "Titanium Violet",
      "Titanium Yellow",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 999,
    category: "flagship",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    description:
      "Best Android camera phone with Google Tensor G3 and pure Android experience.",
    specs: {
      display: "6.7-inch LTPO OLED",
      processor: "Google Tensor G3",
      camera: "50MP Main + 48MP Telephoto + 48MP Ultra Wide",
      battery: "5050mAh",
      storage: "128GB",
    },
    colors: ["Obsidian", "Porcelain", "Bay"],
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 799,
    category: "flagship",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    description:
      "Flagship killer with blazing fast charging and smooth 120Hz display.",
    specs: {
      display: "6.82-inch AMOLED 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Main + 64MP Telephoto + 48MP Ultra Wide",
      battery: "5400mAh with 100W charging",
      storage: "256GB",
    },
    colors: ["Flowy Emerald", "Silky Black"],
    inStock: true,
    featured: false,
  },
  {
    id: 5,
    name: "iPhone 14",
    brand: "Apple",
    price: 699,
    category: "mid-range",
    image:
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500&q=80",
    description:
      "Reliable iPhone with great camera and long battery life at affordable price.",
    specs: {
      display: "6.1-inch Super Retina XDR",
      processor: "A15 Bionic chip",
      camera: "12MP Main + 12MP Ultra Wide",
      battery: "Up to 20 hours video playback",
      storage: "128GB",
    },
    colors: ["Midnight", "Purple", "Starlight", "Red", "Blue"],
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    price: 449,
    category: "mid-range",
    image:
      "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=500&q=80",
    description:
      "Mid-range Samsung with premium features and great value for money.",
    specs: {
      display: "6.4-inch Super AMOLED",
      processor: "Exynos 1380",
      camera: "50MP Main + 12MP Ultra Wide + 5MP Macro",
      battery: "5000mAh",
      storage: "128GB",
    },
    colors: ["Awesome Graphite", "Awesome Violet", "Awesome Lime"],
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Google Pixel 7a",
    brand: "Google",
    price: 499,
    category: "mid-range",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    description:
      "Affordable Pixel with flagship camera features and clean Android.",
    specs: {
      display: "6.1-inch OLED 90Hz",
      processor: "Google Tensor G2",
      camera: "64MP Main + 13MP Ultra Wide",
      battery: "4385mAh",
      storage: "128GB",
    },
    colors: ["Charcoal", "Snow", "Sea", "Coral"],
    inStock: true,
    featured: true,
  },
  {
    id: 8,
    name: "Xiaomi 14",
    brand: "Xiaomi",
    price: 899,
    category: "flagship",
    image:
      "https://images.unsplash.com/photo-1592286927505-0da04ac7dc3d?w=500&q=80",
    description:
      "Powerful flagship with Leica camera system and premium build quality.",
    specs: {
      display: "6.36-inch AMOLED 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Main + 50MP Telephoto + 50MP Ultra Wide",
      battery: "4610mAh with 90W charging",
      storage: "256GB",
    },
    colors: ["Black", "White", "Green"],
    inStock: true,
    featured: false,
  },
  {
    id: 9,
    name: "Nothing Phone (2)",
    brand: "Nothing",
    price: 599,
    category: "mid-range",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    description:
      "Unique design with Glyph Interface and clean Nothing OS experience.",
    specs: {
      display: "6.7-inch LTPO AMOLED 120Hz",
      processor: "Snapdragon 8+ Gen 1",
      camera: "50MP Main + 50MP Ultra Wide",
      battery: "4700mAh with 45W charging",
      storage: "256GB",
    },
    colors: ["White", "Dark Gray"],
    inStock: true,
    featured: true,
  },
  {
    id: 10,
    name: "Motorola Edge 40 Pro",
    brand: "Motorola",
    price: 699,
    category: "mid-range",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&q=80",
    description:
      "Curved display flagship with fast charging and clean Android experience.",
    specs: {
      display: "6.67-inch pOLED 165Hz",
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Main + 50MP Ultra Wide + 12MP Telephoto",
      battery: "4600mAh with 125W charging",
      storage: "256GB",
    },
    colors: ["Interstellar Black", "Lunar Blue"],
    inStock: false,
    featured: false,
  },
];

export const categories = [
  {
    id: "all",
    name: "All Phones",
    description: "Browse all available phones",
  },
  {
    id: "flagship",
    name: "Flagship",
    description: "Premium flagship devices",
  },
  {
    id: "mid-range",
    name: "Mid-Range",
    description: "Great value for money",
  },
  {
    id: "apple",
    name: "Apple",
    description: "iPhone series",
  },
  {
    id: "samsung",
    name: "Samsung",
    description: "Galaxy series",
  },
  {
    id: "google",
    name: "Google",
    description: "Pixel series",
  },
];
