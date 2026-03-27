import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const els = [headlineRef, subRef, ctaRef, imageRef]
    els.forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.animationDelay = `${i * 150 + 200}ms`
        ref.current.classList.add('hero__animate')
      }
    })
  }, [])

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-grid" />
      </div>

      <div className="hero__content container">
        {/* Left text */}
        <div className="hero__text">
          <div className="hero__eyebrow" ref={headlineRef}>
            <span className="tag">Est. 2024 · Premium Pet Care</span>
          </div>

          <h1 className="hero__headline">
            <span className="hero__headline-line">Crafted for</span>
            <span className="hero__headline-line hero__headline-line--accent">the ones</span>
            <span className="hero__headline-line">who can&apos;t speak.</span>
          </h1>

          <p className="hero__sub" ref={subRef}>
            Biologically appropriate nutrition, artisan accessories, and expert wellness — curated for pets who deserve only the finest.
          </p>

          <div className="hero__cta" ref={ctaRef}>
            <Link to="/shop" className="btn btn-primary">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-outline">
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {[
              { value: '2400+', label: 'Happy pets' },
              { value: '98%', label: 'Satisfaction rate' },
              { value: '40+', label: 'Premium brands' },
            ].map(stat => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="hero__image-wrap" ref={imageRef}>
          <div className="hero__image-frame">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85"
              alt="Golden retriever in soft light"
              className="hero__image"
            />
            <div className="hero__image-overlay" />
          </div>
          {/* Floating card */}
          <div className="hero__card">
            <span className="hero__card-icon">⭐</span>
            <div>
              <div className="hero__card-title">Bestseller</div>
              <div className="hero__card-sub">Ancestral Grain Bowl</div>
            </div>
            <div className="hero__card-price">₹1,499</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  )
}
