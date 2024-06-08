import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./components/Store";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./pages/About";
import CartProvider from "./store/CartProvider";
import Home from "./pages/Home";
import "./App.css";
import Movies from "./pages/Movies";
function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
