import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import './CartDrawer.css'

export default function CartDrawer({ open, onClose, cartItems, cartTotal, removeFromCart, updateQuantity }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const formatPrice = (p) => '₹' + p.toLocaleString('en-IN')

  return (
    <>
      <div className={`cart-backdrop ${open ? 'cart-backdrop--open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <ShoppingBag size={18} />
            <span>Your Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-drawer__count">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer__divider" />

        {/* Body */}
        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">🐾</span>
              <p>Your cart is empty.</p>
              <button className="btn btn-outline" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <img src={product.image} alt={product.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <span className="cart-item__brand">{product.brand}</span>
                    <h4 className="cart-item__name">{product.name}</h4>
                    <div className="cart-item__row">
                      <div className="cart-item__qty">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease">
                          <Minus size={12} />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="cart-item__price">{formatPrice(product.price * quantity)}</span>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__divider" />
            <div className="cart-drawer__total">
              <span>Total</span>
              <span className="cart-drawer__total-value">{formatPrice(cartTotal)}</span>
            </div>
            <p className="cart-drawer__shipping">Free shipping on orders above ₹999</p>
            <Link to="/cart" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
