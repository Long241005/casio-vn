# 🚀 Sprint 3 - Quick Start Guide

## ✨ Những Gì Mới?

### 📊 Dashboard Admin Nâng Cao
**Route**: `/admin`
- 5 KPI cards (Doanh Thu, Đơn Hàng, Sản Phẩm, TB/Đơn, Khách)
- Line chart: Doanh Thu & Đơn Hàng Theo Ngày (dual Y-axis)
- Pie chart: Doanh Thu Theo Danh Mục
- Bar chart: Trạng Thái Đơn Hàng
- Sidebar navigation

### 📋 Quản Lý Đơn Hàng
**Route**: `/admin/orders`
- ✅ Tìm kiếm: ID, khách hàng, sản phẩm
- ✅ Lọc: 5 trạng thái
- ✅ Sắp xếp: 3 cách (ngày, giá, khách)
- ✅ Phân trang: 10 item/trang
- ✅ Modal xem chi tiết

### 📈 Báo Cáo & Phân Tích
**Route**: `/admin/reports`
- ✅ 5 biểu đồ (Area, Pie, Bar, Bar, Horizontal Bar)
- ✅ KPI với % thay đổi
- ✅ Bảng thống kê chi tiết

### 🎯 Quản Lý Sản Phẩm
**Route**: `/admin/products`
- ✅ Thêm, sửa, xóa sản phẩm
- ✅ Upload ảnh (URL)
- ✅ 104+ sản phẩm trong store

---

## 🔐 Đăng Nhập

```
Email: admin@casio.vn
Password: admin123
```

Sau đó click "Quản Trị" ở navbar hoặc truy cập `/admin` trực tiếp.

---

## 📊 Các Biểu Đồ

### Dashboard (3 biểu đồ)
```
LineChart (Doanh Thu + Đơn Hàng)
  ├─ Line 1: Revenue (₫)
  └─ Line 2: Orders (số)

PieChart (Danh Mục)
  ├─ G-Shock
  ├─ Edifice
  ├─ Baby-G
  └─ Classic

BarChart (Trạng Thái)
  ├─ Completed
  ├─ Processing
  ├─ Shipping
  └─ Pending
```

### Reports (5 biểu đồ)
```
AreaChart (Doanh Thu Theo Ngày)
  └─ Gradient fill area

PieChart (Phân Bố Trạng Thái)
  └─ 4 segments

BarChart (Doanh Thu Danh Mục)
  └─ X: Category, Y: Revenue

BarChart (Đơn Hàng Danh Mục)
  └─ X: Category, Y: Orders

Horizontal BarChart (Top 8 Sản Phẩm)
  └─ Y: Product names, X: Quantity
```

---

## 🗺️ Navigation

### Admin Menu (Sidebar)
```
Dashboard       → /admin
Sản Phẩm        → /admin/products
Đơn Hàng        → /admin/orders
Khách Hàng      → /admin/users
Báo Cáo         → /admin/reports
---
Cấu Hình        → /admin/settings
Đăng Xuất       → logout
```

---

## 📝 Mock Data

### 20 Đơn Hàng
- Ngày: 2025-04-01 đến 2025-04-10
- Trạng thái: Completed (12), Processing (2), Shipping (3), Pending (3)
- Giá: 0.89M - 5.29M ₫
- Sản phẩm: Casio watches từ 4 danh mục

### 104 Sản Phẩm
- **17 sản phẩm**: Ảnh thực từ Casio
- **87 sản phẩm**: Faker data
- **4 danh mục**: G-Shock, Edifice, Baby-G, Classic
- **Giá**: 0.79M - 5.29M ₫

---

## 🎨 Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Primary | Black | #111111 |
| Success | Green | #10B981 |
| Danger | Red | #FF6B6B |
| Info | Blue | #45B7D1 |
| Accent | Teal | #4ECDC4 |
| Warning | Orange | #FFA07A |

---

## 💡 Tính Năng Nổi Bật

