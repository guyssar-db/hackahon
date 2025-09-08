"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/31343C.svg",
  "/31343C.svg",
  "/31343C.svg",
  "/31343C.svg",
  "/31343C.svg",
];

export default function BannerHome() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-56 md:h-96 bg-gray-200 overflow-hidden rounded-lg">
      {/* Slides */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            // unoptimized // ปิดได้ถ้ามีรูปจริงๆ
          />
        </div>
      ))}

      {/* ปุ่มก่อนหน้า*/}
      <button
        name="Previous button"
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black p-2 rounded-full"
      >
        ❮
      </button>

      {/* ปุ่มถัดไป */}
      <button
        name="Next button"
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black p-2 rounded-full"
      >
        ❯
      </button>

      {/* แสดง dot (ปัจจุบันจะเปลี่ยสี)*/}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            name="Status button"
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
