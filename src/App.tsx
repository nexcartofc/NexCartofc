/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { CategoryPage } from "./pages/CategoryPage";
import { Checkout } from "./pages/Checkout";
import { OrderTracking } from "./pages/OrderTracking";
import { AdminDashboard } from "./pages/AdminDashboard";
import { SellerPanel } from "./pages/SellerPanel";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ProductListingPage } from "./pages/ProductListingPage";
import { Profile } from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-screen-2xl px-4 md:px-8 py-10 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/trending" element={<ProductListingPage />} />
            <Route path="/deals" element={<ProductListingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderTracking />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/seller/*" element={<SellerPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
