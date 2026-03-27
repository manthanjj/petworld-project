import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import './Cart.css'

export default function Cart({ cartItems, cartTotal, removeFromCart, updateQuantity }) {
  const formatPrice = (p) => '₹' + p.toLocaleString('en-IN')

  if (cartItems.length === 0) {
    return (
      <main className="cart-empty-page" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="cart-empty-page__inner container">
          <span className="cart-empty-page__icon">🐾</span>
          <h1 className="cart-empty-page__title">Your cart is empty.</h1>
          <p className="cart-empty-page__sub">Looks like you haven&apos;t added anything yet. Let&apos;s change that.</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    )
  }

  const shipping = cartTotal >= 999 ? 0 : 99
  const grandTotal = cartTotal + shipping

  return (
    <main className="cart-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        {/* Header */}
        <div className="cart-page__header">
          <Link to="/shop" className="cart-page__back">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
          <div>
            <span className="tag">Checkout</span>
            <h1 className="cart-page__title">Your Cart.</h1>
          </div>
        </div>

        <div className="cart-page__layout">
          {/* Items */}
          <div className="cart-page__items">
            <div className="cart-page__items-header">
              <span>Product</span>
              <span>Qty</span>
              <span>Total</span>
            </div>
            <div className="cart-page__divider" />

            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="cart-page-item">
                <div className="cart-page-item__product">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="cart-page-item__img" />
                  </Link>
                  <div className="cart-page-item__info">
                    <span className="cart-page-item__brand">{product.brand}</span>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="cart-page-item__name">{product.name}</h3>
                    </Link>
                    <span className="cart-page-item__unit">{formatPrice(product.price)} each</span>
                  </div>
                </div>

                <div className="cart-page-item__qty">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease">
                    <Minus size={13} />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase">
                    <Plus size={13} />
                  </button>
                </div>

                <div className="cart-page-item__right">
                  <span className="cart-page-item__total">{formatPrice(product.price * quantity)}</span>
                  <button
                    className="cart-page-item__remove"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="cart-page__summary">
            <h2 className="cart-page__summary-title">Order Summary</h2>
            <div className="cart-page__divider" />

            <div className="cart-page__summary-rows">
              <div className="cart-page__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="cart-page__summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'cart-page__free' : ''}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="cart-page__shipping-note">
                Add {formatPrice(999 - cartTotal)} more for free shipping
              </p>
            )}

            <div className="cart-page__divider" />
            <div className="cart-page__grand-total">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              <ShoppingBag size={16} />
              Proceed to Checkout
            </button>

            <div className="cart-page__trust">
              {['🔒 Secure Checkout', '🚚 Fast Delivery', '🔄 Easy Returns'].map(t => (
                <span key={t} className="cart-page__trust-item">{t}</span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
