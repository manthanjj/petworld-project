import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const links = [
    { label: 'Shop', href: '/shop' },
    { label: 'Nutrition', href: '/shop?category=nutrition' },
    { label: 'Accessories', href: '/shop?category=accessories' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🐾</span>
          <span className="navbar__logo-text">PetWorld</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {links.map(link => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__cart-btn" onClick={onCartOpen} aria-label="Open cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </button>
          <button
            className="navbar__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {links.map(link => (
          <Link key={link.href} to={link.href} className="navbar__mobile-link">
            {link.label}
          </Link>
        ))}
        <button className="navbar__mobile-cart" onClick={() => { onCartOpen(); setMenuOpen(false) }}>
          <ShoppingBag size={18} />
          Cart {cartCount > 0 && `(${cartCount})`}
        </button>
      </div>
    </nav>
  )
}
