import React from "react";
import hero1 from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
const team = [
  {
    name: "Ashish Kumar Rajak",
    role: "Lab Technician 1 (senior)",
    img: hero1,
    quote: "Dedicated to delivering the most accurate diagnostics for every patient.",
  },
  {
    name: "Manish Kumar",
    role: "Lab Technician 2",
    img: hero2,
    quote: "Precision and passion drive my commitment to healthcare excellence.",
  },
  {
    name: "Sandeep Kumar",
    role: "Lab Technician 3",
    img: hero3,
    quote: "We turn data into health insights for better patient outcomes.",
  },
];

export default function About() {
  document.title = 'FAMOUS-PATHO-LAB | ABOUT'
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">About Us</h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        <strong>Famous Patho Lab</strong> has been serving since 2004, combining technology and care to deliver fast, precise diagnostic results.
      </p>

      <div className="flex flex-wrap justify-center gap-8 px-6">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-6 w-80 text-center hover:shadow-2xl transition-all"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-600"
            />
            <h2 className="text-xl font-semibold text-blue-700">{member.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <p className="text-gray-600 italic text-sm">{member.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
