import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Total Orders",
    value: "356",
    change: "+12.5%",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Total Products",
    value: "48",
    change: "+3.2%",
    icon: Package,
    trend: "up",
  },
  {
    title: "Total Customers",
    value: "2,345",
    change: "+15.3%",
    icon: Users,
    trend: "up",
  },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const productData = [
  { name: "iPhone 15 Pro", sales: 45 },
  { name: "Samsung S24", sales: 38 },
  { name: "Google Pixel 8", sales: 29 },
  { name: "OnePlus 12", sales: 25 },
  { name: "Xiaomi 14", sales: 20 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#000"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "#3210",
                customer: "John Doe",
                product: "iPhone 15 Pro",
                amount: "$1,199",
                status: "Completed",
              },
              {
                id: "#3209",
                customer: "Jane Smith",
                product: "Samsung S24 Ultra",
                amount: "$1,299",
                status: "Processing",
              },
              {
                id: "#3208",
                customer: "Mike Johnson",
                product: "Google Pixel 8 Pro",
                amount: "$999",
                status: "Completed",
              },
              {
                id: "#3207",
                customer: "Sarah Williams",
                product: "OnePlus 12",
                amount: "$799",
                status: "Pending",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">
                    {order.id} - {order.customer}
                  </p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">{order.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
