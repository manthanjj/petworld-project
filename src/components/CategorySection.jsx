import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/products.js'
import './CategorySection.css'

export default function CategorySection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.category-card').forEach((card, i) => {
              setTimeout(() => card.classList.add('visible'), i * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const catImages = {
    dogs: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
    cats: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80',
    birds: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=500&q=80',
    fish: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80',
    'small-pets': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&q=80',
  }

  return (
    <section className="categories" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="tag">Browse by companion</span>
          <h2 className="section-title">
            Every pet, <em>perfectly served.</em>
          </h2>
        </div>

        <div className="categories__grid">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="category-card reveal"
            >
              <div className="category-card__img-wrap">
                <img
                  src={catImages[cat.id]}
                  alt={cat.label}
                  className="category-card__img"
                />
                <div className="category-card__overlay" />
              </div>
              <div className="category-card__body">
                <span className="category-card__emoji">{cat.emoji}</span>
                <div>
                  <h3 className="category-card__label">{cat.label}</h3>
                  <p className="category-card__desc">{cat.description}</p>
                </div>
                <ArrowRight size={18} className="category-card__arrow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
