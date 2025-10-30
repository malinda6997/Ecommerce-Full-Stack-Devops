import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productService } from "@/services/apiService";
import { useCart } from "@/hooks/useCart";
import {
  ShoppingCart,
  Star,
  Check,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await productService.getProductById(id);

        if (response.success) {
          setProduct(response.data);
          if (response.data.colors && response.data.colors.length > 0) {
            setSelectedColor(response.data.colors[0]);
          }

          // Fetch related products from same category
          const relatedResponse = await productService.getAllProducts();
          if (relatedResponse.success) {
            const related = relatedResponse.data
              .filter(
                (p) =>
                  p.category === response.data.category &&
                  p._id !== response.data._id
              )
              .slice(0, 3);
            setRelatedProducts(related);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    addToCart(product, quantity, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) return;

    addToCart(product, quantity, selectedColor);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            {error || "Product not found"}
          </h2>
          <Link to="/categories">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden sticky top-20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-gray-600 mb-2 capitalize">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {product.name}
            </h1>

            {product.stock > 0 ? (
              <Badge variant="outline" className="mb-4">
                <Check className="h-3 w-3 mr-1" />
                In Stock ({product.stock} available)
              </Badge>
            ) : (
              <Badge variant="secondary" className="mb-4">
                Out of Stock
              </Badge>
            )}

            <div className="mb-6">
              <span className="text-4xl font-bold text-black">
                ${product.price}
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-black mb-3">
                  Color: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border-2 transition-all text-sm ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold text-black mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={product.stock <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={product.stock <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
              >
                Buy Now
              </Button>
            </div>

            {/* Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-black mb-4">
                    Specifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-gray-600 capitalize w-1/3">
                          {key}:
                        </span>
                        <span className="text-black font-medium flex-1">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              More from {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                >
                  <Card className="group hover:shadow-xl transition-shadow h-full">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-black mb-2 group-hover:underline">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-black">
                            ${relatedProduct.price}
                          </span>
                          <Button
                            size="sm"
                            disabled={relatedProduct.stock <= 0}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
