import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './store/CartContext'
import ScrollToTop from './components/ScrollToTop'
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import Home          from './pages/Home'
import Shop          from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart          from './pages/Cart'
import Checkout      from './pages/Checkout'
import About         from './pages/About'
import Contact       from './pages/Contact'

function NotFound() {
  return (
    <div className="min-h-screen bg-cream pt-16 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-9xl text-orange-200 tracking-wide select-none">404</div>
        <h1 className="font-display text-4xl text-charcoal-800 tracking-wide mb-3 -mt-4">Page introuvable</h1>
        <p className="font-body text-charcoal-500 mb-6">Cette page n'existe pas ou a été déplacée.</p>
        <a href="/" className="btn-primary">Retour à l'accueil</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/boutique"            element={<Shop />} />
            <Route path="/boutique/:id"        element={<ProductDetail />} />
            <Route path="/panier"              element={<Cart />} />
            <Route path="/commande"            element={<Checkout />} />
            <Route path="/a-propos"            element={<About />} />
            <Route path="/contact"             element={<Contact />} />
            <Route path="*"                    element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}
