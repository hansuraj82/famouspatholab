// Layout.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css'
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
