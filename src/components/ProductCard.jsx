import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import './ProductCard.css'

export default function ProductCard({ product, onAddToCart }) {
  const [wished, setWished] = useState(false)
  const [adding, setAdding] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    setAdding(true)
    onAddToCart(product)
    setTimeout(() => setAdding(false), 900)
  }

  const formatPrice = (p) =>
    '₹' + p.toLocaleString('en-IN')

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Image */}
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
        <div className="product-card__img-overlay" />

        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}

        <button
          className={`product-card__wish ${wished ? 'product-card__wish--active' : ''}`}
          onClick={(e) => { e.preventDefault(); setWished(!wished) }}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
        </button>

        <button
          className={`product-card__add ${adding ? 'product-card__add--adding' : ''}`}
          onClick={handleAdd}
          aria-label="Add to cart"
        >
          {adding ? (
            <span className="product-card__add-label">Added ✓</span>
          ) : (
            <>
              <ShoppingBag size={15} />
              <span className="product-card__add-label">Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          <div className="product-card__rating">
            <Star size={11} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="product-card__reviews">({product.reviews})</span>
          </div>
        </div>

        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-card__original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
