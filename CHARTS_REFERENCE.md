# 📊 Recharts Reference - Sprint 3

Tài liệu tham khảo về các biểu đồ được sử dụng trong hệ thống báo cáo admin.

---

## 1. Dashboard Charts

### 1.1 LineChart - Doanh Thu & Đơn Hàng Theo Ngày
**Vị trí**: Dashboard (/admin)
**Component**: LineChart (Recharts)
**Dữ liệu**: dailyData
```javascript
{
  date: "2025-04-01",
  revenue: 2450000,
  orders: 1,
  items: 1
}
```

**Đặc điểm**:
- ✅ Dual Y-Axis (Doanh thu bên trái, Đơn hàng bên phải)
- ✅ Line 1: revenue (black) - dạng decimal
- ✅ Line 2: orders (red) - dạng số nguyên
- ✅ Interactive hover tooltip
- ✅ Responsive design

**Công thức tính**:
```javascript
dailyData = orders.reduce((acc, order) => {
  const key = order.date;
  if (!acc[key]) {
    acc[key] = { date: key, revenue: 0, orders: 0, items: 0 };
  }
  acc[key].revenue += order.amount;
  acc[key].orders += 1;
  acc[key].items += order.items;
  return acc;
});
```

---

### 1.2 PieChart - Doanh Mục Sản Phẩm
**Vị trí**: Dashboard (/admin)
**Component**: PieChart (Recharts)
**Dữ liệu**: categoryStats
```javascript
{
  name: "G-Shock",
  value: 45200000
}
```

**Đặc điểm**:
- ✅ 4 danh mục: G-Shock, Edifice, Baby-G, Classic
- ✅ Label hiển thị: "{category} {percent}%"
- ✅ Outerradius: 100
- ✅ Hover tooltip

**Công thức tính**:
```javascript
categoryStats = products.reduce((acc, order) => {
  const product = products.find(p => p.name === order.product);
  if (product) {
    const cat = product.category;
    if (!acc[cat]) {
      acc[cat] = { name: cat, value: 0, count: 0 };
    }
    acc[cat].value += order.amount;
    acc[cat].count += 1;
  }
  return acc;
});
```

---

### 1.3 BarChart - Trạng Thái Đơn Hàng
**Vị trí**: Dashboard (/admin)
**Component**: BarChart (Recharts)
**Dữ liệu**: orderStatus
```javascript
{
  name: "Completed",
  value: 12
}
```

**Đặc điểm**:
- ✅ 4 trạng thái: Completed, Processing, Shipping, Pending
- ✅ Bar color: #4ECDC4 (teal)
- ✅ Radius: [8, 8, 0, 0]
- ✅ Tooltip format: số lượng

**Công thức tính**:
```javascript
orderStatus = {
  "Completed": orders.filter(o => o.status === "Completed").length,
  "Processing": orders.filter(o => o.status === "Processing").length,
  "Shipping": orders.filter(o => o.status === "Shipping").length,
  "Pending": orders.filter(o => o.status === "Pending").length
};
```

---

## 2. Reports Page Charts

### 2.1 AreaChart - Doanh Thu Theo Ngày
**Vị trí**: Reports (/admin/reports)
**Component**: AreaChart (Recharts)
**Dữ liệu**: dailyData (same as Dashboard)

**Đặc điểm**:
- ✅ Gradient fill: linear gradient (black to transparent)
- ✅ Area fill opacity: 1
- ✅ Smooth curve (monotone)
- ✅ Interactive tooltip
- ✅ GridDasharray: "3 3"

**Gradient định nghĩa**:
```jsx
<defs>
  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#111111" stopOpacity={0.8} />
    <stop offset="95%" stopColor="#111111" stopOpacity={0} />
  </linearGradient>
</defs>
```

---

### 2.2 PieChart - Phân Bố Trạng Thái
**Vị trí**: Reports (/admin/reports)
**Component**: PieChart (Recharts)
**Dữ liệu**: statusData

**Đặc điểm**:
- ✅ Màu sắc: COLORS array (4 màu)
- ✅ Label: "{name} ({percent}%)"
- ✅ OuterRadius: 90
- ✅ Tooltip: number value

**Color Palette**:
```javascript
const COLORS = [
  "#111111", // Black
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1"  // Blue
];
```

---

### 2.3 BarChart - Doanh Thu Theo Danh Mục
**Vị trí**: Reports (/admin/reports)
**Component**: BarChart (Recharts)
**Dữ liệu**: categoryData
```javascript
{
  category: "G-Shock",
  revenue: 45200000,
  orders: 8,
  items: 10
}
```

**Đặc điểm**:
- ✅ X-Axis: category
- ✅ Y-Axis: revenue
- ✅ Bar color: #111111 (black)
- ✅ Radius: [8, 8, 0, 0]
- ✅ Tooltip format: "M ₫"

---

### 2.4 BarChart - Số Đơn Hàng Theo Danh Mục
**Vị trí**: Reports (/admin/reports)
**Component**: BarChart (Recharts)
**Dữ liệu**: categoryData (same as 2.3)

**Đặc điểm**:
- ✅ X-Axis: category
- ✅ Y-Axis: orders (count)
- ✅ Bar color: #FF6B6B (red)
- ✅ Radius: [8, 8, 0, 0]
- ✅ Tooltip: số lượng

---

### 2.5 Horizontal BarChart - Top 8 Sản Phẩm Bán Chạy
**Vị trí**: Reports (/admin/reports)
**Component**: BarChart with layout="vertical" (Recharts)
**Dữ liệu**: topProducts
```javascript
{
  name: "G-Shock DW-5600BB",
  quantity: 5,
  revenue: 12250000
}
```

