import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './About.css'

export default function About() {
  const sectionsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const reveals = document.querySelectorAll('.about-reveal')
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="about" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="container about-hero__inner">
          <span className="tag">Our Story</span>
          <h1 className="about-hero__headline">
            Born from <em>love.</em><br />
            Built on <em>trust.</em>
          </h1>
          <p className="about-hero__sub">
            PetWorld was founded on a simple belief — your pet deserves the same standard of care you hold yourself to. No compromises.
          </p>
        </div>
        <div className="about-hero__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85"
            alt="Dog in natural light"
            className="about-hero__img"
          />
          <div className="about-hero__overlay" />
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container about-mission__inner">
          <div className="about-reveal">
            <span className="tag">Our Mission</span>
            <h2 className="about-section-title">
              Every product, <em>purposeful.</em>
            </h2>
          </div>
          <div className="about-mission__cols about-reveal">
            <p>
              We started PetWorld after years of frustration with pet products full of fillers, artificial preservatives, and marketing claims that didn't hold up. Our pets couldn't read the labels — so we read them for them.
            </p>
            <p>
              Today, every product in our collection is hand-selected, vet-reviewed, and tested against one simple standard: would we give this to our own pets? If the answer is anything less than an enthusiastic yes, it doesn't make the cut.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header about-reveal">
            <span className="tag">What we stand for</span>
            <h2 className="about-section-title">Our values.</h2>
          </div>
          <div className="about-values__grid">
            {[
              {
                number: '01',
                title: 'Transparency',
                desc: 'Every ingredient, every sourcing decision, every formulation — visible and explainable. We believe you deserve to know exactly what you\'re feeding your pet.',
              },
              {
                number: '02',
                title: 'Science + Nature',
                desc: 'We partner with veterinary nutritionists and herbalists alike. The best solutions are usually where ancient wisdom meets modern research.',
              },
              {
                number: '03',
                title: 'Sustainability',
                desc: 'Ethically sourced ingredients, minimal packaging, carbon-neutral shipping. Our love for animals extends to the planet they live on.',
              },
              {
                number: '04',
                title: 'Community',
                desc: 'Over 2,400 happy pets and their humans trust PetWorld. We\'re a community first, a store second.',
              },
            ].map(val => (
              <div key={val.number} className="about-value-card about-reveal">
                <span className="about-value-card__num">{val.number}</span>
                <h3 className="about-value-card__title">{val.title}</h3>
                <p className="about-value-card__desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats__grid about-reveal">
            {[
              { v: '2,400+', l: 'Happy pets served' },
              { v: '40+', l: 'Premium brands curated' },
              { v: '98%', l: 'Customer satisfaction' },
              { v: '100%', l: 'Vet-reviewed products' },
            ].map(stat => (
              <div key={stat.l} className="about-stat">
                <span className="about-stat__v">{stat.v}</span>
                <span className="about-stat__l">{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta__inner about-reveal">
          <h2 className="about-cta__title">
            Ready to elevate<br />your pet&apos;s world?
          </h2>
          <Link to="/shop" className="btn btn-primary">
            Explore the Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
