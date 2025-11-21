import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthCheck() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = () => {
    const stored = localStorage.getItem("auth");

    if (!stored) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const { loggedIn, expiry } = JSON.parse(stored);
      const now = Date.now();

      if (!loggedIn || now > expiry) {
        localStorage.removeItem("auth");
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Invalid auth format", err);
      localStorage.removeItem("auth");
      setIsLoggedIn(false);
    }
  };

  // Run initially
  useEffect(() => {
    checkAuth();
  }, []);

  // Run when auth status changes anywhere
  useEffect(() => {
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  return { isLoggedIn, setIsLoggedIn };
}
