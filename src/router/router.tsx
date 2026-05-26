import { lazy } from "react";

export const Home = lazy(() => import("../Pages/Home"));
export const Login = lazy(() => import("../Pages/Login"));
export const ProductCheckout = lazy(() => import("../Pages/Registre"));
export const Wishlist = lazy(() => import("../Pages/Wishlist"));
export const ProductDetails = lazy(() => import("../Pages/ProductDetails"));
export const Cart = lazy(() => import("../Pages/Cart"));
export const Products = lazy(() => import("../Pages/Products"));
export const Checkout = lazy(() => import("../Pages/Checkout"));
export const Account = lazy(() => import("../Pages/Account"));
export const Contact = lazy(() => import("../Pages/Contact"));
export const About = lazy(() => import("../Pages/About"));
export const NotFound = lazy(() => import("../Pages/NotFound"));
