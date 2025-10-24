import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-black mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping and add some products to your cart
            </p>
            <Link to="/categories">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
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
          Continue Shopping
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? "item" : "items"}{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.selectedColor}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold text-black hover:underline mb-1">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                          {item.selectedColor && (
                            <p className="text-sm text-gray-600 mt-1">
                              Color: {item.selectedColor}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.selectedColor)
                          }
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-md w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-600">
                              ${item.price} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-black">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (Estimated)</span>
                    <span className="font-semibold text-black">
                      ${(getCartTotal() * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-black">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-black">
                        ${(getCartTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button size="lg" className="w-full mb-3">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/categories">
                  <Button size="lg" variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    🔒 Secure checkout with SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
