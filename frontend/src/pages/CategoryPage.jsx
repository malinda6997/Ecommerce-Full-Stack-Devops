import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productService, categoryService } from "@/services/apiService";
import { Star, Filter } from "lucide-react";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
      ]);

      if (productsRes.success) {
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
      }

      if (categoriesRes.success) {
        setCategories([
          { _id: "all", name: "All Products" },
          ...categoriesRes.data,
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];

    // Filter by category from URL params
    const categoryParam = searchParams.get("category");
    const featuredParam = searchParams.get("featured");

    if (featuredParam === "true") {
      filtered = filtered.filter((p) => p.featured);
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      if (categoryParam !== "all") {
        filtered = filtered.filter((p) => p.category === categoryParam);
      }
    }

    // Filter by selected category
    if (selectedCategory !== "all" && !categoryParam) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
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
  }, [searchParams, selectedCategory, sortBy, products]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-black md:text-4xl">
            {searchParams.get("featured") === "true"
              ? "Featured Products"
              : "All Products"}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="sticky p-6 bg-white border border-gray-200 rounded-lg top-20">
              <h2 className="mb-4 text-lg font-semibold text-black">Filters</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-black">Category</h3>
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

              {/* Sort By */}
              <div>
                <h3 className="mb-3 font-medium text-black">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                  setSortBy("featured");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="py-16 text-center">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <h3 className="mb-2 text-xl font-semibold text-black">
                  No products found
                </h3>
                <p className="mb-6 text-gray-600">Try adjusting your filters</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <Card className="h-full transition-shadow group hover:shadow-xl">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden bg-gray-100 rounded-t-lg aspect-square">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                          {product.featured && (
                            <Badge className="absolute top-3 left-3">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          )}
                          {product.stock <= 0 && (
                            <Badge
                              variant="secondary"
                              className="absolute top-3 right-3"
                            >
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="mb-1 text-xs text-gray-600 capitalize">
                            {product.category}
                          </p>
                          <h3 className="mb-2 font-semibold text-black group-hover:underline">
                            {product.name}
                          </h3>
                          <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-black">
                              ${product.price}
                            </span>
                            <Button size="sm" disabled={product.stock <= 0}>
                              {product.stock > 0 ? "View" : "Out of Stock"}
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
