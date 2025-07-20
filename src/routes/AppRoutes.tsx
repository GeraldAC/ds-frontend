import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import MainLayout from "@/layouts/MainLayout";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/About";
import ProductsPage from "@/pages/products";
import VenturePage from "@/pages/venture";

import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

import Home from "@/pages/dashboard/Index";
import Profile from "@/pages/dashboard/Profile";
import Ventures from "@/pages/dashboard/Ventures";
import Products from "@/pages/dashboard/Products";
import Reviews from "@/pages/dashboard/Reviews";

import { DashboardLayout } from "@/layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas compartidas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/ventures/:ventureId/products" element={<VenturePage />} />
      </Route>

      {/* Rutas públicas */}
      <Route
        element={
          <PublicRoute>
            <MainLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Rutas privadas */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/ventures" element={<Ventures />} />
        <Route
          path="/dashboard/ventures/:ventureId/products"
          element={<Products />}
        />
        <Route path="/dashboard/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
