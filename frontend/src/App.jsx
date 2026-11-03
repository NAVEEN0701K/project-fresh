import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Fruits from './pages/Fruits';
import Vegetables from './pages/Vegetables';
import Flowers from './pages/Flowers';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  {/* Public Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />

                  {/* Protected Storefront Routes - Requires Sign-In First */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/catalog"
                    element={
                      <ProtectedRoute>
                        <Catalog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/fruits"
                    element={
                      <ProtectedRoute>
                        <Fruits />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/vegetables"
                    element={
                      <ProtectedRoute>
                        <Vegetables />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/flowers"
                    element={
                      <ProtectedRoute>
                        <Flowers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProtectedRoute>
                        <ProductDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
