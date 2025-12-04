export interface CategoryDefinition {
  slug: string;
  label: string;
  description: string;
}

export const CATEGORIES_CONFIG: CategoryDefinition[] = [
  {
    slug: "fashion",
    label: "Fashion",
    description:
      "Clothing, shoes, and accessories from everyday brands to designer labels.",
  },
  {
    slug: "electronics",
    label: "Electronics",
    description:
      "Tech, gadgets, and devices to upgrade your everyday life.",
  },
  {
    slug: "travel",
    label: "Travel",
    description:
      "Hotels, activities, and travel services to help you explore more for less.",
  },
  {
    slug: "beauty",
    label: "Beauty",
    description:
      "Skincare, makeup, and beauty essentials from top brands.",
  },
  {
    slug: "others",
    label: "More ways to save",
    description:
      "Stores that dont fit into a single category but still offer cashback.",
  },
];
