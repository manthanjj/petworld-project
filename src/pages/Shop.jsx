import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { products, categories } from '../data/products.js'
import './Shop.css'

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'new', label: 'Newest' },
]

export default function Shop({ addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const gridRef = useRef(null)

  useEffect(() => {
    const cat = searchParams.get('category')
    const sort = searchParams.get('sort')
    if (cat) setActiveCategory(cat)
    if (sort) setSortBy(sort)
  }, [searchParams])

  // Trigger reveal on filtered results
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.reveal')
    if (!cards) return
    cards.forEach(el => el.classList.remove('visible'))
    requestAnimationFrame(() => {
      cards.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 60)
      })
    })
  }, [activeCategory, sortBy])

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setSearchParams(cat === 'all' ? {} : { category: cat })
  }

  const currentSort = sortOptions.find(s => s.value === sortBy)

  return (
    <main className="shop" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Shop Header */}
      <div className="shop-header">
        <div className="container">
          <div className="shop-header__inner">
            <div>
              <span className="tag">All products</span>
              <h1 className="shop-header__title">
                The <em>Collection.</em>
              </h1>
            </div>
            <p className="shop-header__sub">
              {filtered.length} products curated for your companion
            </p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="shop-filterbar">
        <div className="container">
          <div className="shop-filterbar__inner">
            {/* Category filters */}
            <div className="shop-filterbar__cats">
              <button
                className={`shop-filter-btn ${activeCategory === 'all' ? 'shop-filter-btn--active' : ''}`}
                onClick={() => handleCategory('all')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`shop-filter-btn ${activeCategory === cat.id ? 'shop-filter-btn--active' : ''}`}
                  onClick={() => handleCategory(cat.id)}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="shop-sort">
              <button
                className="shop-sort__btn"
                onClick={() => setSortOpen(!sortOpen)}
              >
                <SlidersHorizontal size={14} />
                {currentSort?.label}
                <ChevronDown size={14} className={sortOpen ? 'rotated' : ''} />
              </button>
              {sortOpen && (
                <div className="shop-sort__dropdown">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      className={`shop-sort__option ${sortBy === opt.value ? 'shop-sort__option--active' : ''}`}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="shop-grid-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="shop-empty">
              <span>🐾</span>
              <p>No products found in this category yet.</p>
              <button className="btn btn-outline" onClick={() => handleCategory('all')}>
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="shop-grid" ref={gridRef}>
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <ProductCard product={product} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
