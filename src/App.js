import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicLists from "./components/MusicLists";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./pages/About";
import CartProvider from "./store/CartProvider";
import Home from "./pages/Home";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<MusicLists />} />
        </Routes>
      </Router>
      <Footer />
    </CartProvider>
  );
}

export default App;
