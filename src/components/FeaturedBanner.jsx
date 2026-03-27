import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './FeaturedBanner.css'

export default function FeaturedBanner() {
  return (
    <section className="featured-banner">
      <div className="featured-banner__inner container">
        <div className="featured-banner__text">
          <span className="tag">New Arrival</span>
          <h2 className="featured-banner__headline">
            The ritual your <br />
            <em>dog deserves.</em>
          </h2>
          <p className="featured-banner__sub">
            Introducing the Wilderness Raw Blend — freeze-dried nutrition crafted from 95% animal ingredients. No fillers. No compromise. Just pure ancestral fuel.
          </p>
          <div className="featured-banner__pills">
            {['Grain Free', 'Freeze Dried', 'Single Protein', 'Vet Approved'].map(p => (
              <span key={p} className="featured-banner__pill">{p}</span>
            ))}
          </div>
          <Link to="/product/pw-002" className="btn btn-primary">
            Discover Product <ArrowRight size={16} />
          </Link>
        </div>

        <div className="featured-banner__visual">
          <div className="featured-banner__img-frame">
            <img
              src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=700&q=85"
              alt="Wilderness Raw Blend"
              className="featured-banner__img"
            />
            <div className="featured-banner__circle" />
          </div>

          {/* Stats */}
          <div className="featured-banner__stats">
            {[
              { v: '95%', l: 'Animal ingredients' },
              { v: '0g', l: 'Fillers or grain' },
              { v: '186', l: 'Reviews' },
            ].map(s => (
              <div key={s.l} className="featured-banner__stat">
                <span className="featured-banner__stat-v">{s.v}</span>
                <span className="featured-banner__stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
