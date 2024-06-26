import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Store from "./components/Store";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./pages/About";
import CartProvider from "./store/CartProvider";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetails";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="main-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/store">
              {console.log(authCtx.isLoggedIn)}
              {!authCtx.isLoggedIn ? <Redirect to="/auth" /> : <Store />}
            </Route>
            <Route path="/movies">
              {authCtx.isLoggedIn ? <Movies /> : <Redirect to="/auth" />}
            </Route>
            <Route path="/contact" component={Contact} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/product/:id" component={ProductDetail} />
            <Redirect to="/" /> {/* Fallback route */}
          </Switch>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
