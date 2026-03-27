import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import CategorySection from '../components/CategorySection.jsx'
import ProductCard from '../components/ProductCard.jsx'
import FeaturedBanner from '../components/FeaturedBanner.jsx'
import { products } from '../data/products.js'
import './Home.css'

export default function Home({ addToCart }) {
  const featured = products.slice(0, 4)
  const gridRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Hero />
      <Marquee />
      <CategorySection />

      {/* Featured Products */}
      <section className="home-products">
        <div className="container">
          <div className="home-products__header">
            <div>
              <span className="tag">Curated selection</span>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                Community <em>favourites.</em>
              </h2>
            </div>
            <Link to="/shop" className="btn btn-outline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-products__grid" ref={gridRef}>
            {featured.map((product, i) => (
              <div
                key={product.id}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedBanner />

      {/* Trust section */}
      <section className="home-trust">
        <div className="container">
          <div className="home-trust__grid">
            {[
              { icon: '🌿', title: 'Natural Ingredients', desc: 'Every product is formulated with ethically sourced, biologically appropriate ingredients.' },
              { icon: '🔬', title: 'Vet Approved', desc: 'Our entire range has been reviewed and approved by a panel of certified veterinarians.' },
              { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on all orders above ₹999. Fast, tracked, and packed with care.' },
              { icon: '💚', title: 'Satisfaction Guarantee', desc: '30-day hassle-free returns .' },
            ].map(item => (
              <div key={item.title} className="home-trust__card reveal">
                <span className="home-trust__icon">{item.icon}</span>
                <h3 className="home-trust__title">{item.title}</h3>
                <p className="home-trust__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
