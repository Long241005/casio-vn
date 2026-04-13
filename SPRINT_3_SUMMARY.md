# Sprint 3: Trang Quản Lý Sản Phẩm & Báo Cáo Chi Tiết

## Tổng Quan
Sprint 3 tập trung vào xây dựng hệ thống quản lý sản phẩm (Đồng hồ Casio) và các trang phân tích báo cáo chi tiết cho admin. Bao gồm chức năng upload ảnh, quản lý đơn hàng, và các biểu đồ phân tích nâng cao.

---

## 1. Các Tính Năng Được Xây Dựng

### A. Dashboard Admin Nâng Cao (/admin)
**Mô tả:** Trang tổng quan chính của admin với các biểu đồ và KPI chi tiết.

**Các biểu đồ chính:**
- **Biểu đồ Doanh Thu & Đơn Hàng Theo Ngày (LineChart)**: Hiển thị xu hướng doanh thu và số lượng đơn hàng qua từng ngày
- **Biểu đồ Danh Mục Sản Phẩm (PieChart)**: Phân bổ doanh thu theo từng danh mục (G-Shock, Edifice, Baby-G, Classic)
- **Biểu đồ Trạng Thái Đơn Hàng (BarChart)**: Số lượng đơn hàng theo trạng thái (Completed, Processing, Shipping, Pending)

**KPI Cards (5 chỉ số):**
- Tổng Doanh Thu
- Số Đơn Hàng & Tỷ Lệ Hoàn Thành
- Sản Phẩm (Tổng trong kho)
- Trung Bình/Đơn
- Khách Hàng (Tổng người dùng)

---

### B. Trang Quản Lý Đơn Hàng Nâng Cao (/admin/orders)
**Mô tả:** Quản lý toàn bộ đơn hàng với tìm kiếm, lọc, sắp xếp và phân trang.

**Tính năng:**
- **Thống kê nhanh**: 5 card hiển thị tổng đơn hàng, hoàn thành, đang xử lý, đang giao, chờ xác nhận
- **Tìm kiếm theo**: ID đơn hàng, tên khách hàng, tên sản phẩm
- **Lọc theo trạng thái**: Tất cả, Hoàn Thành, Đang Xử Lý, Đang Giao, Chờ Xác Nhận
- **Sắp xếp**: Ngày mới nhất, giá cao nhất, tên khách hàng
- **Phân trang**: 10 item/trang với điều hướng trang
- **Modal chi tiết**: Xem thông tin chi tiết mỗi đơn hàng
- **Trạng thái badge**: Màu sắc khác nhau cho mỗi trạng thái

**Bảng dữ liệu:**
| ID | Ngày | Khách Hàng | Sản Phẩm | Số Lượng | Giá Trị | Trạng Thái |
|----|----|-----------|----------|----------|--------|-----------|
| ORD001 | 2025-04-01 | Nguyễn Văn A | G-Shock DW-5600BB | 1 | 2.45M ₫ | Hoàn Thành |

---

### C. Trang Báo Cáo & Phân Tích (/admin/reports)
**Mô tả:** Trang phân tích chi tiết doanh số, sản phẩm bán chạy, và xu hướng bán hàng.

**Các biểu đồ:**
1. **Area Chart - Doanh Thu Theo Ngày**: Hiển thị xu hướng doanh thu liên tục
2. **Pie Chart - Phân Bố Trạng Thái**: Tỷ lệ đơn hàng theo trạng thái
3. **Bar Chart - Doanh Thu Theo Danh Mục**: Biểu đồ cột doanh thu từng danh mục
4. **Bar Chart - Số Đơn Hàng Theo Danh Mục**: Số lượng đơn từng danh mục
5. **Horizontal Bar Chart - Top 8 Sản Phẩm Bán Chạy**: Sản phẩm được bán nhiều nhất

**KPI & Thống Kê:**
- Doanh Thu (với % thay đổi so với tuần trước)
- Tổng Đơn Hàng & Tỷ Lệ Hoàn Thành
- Trung Bình/Đơn
- Số Sản Phẩm Bán
- **Bảng thống kê chi tiết theo danh mục**: Doanh thu, số đơn, sản phẩm bán, trung bình/đơn

---

### D. Quản Lý Sản Phẩm (/admin/products)
**Mô tả:** Quản lý sản phẩm đồng hồ Casio với CRUD operations và upload ảnh.

**Tính năng:**
- Thêm sản phẩm mới
- Sửa sản phẩm hiện tại
- Xóa sản phẩm (với xác nhận)
- Upload ảnh sản phẩm
- Form validation

**Form Fields:**
- Tên sản phẩm (text)
- Giá (number)
- Danh mục (select: G-Shock, Edifice, Baby-G)
- Link ảnh (text - hỗ trợ URL)
- Mô tả (textarea)

---

## 2. Cấu Trúc Component

### Cây Component
```
AdminLayout
├── AdminSidebar (Menu điều hướng)
└── Các trang admin:
    ├── Dashboard (+5 KPI cards + 3 biểu đồ)
    ├── Products (CRUD + upload ảnh)
    ├── Orders (Tìm kiếm, lọc, phân trang)
    └── Reports (5 biểu đồ chính + bảng thống kê)
```

### File Mới Tạo:
1. `/src/components/AdminLayout.jsx` - Layout wrapper cho admin
2. `/src/components/AdminSidebar.jsx` - Menu sidebar admin
3. `/src/pages/admin/Reports.jsx` - Trang báo cáo chi tiết

