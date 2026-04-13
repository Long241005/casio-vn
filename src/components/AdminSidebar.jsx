import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useStore } from "../store/useStore.js";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useStore();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Sản Phẩm", path: "/admin/products" },
    { icon: ShoppingCart, label: "Đơn Hàng", path: "/admin/orders" },
    { icon: Users, label: "Khách Hàng", path: "/admin/users" },
    { icon: BarChart3, label: "Báo Cáo", path: "/admin/reports" },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto shadow-lg">
      {/* Menu Items */}
      <div className="p-6 pt-8 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">QUẢN LÝ</p>
        </div>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.path)
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 my-6"></div>

      {/* Settings & Logout */}
      <div className="p-6 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">KHÁC</p>
        </div>
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
        >
          <Settings size={20} />
          <span>Cấu Hình</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all"
        >
          <LogOut size={20} />
          <span>Đăng Xuất</span>
        </button>
      </div>
    </div>
  );
}
