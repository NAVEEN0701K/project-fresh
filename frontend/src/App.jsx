import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Fruits from './pages/Fruits';
import Vegetables from './pages/Vegetables';
import Flowers from './pages/Flowers';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/fruits" element={<Fruits />} />
                <Route path="/vegetables" element={<Vegetables />} />
                <Route path="/flowers" element={<Flowers />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                      <p className="text-6xl font-extrabold text-primary-200">404</p>
                      <p className="text-xl font-bold text-gray-700 mt-4">Page Not Found</p>
                      <a href="/" className="mt-6 btn-primary px-8 py-3 rounded-2xl">
                        Return Home
                      </a>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
