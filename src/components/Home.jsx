import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  document.title = 'FAMOUS-PATHO-LAB | HOME'
  // ✅ Public folder images (use correct filenames)
  const images = [
    "/hero.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // ✅ Auto-slide every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-center relative font-[Poppins]">
      {/* HERO SLIDER */}
      <section className="w-full relative h-[90vh] overflow-hidden">
        {/* Background Images */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: 1 }}
          />
        ))}

        {/* ✅ Soft transparent overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            zIndex: 2,
          }}
        ></div>

        {/* HERO TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 z-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-wide">
            Your Health, Our Priority
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-lg text-white-500">
            At <strong>Famous Patho Lab</strong>, we deliver precise, trusted, and
            quick diagnostic reports for better healthcare decisions.
          </p>
          <Link
            to="/report"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
          >
            Generate Report
          </Link>
        </div>

        {/* ✅ Dots Navigation */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-white scale-110" : "bg-gray-400"
              } transition-all`}
            ></button>
          ))}
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Why Choose Famous Patho Lab?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Accurate Results",
              desc: "State-of-the-art machines ensure every report is 100% reliable and precise.",
              img: "https://cdn-icons-png.flaticon.com/512/2966/2966485.png",
            },
            {
              title: "Fast Turnaround",
              desc: "Quick and efficient report delivery without compromising quality.",
              img: "https://cdn-icons-png.flaticon.com/512/3095/3095977.png",
            },
            {
              title: "Trusted Experts",
              desc: "Our doctors and lab technicians bring years of expertise to every test.",
              img: "https://cdn-icons-png.flaticon.com/512/943/943579.png",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 border rounded-lg shadow hover:shadow-xl hover:scale-105 transition"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-20 mx-auto mb-4"
              />
              <h3 className="font-semibold text-xl text-blue-600 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
