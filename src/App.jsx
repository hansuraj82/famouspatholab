import React from "react";
import { HashRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import ReportGenerator from "./components/ReportGenerator";
import ReportHistory from "./components/ReportHistory";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectRoute/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // Navbar + Footer here
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      {
        path: "/report",
        element: (
          <ProtectedRoute>
            <ReportGenerator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <ReportHistory />
          </ProtectedRoute>
        ),
      },
      // ⭐ Catch-all 404 route
      { path: "*", element: <PageNotFound /> },
    ],
  },    
]);


export default function App() {
 return <RouterProvider router={router} />;
}
