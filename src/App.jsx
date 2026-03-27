import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      }
      return [...prev, { product, quantity: qty }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId))
  }

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prev =>
        prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i)
      )
    }
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  const cartProps = { cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <Routes>
        <Route path="/" element={<Home {...cartProps} />} />
        <Route path="/shop" element={<Shop {...cartProps} />} />
        <Route path="/product/:id" element={<ProductDetail {...cartProps} />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart {...cartProps} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
