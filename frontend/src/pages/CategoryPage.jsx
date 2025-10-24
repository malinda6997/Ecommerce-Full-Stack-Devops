import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/data/products";
import { Star, Filter } from "lucide-react";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const brands = ["all", ...new Set(products.map((p) => p.brand))];

  useEffect(() => {
    let filtered = [...products];

    // Filter by category from URL params
    const categoryParam = searchParams.get("category");
    const featuredParam = searchParams.get("featured");

    if (featuredParam === "true") {
      filtered = filtered.filter((p) => p.featured);
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      if (
        categoryParam === "apple" ||
        categoryParam === "samsung" ||
        categoryParam === "google"
      ) {
        filtered = filtered.filter(
          (p) => p.brand.toLowerCase() === categoryParam
        );
      } else if (categoryParam !== "all") {
        filtered = filtered.filter((p) => p.category === categoryParam);
      }
    }

    // Filter by selected category
    if (selectedCategory !== "all" && !categoryParam) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== "all") {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [searchParams, selectedCategory, selectedBrand, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {searchParams.get("featured") === "true"
              ? "Featured Products"
              : "All Products"}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
              <h2 className="font-semibold text-lg text-black mb-4">Filters</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-black mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.id
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-black mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                        selectedBrand === brand
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-medium text-black mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                  setSortBy("featured");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-black mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="group hover:shadow-xl transition-shadow h-full">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.featured && (
                            <Badge className="absolute top-3 left-3">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          )}
                          {!product.inStock && (
                            <Badge
                              variant="secondary"
                              className="absolute top-3 right-3"
                            >
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gray-600 mb-1">
                            {product.brand}
                          </p>
                          <h3 className="font-semibold text-black mb-2 group-hover:underline">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-black">
                              ${product.price}
                            </span>
                            <Button size="sm" disabled={!product.inStock}>
                              {product.inStock ? "View" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
