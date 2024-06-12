import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "./components/Store";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./pages/About";
import CartProvider from "./store/CartProvider";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetails"; // Import the new component
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="main-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/store" component={Store} />
            <Route path="/movies" component={Movies} />
            <Route path="/contact" component={Contact} />
            <Route path="/product/:id" component={ProductDetail} />{" "}
          </Switch>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
