import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { LogOut, Bell, User } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-md relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-md">
            <User className="w-5 h-5" />
          </button>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