**Đặc điểm**:
- ✅ Layout: "vertical" (ngang)
- ✅ YAxis: product names (width: 390)
- ✅ XAxis: quantity
- ✅ Bar color: #4ECDC4 (teal)
- ✅ Radius: [0, 8, 8, 0]
- ✅ Margin: left: 400
- ✅ Tooltip format: "{quantity} sản phẩm"
- ✅ Sorted by quantity desc
- ✅ Top 8 products

**Công thức tính**:
```javascript
topProducts = orders.reduce((acc, order) => {
  if (!acc[order.product]) {
    acc[order.product] = {
      name: order.product,
      quantity: 0,
      revenue: 0
    };
  }
  acc[order.product].quantity += order.items;
  acc[order.product].revenue += order.amount;
  return acc;
}).sort((a, b) => b.quantity - a.quantity).slice(0, 8);
```

---

## 3. KPI Cards

### Dashboard KPI (5 cards)
| Card | Metric | Formula | Unit |
|------|--------|---------|------|
| Doanh Thu | totalRevenue | sum(orders.amount) | M ₫ |
| Đơn Hàng | totalOrders | count(orders) | số |
| Sản Phẩm | products.length | count(products) | số |
| Trung Bình/Đơn | avgOrderValue | totalRevenue / totalOrders | M ₫ |
| Khách Hàng | totalUsers | 856 (mock) | số |

### Reports KPI (4 metrics + trending)
| Metric | Formula | Display |
|--------|---------|---------|
| Doanh Thu | sum(orders.amount) | M ₫ + % change |
| Đơn Hàng | count(orders) | số + % completed |
| Trung Bình/Đơn | totalRevenue / totalOrders | M ₫ |
| Sản Phẩm Bán | sum(orders.items) | số + avg/đơn |

### Orders Management Stats (5 cards)
| Card | Metric | Formula |
|------|--------|---------|
| Tổng | count(orders) | all |
| Hoàn Thành | count(orders where status="Completed") | filtered |
| Đang Xử Lý | count(orders where status="Processing") | filtered |
| Đang Giao | count(orders where status="Shipping") | filtered |
| Chờ Xác Nhận | count(orders where status="Pending") | filtered |

---

## 4. Tooltip Formatters

### Revenue Format
```javascript
formatter={(value) => {
  if (value > 1000000) {
    return `${(value / 1000000).toFixed(1)}M ₫`;
  }
  return `${value.toLocaleString('vi-VN')} ₫`;
}}
```

### Orders Format
```javascript
formatter={(value) => `${value} đơn hàng`}
```

### Products Format
```javascript
formatter={(value) => `${value} sản phẩm`}
```

---

## 5. Color Palette

```javascript
const COLORS = [
  "#111111", // Black - Primary
  "#FF6B6B", // Red - Danger
  "#4ECDC4", // Teal - Secondary
  "#45B7D1", // Blue - Info
  "#FFA07A", // Light Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Yellow
  "#BB8FCE"  // Purple
];
```

**Sử dụng**:
- Black (#111111): Main bars, primary lines
- Red (#FF6B6B): Pending, warnings
- Teal (#4ECDC4): Secondary bars, completed
- Blue (#45B7D1): Orders, processing
- Orange (#FFA07A): Shipping, warnings
- Green: Completed/success
- Yellow: Active/highlight
- Purple: Categories

---

## 6. Responsive Breakpoints

| Device | Width | Grid Cols | Chart Height |
|--------|-------|-----------|--------------|
| Mobile | <768px | 1 | 250-300 |
| Tablet | 768-1024px | 2 | 300-350 |
| Desktop | >1024px | 3-4 | 350-400 |

---

## 7. Performance Tips

### useMemo Usage
```javascript
const dailyData = useMemo(() => {
  // calculations
}, [orders]);
```

### Large Dataset Handling
- Limit top products to 8
- Paginate orders (10/page)
- Aggregate by date for daily data
- Use index for fast lookups

### Chart Rendering
- ResponsiveContainer for auto-sizing
- Lazy load charts if needed
- Memoize chart components

---

## 8. Chart Libraries

**Installed**:
- recharts: ^2.5.0+

**Components Used**:
- LineChart
- AreaChart
- BarChart (horizontal & vertical)
- PieChart
- XAxis, YAxis, CartesianGrid
- Tooltip, Legend
- ResponsiveContainer
- Cell (for custom colors)

---

## 9. Data Flow

```
useStore (orders, products)
    ↓
useMemo (calculate metrics)
    ↓
Component State (dailyData, categoryStats, etc)
    ↓
Recharts Components (Charts & KPIs)
    ↓
UI Render
```

---

## 10. Cheat Sheet

### Quick Copy-Paste

**LineChart with Dual Y-Axis**:
```jsx
<LineChart data={data} margin={{ right: 80 }}>
  <YAxis label={{ value: 'Left', angle: -90 }} />
  <YAxis yAxisId="right" orientation="right" />
  <Line yAxisId="right" dataKey="secondary" />
</LineChart>
```

**AreaChart with Gradient**:
```jsx
<defs>
  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#111" stopOpacity={0.8} />
    <stop offset="95%" stopColor="#111" stopOpacity={0} />
  </linearGradient>
</defs>
<Area fill="url(#color)" />
```

**Horizontal BarChart**:
```jsx
<BarChart layout="vertical" margin={{ left: 400 }}>
  <YAxis type="category" dataKey="name" width={390} />
  <XAxis type="number" />
</BarChart>
```

---

**Version**: Sprint 3
**Last Updated**: 2025-04-14
**Status**: ✅ Complete