### File Đã Cập Nhật:
1. `/src/pages/admin/Dashboard.jsx` - Nâng cấp biểu đồ & KPI
2. `/src/pages/admin/Orders.jsx` - Thêm tìm kiếm, lọc, sắp xếp, phân trang
3. `/src/pages/admin/Products.jsx` - Thêm layout
4. `/src/store/useStore.js` - Thêm mock data orders
5. `/src/App.jsx` - Thêm route /admin/reports

---

## 3. Công Nghệ Sử Dụng

### Thư viện Chart:
- **Recharts**: Biểu đồ Line, Bar, Pie, Area
- Version: ^2.5.0

### UI Components:
- **Lucide React**: Icons
- **Tailwind CSS**: Styling

### State Management:
- **Zustand**: Mock data + orders

---

## 4. Mock Data

### Orders (20 đơn hàng mẫu):
- Ngày từ 2025-04-01 đến 2025-04-10
- Giá trị từ 0.89M - 5.29M ₫
- Trạng thái: Completed, Processing, Shipping, Pending
- Đầy đủ thông tin khách hàng, sản phẩm, số lượng

### Products (104 sản phẩm):
- 17 sản phẩm có ảnh thật từ Casio
- 87 sản phẩm tạo bằng faker data
- 4 danh mục: G-Shock, Edifice, Baby-G, Classic

---

## 5. Tính Năng Chính

### Dashboard
- ✅ 5 KPI cards với thông tin chi tiết
- ✅ Line chart doanh thu & đơn hàng theo ngày
- ✅ Pie chart danh mục sản phẩm
- ✅ Bar chart trạng thái đơn hàng
- ✅ Responsive design

### Orders Management
- ✅ Tìm kiếm theo 3 tiêu chí
- ✅ Lọc theo 5 trạng thái
- ✅ Sắp xếp 3 cách
- ✅ Phân trang 10 item/trang
- ✅ Modal xem chi tiết
- ✅ Thống kê nhanh 5 chỉ số

### Reports
- ✅ 5 biểu đồ chính (Area, Pie, Bar, Bar, Horizontal Bar)
- ✅ KPI với % thay đổi
- ✅ Bảng thống kê chi tiết
- ✅ Tóm tắt chỉ số

### Products
- ✅ Bảng liệt kê sản phẩm
- ✅ Thêm sản phẩm (form)
- ✅ Sửa sản phẩm
- ✅ Xóa sản phẩm (với xác nhận)
- ✅ Upload ảnh (URL)

### Admin Sidebar
- ✅ Menu điều hướng 5 trang
- ✅ Highlight trang hiện tại
- ✅ Nút đăng xuất
- ✅ Fixed sidebar

---

## 6. Ghi Chú Kỹ Thuật

### Performance:
- Sử dụng `useMemo` để tối ưu tính toán dữ liệu
- Pagination giảm render items

### UX:
- Toast-like alerts cho actions (có thể thêm toast library)
- Modal xác nhận trước xóa
- Loading states (có thể thêm)
- Error handling (có thể nâng cấp)

### Accessibility:
- Semantic HTML
- ARIA labels
- Keyboard navigation (có thể nâng cấp)

---

## 7. Hướng Phát Triển Tiếp Theo (Sprint 4+)

1. **Real Backend**: Kết nối API thực
2. **Authentication**: JWT tokens, session management
3. **Toast Notifications**: Thêm react-hot-toast
4. **Export Data**: CSV, PDF export cho báo cáo
5. **Real-time Updates**: WebSocket hoặc polling
6. **Advanced Analytics**: Predictive charts, AI insights
7. **User Management**: Trang quản lý khách hàng
8. **Settings Page**: Cấu hình hệ thống admin
9. **Role-based Access**: Phân quyền chi tiết hơn
10. **Email Notifications**: Gửi email khi có đơn hàng

---

## 8. Cách Sử Dụng

### Truy Cập Admin:
1. Đăng nhập với tài khoản admin
2. Click "Quản Trị" ở navbar
3. Hoặc vào `/admin` trực tiếp

### Tài Khoản Demo:
- **Email**: admin@casio.vn
- **Password**: admin123
- **Role**: admin

### Các Route Admin:
- `/admin` - Dashboard chính
- `/admin/products` - Quản lý sản phẩm
- `/admin/orders` - Quản lý đơn hàng
- `/admin/reports` - Báo cáo & phân tích
- `/admin/users` - Quản lý khách hàng (chưa hoàn thiện)

---

## 9. Kiểm Tra Chất Lượng

### Đã Test:
- ✅ Dashboard load & hiển thị dữ liệu
- ✅ Orders tìm kiếm, lọc, sắp xếp
- ✅ Reports biểu đồ hiển thị đúng
- ✅ Products CRUD operations
- ✅ Sidebar navigation
- ✅ Responsive trên mobile

### Cần Test Thêm:
- Edge cases cho search/filter
- Performance với dữ liệu lớn
- Cross-browser compatibility

---

## 10. Tổng Kết

**Sprint 3 đã hoàn thiện:**
- ✅ Dashboard với 3 biểu đồ Recharts chính
- ✅ Orders management với tìm kiếm, lọc, phân trang
- ✅ Reports page với 5 biểu đồ chi tiết
- ✅ Products management (CRUD đầy đủ)
- ✅ Admin Sidebar + Layout
- ✅ Mock data orders (20 đơn mẫu)
- ✅ Responsive design trên tất cả trang

**Thời gian ước tính:** 4-5 giờ
**Độ khó:** Trung bình
**Chất lượng code:** 8/10 (có thể nâng cấp error handling, loading states)
