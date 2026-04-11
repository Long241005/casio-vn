import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WatchGallery() {
  const [stage, setStage] = useState("intro"); // 'intro' or 'gallery'
  const [currentSlide, setCurrentSlide] = useState(0);

  const watches = [
    {
      id: 1,
      name: "G-Shock",
      image: "/watch-hero-1.jpg",
      description: "Đồng hồ chống sốc huyền thoại",
    },
    {
      id: 2,
      name: "Edifice",
      image: "/watch-hero-2.jpg",
      description: "Thiết kế sang trọng và lịch lãm",
    },
    {
      id: 3,
      name: "Baby-G",
      image: "/watch-hero-3.jpg",
      description: "Năng động cho các bạn trẻ",
    },
    {
      id: 4,
      name: "Classic",
      image: "/watch-hero-4.jpg",
      description: "Thiết kế cổ điển vượt thời gian",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % watches.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + watches.length) % watches.length);
  };

  if (stage === "intro") {
    return (
      <div
        className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        }}
      >
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-6 animate-fade-in">
            TIMELESS
            <br />
            ELEGANCE
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Khám phá bộ sưu tập đồng hồ Casio đầy tinh tế
            <br />
            Mỗi chiếc là một tác phẩm nghệ thuật kết hợp công nghệ hiện đại
          </p>

          {/* CTA Button with Pulsing Effect */}
          <button
            onClick={() => setStage("gallery")}
            className="relative px-10 py-4 text-lg font-semibold text-black bg-yellow-400 rounded-2xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 animate-pulse"
          >
            Khám Phá Chi Tiết
            <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400 animate-pulse opacity-50"></div>
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="text-yellow-400 text-sm font-medium">Cuộn xuống</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      <div className="w-full max-w-7xl px-6">
        {/* Gallery Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Bộ Sưu Tập Đồng Hồ
          </h2>
          <p className="text-gray-600 text-lg">
            Lướt qua để khám phá các mẫu thiết kế đa dạng
          </p>
        </div>

        {/* Main Gallery Container */}
        <div className="relative flex items-center justify-center mb-12">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-20 p-3 rounded-full bg-black hover:bg-gray-800 text-white transition-all hover:scale-110"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Watch Image Container */}
          <div className="relative w-full h-96 md:h-screen flex items-center justify-center px-20">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl bg-gray-100">
              {watches.map((watch, index) => {
                const isActive = index === currentSlide;
                const offset = (index - currentSlide) * 100;

                return (
                  <div
                    key={watch.id}
                    className={`absolute w-full h-full transition-all duration-500 ease-out ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="relative w-full h-full group cursor-pointer">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-8">
                        <div className="text-white">
                          <h3 className="text-4xl font-bold mb-2">
                            {watch.name}
                          </h3>
                          <p className="text-lg text-gray-200">
                            {watch.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-20 p-3 rounded-full bg-black hover:bg-gray-800 text-white transition-all hover:scale-110"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mb-8">
          {watches.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-3 bg-yellow-400"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Watch Details */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-black mb-2">
            {watches[currentSlide].name}
          </h3>
          <p className="text-gray-600 text-lg">
            {watches[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30">
        <span className="text-2xl">💬</span>
      </button>
    </div>
  );
}
