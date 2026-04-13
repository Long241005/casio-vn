import { useState, useMemo } from "react";
import { useStore } from "../../store/useStore.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import { Search, Filter, Download, Eye } from "lucide-react";

export default function AdminOrders() {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  // Lọc và tìm kiếm
  const filteredOrders = useMemo(() => {
    let result = orders;

    // Lọc theo trạng thái
    if (filterStatus !== "All") {
      result = result.filter(o => o.status === filterStatus);
    }

    // Tìm kiếm
    if (searchTerm) {
      result = result.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    if (sortBy === "date") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "amount") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "customer") {
      result.sort((a, b) => a.customer.localeCompare(b.customer));
    }

    return result;
  }, [orders, searchTerm, filterStatus, sortBy]);

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Thống kê
  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === "Completed").length,
    processing: orders.filter(o => o.status === "Processing").length,
    shipping: orders.filter(o => o.status === "Shipping").length,
    pending: orders.filter(o => o.status === "Pending").length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipping":
        return "bg-orange-100 text-orange-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      "Completed": "Hoàn Thành",
      "Processing": "Đang Xử Lý",
      "Shipping": "Đang Giao",
      "Pending": "Chờ Xác Nhận",
    };
    return labels[status] || status;
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Quản Lý Đơn Hàng</h1>
        <p className="text-gray-600 mt-2">Quản lý và cập nhật trạng thái đơn hàng từ khách hàng</p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gray-400">
          <p className="text-gray-600 text-sm font-medium">Tổng Đơn Hàng</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Hoàn Thành</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Đang Xử Lý</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.processing}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-medium">Đang Giao</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.shipping}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-medium">Chờ Xác Nhận</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.pending}</p>
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Tìm kiếm */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm ID, khách hàng, sản phẩm..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lọc theo trạng thái */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Completed">Hoàn Thành</option>
              <option value="Processing">Đang Xử Lý</option>
              <option value="Shipping">Đang Giao</option>
              <option value="Pending">Chờ Xác Nhận</option>
            </select>
          </div>

          {/* Sắp xếp */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="date">Sắp xếp: Ngày mới nhất</option>
              <option value="amount">Sắp xếp: Giá cao nhất</option>
              <option value="customer">Sắp xếp: Tên khách hàng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID Đơn Hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Khách Hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sản Phẩm</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số Lượng</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Giá Trị</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Trạng Thái</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{order.items}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                      {(order.amount / 1000000).toFixed(1)}M ₫
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    Không có đơn hàng nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Hiển thị {startIndex + 1} đến {Math.min(startIndex + itemsPerPage, filteredOrders.length)} của {filteredOrders.length} đơn hàng
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 overflow-hidden shadow-lg">
            <div className="p-8 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Chi tiết đơn hàng</h2>
                <p className="text-gray-500 text-sm mt-1">Mã đơn: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-black text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Khách hàng</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Ngày đặt hàng</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {new Date(selectedOrder.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Số lượng</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedOrder.items} sản phẩm</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Trạng thái</p>
                  <p className={`font-semibold mt-1 inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">{selectedOrder.product}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Số lượng: {selectedOrder.items}</span>
                    <span className="font-semibold text-gray-900">
                      {(selectedOrder.amount / 1000000).toFixed(1)}M ₫
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng thanh toán</span>
                  <span className="text-blue-600">
                    {(selectedOrder.amount / 1000000).toFixed(1)}M ₫
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex gap-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
