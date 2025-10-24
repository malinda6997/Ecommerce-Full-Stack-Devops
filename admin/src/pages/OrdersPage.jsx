import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Search, Eye, Package } from "lucide-react";

const initialOrders = [
  {
    id: "#3210",
    customer: "John Doe",
    email: "john@example.com",
    product: "iPhone 15 Pro",
    amount: "$1,199",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: "#3209",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Samsung S24 Ultra",
    amount: "$1,299",
    status: "Processing",
    date: "2024-01-14",
  },
  {
    id: "#3208",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Google Pixel 8 Pro",
    amount: "$999",
    status: "Completed",
    date: "2024-01-14",
  },
  {
    id: "#3207",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    product: "OnePlus 12",
    amount: "$799",
    status: "Pending",
    date: "2024-01-13",
  },
  {
    id: "#3206",
    customer: "Tom Brown",
    email: "tom@example.com",
    product: "Xiaomi 14 Pro",
    amount: "$899",
    status: "Shipped",
    date: "2024-01-13",
  },
  {
    id: "#3205",
    customer: "Lisa Davis",
    email: "lisa@example.com",
    product: "iPhone 14 Pro",
    amount: "$999",
    status: "Completed",
    date: "2024-01-12",
  },
];

export default function OrdersPage() {
  const [orders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const variants = {
      Completed: "success",
      Processing: "default",
      Pending: "warning",
      Shipped: "secondary",
      Cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const statusOptions = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Completed",
    "Cancelled",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-gray-500">Manage customer orders</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search orders by ID, customer, or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell className="font-medium">
                      {order.amount}
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Package className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
