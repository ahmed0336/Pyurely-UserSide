import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Productdetails from './pages/Productdetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
import Contact from './pages/Contact';
import Chat from './pages/chat';
import Order from './pages/Order';

import SucessPayment from './pages/SucessPayment'
import PaymentFailed from './pages/PaymentFailed';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Index />} exact />
          <Route path="Shop/:id" element={<Shop />} />
          <Route path="Productdetails/:id" element={<Productdetails />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Order" element={<Order />} />
          <Route path="Checkout" element={<Checkout />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Footer" element={<Footer />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="chat" element={<Chat />} />
          <Route path="sucesspayment" element={<SucessPayment />} />
          <Route path="failedpayment" element={<PaymentFailed />} />

          
        </Routes>
      </Router>
  );
}

export default App;
