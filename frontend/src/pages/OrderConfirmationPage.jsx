import { useLocation, Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { orderNumber, total } = location.state || {
    orderNumber: "N/A",
    total: "0.00",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">Thank you for your purchase</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-xl font-bold text-black">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-black">${total}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Your order has been successfully placed and is being processed.
              </p>
              <p className="text-gray-700">
                A confirmation email has been sent to your email address.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/categories">
                <Button size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
