import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-gray-500">Manage your admin panel settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Update your store details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="Phone4n" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input
                id="storeEmail"
                type="email"
                defaultValue="contact@phone4n.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storePhone">Store Phone</Label>
              <Input id="storePhone" defaultValue="+1 234 567 8900" />
            </div>
            <Button>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>
            <CardDescription>Manage your admin account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@phone4n.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button>
              <Save className="w-4 h-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications for new orders
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-gray-500">
                  Get alerted when products are low in stock
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Customer Messages</Label>
                <p className="text-sm text-gray-500">
                  Receive customer inquiries
                </p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <Button>
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
