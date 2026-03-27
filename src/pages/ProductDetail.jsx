import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, ShoppingBag, Heart, Share2, Check } from 'lucide-react'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './ProductDetail.css'

export default function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id)
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="pd-notfound">
        <span>🐾</span>
        <p>Product not found.</p>
        <button className="btn btn-outline" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const formatPrice = (p) => '₹' + p.toLocaleString('en-IN')

  return (
    <main className="pd" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="pd__breadcrumb">
          <Link to="/shop" className="pd__back">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <span className="pd__breadcrumb-sep">/</span>
          <span className="pd__breadcrumb-cat">{product.category}</span>
          <span className="pd__breadcrumb-sep">/</span>
          <span className="pd__breadcrumb-name">{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="pd__layout">
          {/* Image */}
          <div className="pd__image-col">
            <div className="pd__image-frame">
              <img src={product.image} alt={product.name} className="pd__image" />
              {product.badge && (
                <span className="pd__badge">{product.badge}</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="pd__info-col">
            <div className="pd__meta">
              <span className="pd__brand">{product.brand}</span>
              <div className="pd__rating">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="pd__rating-val">{product.rating}</span>
                <span className="pd__rating-count">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="pd__name">{product.name}</h1>

            <div className="pd__price-row">
              <span className="pd__price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="pd__original">{formatPrice(product.originalPrice)}</span>
                  <span className="pd__discount">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className="pd__desc">{product.description}</p>

            {/* Tags */}
            <div className="pd__tags">
              {product.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <div className="pd__divider" />

            {/* Qty + Add */}
            <div className="pd__actions">
              <div className="pd__qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <button
                className={`btn btn-primary pd__add ${added ? 'pd__add--done' : ''}`}
                onClick={handleAdd}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {added ? (
                  <><Check size={16} /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={16} /> Add to Cart</>
                )}
              </button>

              <button
                className={`pd__wish ${wished ? 'pd__wish--active' : ''}`}
                onClick={() => setWished(!wished)}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Perks */}
            <div className="pd__perks">
              {[
                { icon: '🚚', text: 'Free shipping above ₹999' },
                { icon: '🔄', text: '30-day hassle-free returns' },
                { icon: '🔬', text: 'Vet formulated & approved' },
              ].map(perk => (
                <div key={perk.text} className="pd__perk">
                  <span>{perk.icon}</span>
                  <span>{perk.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pd__related">
            <div className="pd__related-header">
              <span className="tag">More like this</span>
              <h2 className="section-title" style={{ marginTop: 12 }}>
                You might also <em>love.</em>
              </h2>
            </div>
            <div className="pd__related-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
