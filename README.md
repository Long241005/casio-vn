# 🏪 CASIO Việt Nam - E-commerce Management System

Hệ thống quản lý bán hàng đồng hồ Casio với dashboard admin chi tiết, báo cáo phân tích, và quản lý sản phẩm.

## 📋 Tổng Quan

Ứng dụng e-commerce hoàn chỉnh dành cho cửa hàng đồng hồ Casio Việt Nam, bao gồm:
- **Khách hàng**: Shop, giỏ hàng, xem chi tiết sản phẩm
- **Admin**: Dashboard, báo cáo, quản lý sản phẩm & đơn hàng

## 🚀 Tính Năng Chính

### Cho Khách Hàng
- ✅ Duyệt sản phẩm (104+ đồng hồ)
- ✅ Tìm kiếm & lọc theo danh mục
- ✅ Giỏ hàng
- ✅ Thông tin tài khoản

### Cho Admin
#### Dashboard (/admin)
- 📊 5 KPI cards (Doanh thu, Đơn hàng, Sản phẩm, Trung bình/Đơn, Khách hàng)
- 📈 Line chart: Doanh thu & đơn hàng theo ngày
- 🍰 Pie chart: Phân bổ doanh thu theo danh mục
- 📉 Bar chart: Trạng thái đơn hàng

#### Quản Lý Sản Phẩm (/admin/products)
- ➕ Thêm sản phẩm mới
- ✏️ Sửa sản phẩm
- 🗑️ Xóa sản phẩm
- 🖼️ Upload/quản lý ảnh

#### Quản Lý Đơn Hàng (/admin/orders)
- 🔍 Tìm kiếm (ID, khách hàng, sản phẩm)
- 🔧 Lọc theo trạng thái
- 📊 Sắp xếp (ngày, giá, khách hàng)
- 📄 Phân trang (10 item/trang)
- 👁️ Xem chi tiết đơn hàng

#### Báo Cáo & Phân Tích (/admin/reports)
- 📈 5 biểu đồ chi tiết:
  - Area chart: Doanh thu theo ngày
  - Pie chart: Phân bố trạng thái
  - Bar charts: Doanh thu & đơn hàng theo danh mục
  - Horizontal bar: Top 8 sản phẩm bán chạy
- 📋 Bảng thống kê chi tiết
- 💹 KPI với % thay đổi

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **State**: Zustand
- **Charts**: Recharts 2.5+
- **UI/Icons**: Lucide React, Tailwind CSS
- **Mock Data**: faker.js patterns

## 📦 Cài Đặt

```bash
# Clone project
git clone <repo-url>
cd casio-vn

# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build
```

## 🚦 Sử Dụng

### Tài Khoản Demo
- **Admin**: admin@casio.vn / admin123
- **User**: user@casio.vn / user123

### Routes Chính
| Route | Mô Tả |
|-------|--------|
| `/` | Trang chủ |
| `/shop` | Cửa hàng (danh sách sản phẩm) |
| `/product/:id` | Chi tiết sản phẩm |
| `/cart` | Giỏ hàng |
| `/profile` | Thông tin tài khoản |
| `/admin` | Dashboard admin |
| `/admin/products` | Quản lý sản phẩm |
| `/admin/orders` | Quản lý đơn hàng |
| `/admin/reports` | Báo cáo phân tích |

## 📊 Mock Data

### Products (104)
- 17 sản phẩm với ảnh thực từ Casio
- 87 sản phẩm faker data
- 4 danh mục: G-Shock, Edifice, Baby-G, Classic
- Giá: 0.79M - 5.29M ₫

### Orders (20)
- Ngày: 2025-04-01 đến 2025-04-10
- Trạng thái: Completed, Processing, Shipping, Pending
- Giá trị: 0.89M - 5.29M ₫

## 📁 Cấu Trúc Thư Mục

```
src/
├── pages/
│   ├── admin/
│   │   ├── Dashboard.jsx     # Dashboard + charts
│   │   ├── Products.jsx      # CRUD products
│   │   ├── Orders.jsx        # Orders management
│   │   └── Reports.jsx       # Analytics & reports
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Cart.jsx
│   └── ...
├── components/
│   ├── AdminLayout.jsx       # Admin layout wrapper
│   ├── AdminSidebar.jsx      # Admin menu
│   ├── Navbar.jsx
│   └── ...
├── store/
│   └── useStore.js           # Zustand state
└── App.jsx
```

## 🎨 Thiết Kế

- **Color**: Dark theme (Black, Gray, Yellow accent)
- **Typography**: Clean, modern
- **Responsive**: Mobile, Tablet, Desktop
- **Components**: Reusable, modular

## ✨ Tính Năng Nổi Bật

1. **Advanced Search & Filter**: Tìm kiếm & lọc đa tiêu chí
2. **Real-time Charts**: Biểu đồ tương tác với Recharts
3. **Pagination**: Phân trang thông minh
4. **Responsive**: Hoạt động tốt trên tất cả devices
5. **Clean Code**: Modular, dễ mở rộng

## 🔐 Authentication

- Mock auth sử dụng Zustand
- Role-based: user, admin
- Protected routes cho admin pages

## 📈 Sprint Roadmap

- **Sprint 1**: Trang chủ & cửa hàng
- **Sprint 2**: Chi tiết sản phẩm, giỏ hàng
- **Sprint 3**: Dashboard admin + Báo cáo ✅
- **Sprint 4**: Backend integration, real API
- **Sprint 5**: Payment gateway, email notifications

## 💡 Hướng Phát Triển

- [ ] Backend API (Node.js/Express/Django)
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] Payment gateway (Stripe, VNPay)
- [ ] Email service (SendGrid, AWS SES)
- [ ] Real-time notifications (Socket.io)
- [ ] Advanced analytics (Google Analytics)
- [ ] Admin settings page
- [ ] User management page
- [ ] Export reports (CSV, PDF)
- [ ] Multi-language support

## 📝 License

MIT License

## 👨‍💻 Author

Casio Vietnam Team

---

**Hạn chế hiện tại:**
- Mock data trong state (sẽ được thay bằng API)
- Không có real authentication
- Không có payment processing
- Data không persist khi reload (sẽ dùng DB)

**Xem chi tiết:** [SPRINT_3_SUMMARY.md](./SPRINT_3_SUMMARY.md)
