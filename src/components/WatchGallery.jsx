import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WatchGallery() {
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

  return (
    <div className="relative w-screen h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
      {/* Video Introduction Background */}
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

      {/* Intro Overlay Text */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10">
        <div className="text-center px-6 max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-6">
            CASIO VIỆT NAM
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Khám phá bộ sưu tập đồng hồ vượt thời gian
          </p>
          <button
            onClick={() => {
              // Scroll to gallery section
              const gallerySection = document.getElementById("watch-gallery");
              if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-10 py-4 text-lg font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
          >
            Xem Bộ Sưu Tập
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="watch-gallery" className="relative w-screen min-h-screen bg-white flex items-center justify-center">
        {/* Main Gallery Container - Full Screen */}
        <div className="relative w-full h-screen flex items-center justify-center">
          {/* Watch Image Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-50">
            {watches.map((watch, index) => {
              const isActive = index === currentSlide;

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
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-12">
                      <div className="text-white">
                        <h3 className="text-4xl font-bold mb-2">
                          {watch.name}
                        </h3>
                        <p className="text-lg text-gray-100">
                          {watch.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow - Inside Image */}
          <button
            onClick={prevSlide}
            className="absolute left-8 z-20 p-4 rounded-full bg-white/80 hover:bg-white text-black transition-all hover:scale-110 shadow-lg"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Right Arrow - Inside Image */}
          <button
            onClick={nextSlide}
            className="absolute right-8 z-20 p-4 rounded-full bg-white/80 hover:bg-white text-black transition-all hover:scale-110 shadow-lg"
          >
            <ChevronRight size={40} />
          </button>

          {/* Pagination Dots - Bottom Center */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center items-center gap-3 z-20">
            {watches.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-3 h-3 bg-yellow-400"
                    : "w-3 h-3 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Floating Chat Button */}
          <button className="absolute bottom-8 right-8 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30">
            <span className="text-2xl">💬</span>
          </button>
        </div>
      </div>
    </div>
  );
}
