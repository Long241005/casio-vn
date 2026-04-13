import { useStore } from "../../store/useStore.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { Users, ShoppingCart, DollarSign, TrendingUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const { products, user, orders } = useStore();

  // Tính toán dữ liệu từ orders
  const dailyData = (() => {
    const data = {};
    orders.forEach(order => {
      if (!data[order.date]) {
        data[order.date] = { date: order.date, revenue: 0, orders: 0, items: 0 };
      }
      data[order.date].revenue += order.amount;
      data[order.date].orders += 1;
      data[order.date].items += order.items;
    });
    return Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));
  })();

  // Thống kê theo danh mục
  const categoryStats = (() => {
    const stats = {};
    orders.forEach(order => {
      const product = products.find(p => p.name === order.product);
      if (product) {
        if (!stats[product.category]) {
          stats[product.category] = { name: product.category, value: 0, count: 0 };
        }
        stats[product.category].value += order.amount;
        stats[product.category].count += 1;
      }
    });
    return Object.values(stats);
  })();

  // Thống kê trạng thái đơn hàng
  const orderStatus = (() => {
    const status = { Completed: 0, Processing: 0, Shipping: 0, Pending: 0 };
    orders.forEach(order => {
      status[order.status] = (status[order.status] || 0) + 1;
    });
    return Object.entries(status).map(([name, value]) => ({ name, value }));
  })();

  // Tính toán thống kê tổng quát
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + order.items, 0);
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const totalUsers = 856;

  const COLORS = ["#111111", "#FF6B6B", "#4ECDC4", "#45B7D1"];

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Chào mừng quay trở lại, {user?.name || "Admin"}
        </p>
      </div>

      {/* KPI Cards - Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Tổng Doanh Thu</p>
              <p className="text-2xl font-bold mt-2">
                {(totalRevenue / 1000000).toFixed(1)}M ₫
              </p>
              <p className="text-xs text-gray-400 mt-1">{totalOrders} đơn hàng</p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Đơn Hàng</p>
              <p className="text-2xl font-bold mt-2">{totalOrders}</p>
              <p className="text-xs text-green-600 mt-1">{completedOrders} hoàn thành</p>
            </div>
            <ShoppingCart className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Sản Phẩm</p>
              <p className="text-2xl font-bold mt-2">{products.length}</p>
              <p className="text-xs text-gray-400 mt-1">{totalItems} đã bán</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Trung Bình/Đơn</p>
              <p className="text-2xl font-bold mt-2">
                {(averageOrderValue / 1000000).toFixed(1)}M ₫
              </p>
              <p className="text-xs text-gray-400 mt-1">Giá trị trung bình</p>
            </div>
            <Calendar className="text-orange-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Khách Hàng</p>
              <p className="text-2xl font-bold mt-2">{totalUsers}</p>
              <p className="text-xs text-gray-400 mt-1">Tổng người dùng</p>
            </div>
            <Users className="text-pink-500" size={32} />
          </div>
        </div>
      </div>

      {/* Biểu đồ chính - Doanh Thu & Đơn Hàng Theo Ngày */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Doanh Thu & Đơn Hàng Theo Ngày</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dailyData} margin={{ top: 5, right: 80, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" label={{ value: 'Doanh Thu (₫)', angle: -90, position: 'insideLeft' }} />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#999"
                label={{ value: 'Số Đơn Hàng', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                formatter={(value) => {
                  if (value > 1000000) return [`${(value / 1000000).toFixed(1)}M ₫`, ""];
                  return [value, ""];
                }}
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#111111" 
                strokeWidth={3}
                dot={{ fill: "#111111", r: 5 }}
                activeDot={{ r: 7 }}
                name="Doanh Thu (₫)"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#FF6B6B" 
                strokeWidth={3}
                dot={{ fill: "#FF6B6B", r: 5 }}
                activeDot={{ r: 7 }}
                name="Số Đơn Hàng"
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Danh Mục Sản Phẩm */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Doanh Thu Theo Danh Mục</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M ₫`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ Trạng Thái Đơn Hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Trạng Thái Đơn Hàng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="value" fill="#4ECDC4" radius={[8, 8, 0, 0]} name="Số Lượng" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Thống kê Chi Tiết */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Thống Kê Chi Tiết</h2>
          <div className="space-y-4">
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm">Đơn Hàng Hoàn Thành</p>
              <p className="text-2xl font-bold text-green-600">{completedOrders}/{totalOrders}</p>
              <p className="text-xs text-gray-400 mt-1">{((completedOrders / totalOrders) * 100).toFixed(1)}% hoàn thành</p>
            </div>
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm">Đang Xử Lý</p>
              <p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === "Processing").length}</p>
              <p className="text-xs text-gray-400 mt-1">Đơn hàng đang xử lý</p>
            </div>
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm">Đang Vận Chuyển</p>
              <p className="text-2xl font-bold text-orange-600">{orders.filter(o => o.status === "Shipping").length}</p>
              <p className="text-xs text-gray-400 mt-1">Đang giao hàng</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Chờ Xác Nhận</p>
              <p className="text-2xl font-bold text-red-600">{orders.filter(o => o.status === "Pending").length}</p>
              <p className="text-xs text-gray-400 mt-1">Chưa xác nhận</p>
            </div>
          </div>
        </div>
      </div>

      {/* Link nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/products"
          className="block p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition border-l-4 border-purple-500"
        >
          <h3 className="text-2xl font-semibold mb-2">Quản lý Sản phẩm</h3>
          <p className="text-gray-600">Thêm, sửa, xóa sản phẩm đồng hồ Casio và upload hình ảnh</p>
        </a>

        <a
          href="/admin/orders"
          className="block p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition border-l-4 border-blue-500"
        >
          <h3 className="text-2xl font-semibold mb-2">Quản lý Đơn hàng</h3>
          <p className="text-gray-600">Xem và cập nhật trạng thái đơn hàng từ khách hàng</p>
        </a>
      </div>
    </div>
    </AdminLayout>
  );
}
