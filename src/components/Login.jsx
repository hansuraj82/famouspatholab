// import React, { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Login to Famous Patho Lab</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border w-full p-3 rounded mb-4"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border w-full p-3 rounded mb-6"
//         />
//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

document.title = 'FAMOUS-PATHO-LAB | LOGIN'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
      localStorage.setItem("auth", JSON.stringify({ loggedIn: true, expiry }));
      window.dispatchEvent(new Event("auth-change"));

      navigate("/report");
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 font-[Poppins]">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative overflow-hidden">

        {/* Decorative circle in background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10 text-center">
          {/* Logo */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966485.png"
            alt="Lab Logo"
            className="w-16 mx-auto mb-4"
          />

          <h1 className="text-3xl font-bold text-blue-700 mb-1">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Access the Report Dashboard
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-[1.02] shadow-md"
            >
              Login
            </button>
          </form>

          {/* Subtle footer text */}
          <p className="mt-6 text-gray-500 text-xs">
            © {new Date().getFullYear()} Famous Patho Lab — Admin Access Only
          </p>
        </div>
      </div>
    </div>
  );
}