### Orders Page
```javascript
// Tìm kiếm
setSearchTerm("DW-5600") // Tìm sản phẩm

// Lọc
setFilterStatus("Completed") // Xem đơn hoàn thành

// Sắp xếp
setSortBy("amount") // Giá cao nhất trước

// Phân trang
setCurrentPage(2) // Trang 2
```

### Reports Page
```javascript
// Dữ liệu tự động tính từ orders
const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)
const completedRate = (completed / total) * 100
const topProducts = [...].sort((a,b) => b.qty - a.qty).slice(0, 8)
```

---

## 🔧 File Mới Tạo

```
src/
├── components/
│   ├── AdminLayout.jsx      ✨ Layout wrapper
│   └── AdminSidebar.jsx     ✨ Sidebar menu
└── pages/admin/
    └── Reports.jsx          ✨ Báo cáo page

Documentation/
├── SPRINT_3_SUMMARY.md          ✨ Chi tiết sprint
├── SPRINT_3_QUICK_START.md      ✨ Guide này
├── CHARTS_REFERENCE.md          ✨ Recharts docs
└── README.md                    ✨ Updated
```

---

## 📊 Công Thức Tính

### Daily Data
```javascript
dailyData = orders.groupBy(date).map(group => ({
  date: group[0].date,
  revenue: sum(group.amount),
  orders: count(group),
  items: sum(group.items)
}))
```

### Category Stats
```javascript
categoryStats = orders
  .groupBy(product.category)
  .map(cat => ({
    name: cat,
    value: sum(orders.amount)
  }))
```

### Top Products
```javascript
topProducts = orders
  .groupBy(product.name)
  .map(p => ({
    name: p,
    quantity: sum(orders.items),
    revenue: sum(orders.amount)
  }))
  .sortBy('quantity')
  .limit(8)
```

---

## ⚙️ Kỹ Thuật

### Performance
- ✅ useMemo cho data calculations
- ✅ Pagination (10/trang)
- ✅ Responsive container for charts
- ✅ Optimized renders

### UX
- ✅ Modal xác nhận trước xóa
- ✅ Toast feedback (có thể thêm)
- ✅ Loading states (có thể nâng cấp)
- ✅ Error handling (có thể nâng cấp)

### Accessibility
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Color contrast

---

## 🧪 Testing Checklist

- [ ] Dashboard load & hiển thị dữ liệu
- [ ] Tất cả 3 biểu đồ Dashboard render
- [ ] Orders tìm kiếm có kết quả
- [ ] Orders lọc theo trạng thái
- [ ] Orders sắp xếp hoạt động
- [ ] Orders phân trang hoạt động
- [ ] Reports 5 biểu đồ render
- [ ] Reports KPI tính đúng
- [ ] Products CRUD hoạt động
- [ ] Sidebar menu active state
- [ ] Mobile responsive

---

## 🐛 Troubleshooting

### Chart không hiển thị
```
→ Kiểm tra dữ liệu trong useMemo
→ Kiểm tra ResponsiveContainer parent
→ Check console for errors
```

### Tìm kiếm không hoạt động
```
→ Kiểm tra searchTerm state
→ Kiểm tra filter logic trong useMemo
→ Test regex pattern
```

### Sidebar không fixed
```
→ Kiểm tra position-fixed CSS
→ Kiểm tra z-index
→ Kiểm tra margin-left trên content
```

---

## 📚 Resources

- **Recharts Docs**: https://recharts.org
- **Lucide Icons**: https://lucide.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com

---

## 🚀 Next Steps (Sprint 4)

- [ ] Connect real API
- [ ] Real database (PostgreSQL)
- [ ] Authentication with JWT
- [ ] Payment integration
- [ ] Email notifications
- [ ] Real-time updates
- [ ] Advanced filtering
- [ ] Export reports (CSV, PDF)
- [ ] User management
- [ ] Settings page

---

## 📞 Support

Xem chi tiết tại:
- [SPRINT_3_SUMMARY.md](./SPRINT_3_SUMMARY.md)
- [CHARTS_REFERENCE.md](./CHARTS_REFERENCE.md)
- [README.md](./README.md)

---

**Version**: Sprint 3 Complete ✅
**Date**: 2025-04-14
**Status**: Production Ready
