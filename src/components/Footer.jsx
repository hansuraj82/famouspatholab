import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="blueBackground bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">FAMOUS PATHO LAB</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Providing accurate and reliable diagnostic reports since 2004.
            Trusted by doctors, powered by technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-100">
            {["Home", "Login", "About", "Report"].map((page) => (
              <li key={page}>
                <Link
                  to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                  className="hover:text-yellow-300 transition-colors"
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-gray-100">
            <li className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Mahavir Chowk Pratappur (chatra) Jharkhand, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <span>+91 9770788771</span>
              <span>+91 9341423645</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <span>support@famouspatholab.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-400 mt-10 pt-4 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Famous Patho Lab. All rights reserved.
      </div>
    </footer>
  );
}
