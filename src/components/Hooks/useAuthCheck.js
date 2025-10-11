import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthCheck() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return { isLoggedIn, setIsLoggedIn };
}
