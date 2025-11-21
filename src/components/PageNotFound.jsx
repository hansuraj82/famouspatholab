import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-xl text-gray-700 mt-2">Oops! Page Not Found</p>
      <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
      >
        Go Back Home
      </Link>

    </div>
  );
}
