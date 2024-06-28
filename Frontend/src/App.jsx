import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Cart from "./Pages/Cart";
import ProductDetail from "./components/pDetail/ProductDetail";
import Login from "./Auth/Login";
import Signup from "./Auth/Register";
import ProductCard from "./components/ProductCard";
import AddProducts from "./Pages/AddProducts";

function App() {
  return (
    <>
      <div>
        <Navigation />
        
        <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart /> } />
          <Route path="/productDetail" element={<ProductDetail />}  />
          <Route path="/addProduct" element={<AddProducts />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
