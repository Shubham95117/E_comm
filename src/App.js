import MusicLists from "./components/MusicLists";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import CartProvider from "./store/CartProvider";
function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <MusicLists />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
