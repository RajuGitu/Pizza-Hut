import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import Provider
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Pizza from "./Components/Pizza";
import Order from "./Components/Order";
import Drinks from "./Components/Drinks";
import AddToCart from "./Components/AddToCart";
import "./App.css";
import CheckOut from "./Components/CheckOut";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import Melts from "./Components/Melts";
import Desserts from "./Components/Desserts";
import Pastas from "./Components/Pastas";
import Sides from "./Components/Sides";
import UnderComponent from "./Components/UnderComponent";

function App() {
  return (
    <CartProvider> {/* Wrap with Context Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* Order Route with Nested Routes */}
          <Route path="/order" element={<Order />}>
            <Route index element={<Navigate to="Pizza" />} />
            <Route path="Pizza" element={<Pizza />} />
            <Route path="Drinks" element={<Drinks />} />
            <Route path="Melts" element={<Melts />} />
            <Route path="Deserts" element={<Desserts />} />
            <Route path="Pastas" element={<Pastas />} />
            <Route path="Sides" element={<Sides />} />
            <Route path="AddToCart" element={<UnderComponent />} />
          </Route>

          {/* AddToCart Route immediately after Order */}
          <Route path="/cart" element={<AddToCart />} />

          {/* Auth Routes */}
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
