import React from 'react'
import Home from '../pages/HomeF.jsx'
import { Routes, Route } from 'react-router-dom'
import  Login  from '../pages/Login.jsx'
import  SignUp  from '../pages/SignUp.jsx'
// import {Cart1} from '../pages/Cart1.jsx'
import Payment from '../pages/Payment.jsx'
import ContactUs from '../pages/ContactUs.jsx'
import AboutUs from '../pages/AboutUs.jsx'
import FAQ from '../pages/FAQ.jsx'
import TermsConditions from '../pages/TermsConditions.jsx'
import PrivacyPolicy from '../pages/PrivacyPolicyPage.jsx'
import ReturnRefund from '../pages/ReturnRefund.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import Product from '../pages/Products.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'
import ProductManagement from '../pages/ProductManagement.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import ResetPassword from '../pages/ResetPassword.jsx'
import Order from '../pages/Orders.jsx'
import OrderConfirmation from '../pages/OrderConfirmation.jsx'
import OrderManagement from '../pages/OrdersManagement.jsx'
import OrderTracking from '../pages/OrderTracking.jsx'
import ProtectedRoutes from "../components/ProtectedRoute.jsx"
import Food from "../pages/Food.jsx";
import Orders from "../pages/Orders.jsx"
import UserProfile from '../pages/UserProfile.jsx'
import OwnerProducts from '../pages/OwnerProducts.jsx'
import Checkout from '../pages/Checkout.jsx'

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/contactUs" element={<ContactUs />} />
    <Route path="/aboutUs" element={<AboutUs />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/termsAndConditions" element={<TermsConditions />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/return-refund" element={<ReturnRefund />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    {/* Protected Product Routes */}
    <Route element={<ProtectedRoutes />}>
      <Route path="/products" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<UserProfile />} />
    </Route>

    {/* Admin / Owner Routes */}
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/product-management" element={<ProductManagement />} />
    <Route path="/order-management" element={<OrderManagement />} />
    <Route path="/owner/products" element={<OwnerProducts />} />
    <Route path="/order-tracking" element={<OrderTracking />} />
    <Route path="/food" element={<Food />} />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
  </Routes>
);
export default AppRoutes
