import { useMemo } from "react";
import { useStore } from "../../store/useStore.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function AdminReports() {
  const { orders, products } = useStore();

  // Dữ liệu theo ngày
  const dailyData = useMemo(() => {
    const data = {};
    orders.forEach(order => {
      if (!data[order.date]) {
        data[order.date] = {
          date: order.date,
          revenue: 0,
          orders: 0,
          items: 0,
          completed: 0,
          processing: 0,
          shipping: 0,
          pending: 0,
        };
      }
      data[order.date].revenue += order.amount;
      data[order.date].orders += 1;
      data[order.date].items += order.items;
      data[order.date][order.status.toLowerCase()] = 
        (data[order.date][order.status.toLowerCase()] || 0) + 1;
    });
    return Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [orders]);

  // Dữ liệu theo danh mục
  const categoryData = useMemo(() => {
    const data = {};
    orders.forEach(order => {
      const product = products.find(p => p.name === order.product);
      if (product) {
        if (!data[product.category]) {
          data[product.category] = {
            category: product.category,
            revenue: 0,
            orders: 0,
            items: 0,
          };
        }
        data[product.category].revenue += order.amount;
        data[product.category].orders += 1;
        data[product.category].items += order.items;
      }
    });
    return Object.values(data).sort((a, b) => b.revenue - a.revenue);
  }, [orders, products]);

  // Dữ liệu sản phẩm bán chạy
  const topProducts = useMemo(() => {
    const data = {};
    orders.forEach(order => {
      if (!data[order.product]) {
        data[order.product] = { name: order.product, quantity: 0, revenue: 0 };
      }
      data[order.product].quantity += order.items;
      data[order.product].revenue += order.amount;
    });
    return Object.values(data)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 8);
  }, [orders]);

  // Dữ liệu trạng thái
  const statusData = useMemo(() => {
    const status = {
      "Completed": 0,
      "Processing": 0,
      "Shipping": 0,
      "Pending": 0,
    };
    orders.forEach(order => {
      status[order.status] = (status[order.status] || 0) + 1;
    });
    return Object.entries(status).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // Thống kê tổng hợp
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, o) => sum + o.items, 0);
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const conversionRate = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0;

  const COLORS = ["#111111", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"];

  // Tính toán tăng/giảm so với tuần trước
  const lastWeekRevenue = dailyData.slice(-7).reduce((sum, d) => sum + d.revenue, 0);
  const prevWeekRevenue = dailyData.slice(-14, -7).reduce((sum, d) => sum + d.revenue, 0);
  const revenueChange = prevWeekRevenue > 0 ? (((lastWeekRevenue - prevWeekRevenue) / prevWeekRevenue) * 100).toFixed(1) : 0;
  const isRevenueUp = revenueChange >= 0;

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Báo Cáo & Phân Tích</h1>
        <p className="text-gray-600 mt-2">Phân tích chi tiết doanh thu, sản phẩm và xu hướng bán hàng</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">Doanh Thu</p>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M ₫</p>
          <div className={`flex items-center gap-2 mt-3 ${isRevenueUp ? "text-green-600" : "text-red-600"}`}>
            {isRevenueUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm font-medium">{Math.abs(revenueChange)}% so với tuần trước</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">Tổng Đơn Hàng</p>
            <Calendar className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{totalOrders}</p>
          <p className="text-sm text-gray-600 mt-3">{completedOrders} hoàn thành ({conversionRate}%)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">Trung Bình/Đơn</p>
            <TrendingUp className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{(avgOrderValue / 1000000).toFixed(1)}M ₫</p>
          <p className="text-sm text-gray-600 mt-3">Giá trị trung bình</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">Số Sản Phẩm Bán</p>
            <TrendingUp className="text-orange-500" size={24} />
          </div>
          <p className="text-3xl font-bold">{totalItems}</p>
          <p className="text-sm text-gray-600 mt-3">{totalItems > 0 ? (totalItems / totalOrders).toFixed(1) : 0} sản phẩm/đơn</p>
        </div>
      </div>

      {/* Biểu đồ chính */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Biểu đồ Doanh Thu Theo Ngày */}
        <div className="bg-white p-8 rounded-2xl shadow-sm lg:col-span-1">
          <h2 className="text-xl font-semibold mb-6">Doanh Thu Theo Ngày</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111111" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
                formatter={(value) => `${(value / 1000000).toFixed(1)}M ₫`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#111111"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Trạng Thái Đơn Hàng */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Phân Bố Trạng Thái Đơn Hàng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Doanh Thu Theo Danh Mục & Số Đơn Hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Doanh Thu Theo Danh Mục</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                formatter={(value) => `${(value / 1000000).toFixed(1)}M ₫`}
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              <Bar dataKey="revenue" fill="#111111" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Số Đơn Hàng Theo Danh Mục</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }} />
              <Bar dataKey="orders" fill="#FF6B6B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sản Phẩm Bán Chạy */}
      <div className="bg-white p-8 rounded-2xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-6">Top 8 Sản Phẩm Bán Chạy</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={topProducts}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 400, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" stroke="#999" />
            <YAxis dataKey="name" type="category" stroke="#999" width={390} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
              formatter={(value) => `${value} sản phẩm`}
            />
            <Bar dataKey="quantity" fill="#4ECDC4" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bảng Thống Kê Chi Tiết */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thống kê theo danh mục */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Thống Kê Chi Tiết Theo Danh Mục</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Danh Mục</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Doanh Thu</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Số Đơn</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Sản Phẩm Bán</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Trung Bình/Đơn</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{item.category}</td>
                    <td className="text-right py-4 px-4 font-semibold text-gray-900">
                      {(item.revenue / 1000000).toFixed(1)}M ₫
                    </td>
                    <td className="text-right py-4 px-4 text-gray-600">{item.orders}</td>
                    <td className="text-right py-4 px-4 text-gray-600">{item.items}</td>
                    <td className="text-right py-4 px-4 font-medium text-gray-900">
                      {(item.revenue / item.orders / 1000000).toFixed(1)}M ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Tóm Tắt Chỉ Số</h2>
          <div className="space-y-4">
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm font-medium">Tổng Doanh Thu</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(totalRevenue / 1000000).toFixed(1)}M ₫
              </p>
            </div>
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm font-medium">Tổng Đơn Hàng</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{totalOrders}</p>
            </div>
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm font-medium">Tỷ Lệ Hoàn Thành</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{conversionRate}%</p>
            </div>
            <div className="pb-4 border-b">
              <p className="text-gray-600 text-sm font-medium">Giá Trị Trung Bình</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {(avgOrderValue / 1000000).toFixed(1)}M ₫
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Tổng Sản Phẩm Bán</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{totalItems}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
