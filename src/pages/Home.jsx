import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { useStore } from "../store/useStore.js";
import ProductCard from "../components/ProductCard.jsx";
import WatchGallery from "../components/WatchGallery.jsx";

export default function Home() {
  const { products } = useStore();

  // Lấy 8 sản phẩm nổi bật (có thể thay đổi sau)
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <div className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-6">
            CASIO VIỆT NAM
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12">
            Khám phá bộ sưu tập đồng hồ vượt thời gian
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Watch Showcase - 4 Images */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* G-Shock */}
            <div className="relative group rounded-2xl overflow-hidden bg-black h-80 cursor-pointer">
              <img
                src="/watch-hero-1.jpg"
                alt="G-Shock Watch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Edifice */}
            <div className="relative group rounded-2xl overflow-hidden bg-black h-80 cursor-pointer">
              <img
                src="/watch-hero-2.jpg"
                alt="Edifice Watch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Baby-G */}
            <div className="relative group rounded-2xl overflow-hidden bg-black h-80 cursor-pointer">
              <img
                src="/watch-hero-3.jpg"
                alt="Baby-G Watch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Classic */}
            <div className="relative group rounded-2xl overflow-hidden bg-black h-80 cursor-pointer">
              <img
                src="/watch-hero-4.jpg"
                alt="Classic Watch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-10 py-4 rounded-xl text-lg inline-flex items-center gap-3 transition-all justify-center"
            >
              Mua sắm ngay
              <ArrowRight size={24} />
            </Link>

            <Link
              to="/shop"
              className="border-2 border-black hover:bg-black hover:text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all"
            >
              Khám phá bộ sưu tập
            </Link>
          </div>
        </div>
      </div>

      {/* Watch Gallery Section */}
      <WatchGallery />

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Bảo hành chính hãng
              </h3>
              <p className="text-gray-600">
                Bảo hành lên đến 5 năm từ Casio Nhật Bản
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Chống nước tốt</h3>
              <p className="text-gray-600">
                Công nghệ tiên tiến, phù hợp mọi hoạt động
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Chất lượng Nhật Bản
              </h3>
              <p className="text-gray-600">
                Được sản xuất và kiểm tra nghiêm ngặt
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section - ĐÃ SỬA */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold">Sản phẩm nổi bật</h2>
              <p className="text-gray-600 mt-2">
                Những mẫu đồng hồ Casio được yêu thích nhất
              </p>
            </div>
            <Link
              to="/shop"
              className="text-black hover:text-yellow-600 flex items-center gap-2 font-medium group"
            >
              Xem tất cả
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
          </div>

          {/* Hiển thị sản phẩm nổi bật */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Casio – Đồng hồ của sự bền bỉ
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Từ năm 1974, Casio đã mang đến những chiếc đồng hồ không chỉ là công
            cụ xem giờ, mà còn là người bạn đồng hành đáng tin cậy trong mọi
            hành trình của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
