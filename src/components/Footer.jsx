import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span>🐾</span>
              <span className="footer__logo-text">PetWorld</span>
            </div>
            <p className="footer__tagline">
              Premium pet care, elevated. Crafted for the ones who can&apos;t speak.
            </p>
            <div className="footer__socials">
              {['Instagram', 'Twitter', 'Facebook'].map(s => (
                <a key={s} href="#" className="footer__social">{s}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="footer__cols">
            {[
              {
                title: 'Shop',
                links: [
                  { label: 'Dogs', href: '/shop?category=dogs' },
                  { label: 'Cats', href: '/shop?category=cats' },
                  { label: 'Birds', href: '/shop?category=birds' },
                  { label: 'New Arrivals', href: '/shop?sort=new' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About Us', href: '/about' },
                  { label: 'Blog', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Press', href: '#' },
                ],
              },
              {
                title: 'Help',
                links: [
                  { label: 'FAQ', href: '#' },
                  { label: 'Shipping Policy', href: '#' },
                  { label: 'Returns', href: '#' },
                  { label: 'Contact', href: '#' },
                ],
              },
            ].map(col => (
              <div key={col.title} className="footer__col">
                <h4 className="footer__col-title">{col.title}</h4>
                <ul className="footer__col-links">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link to={link.href} className="footer__link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <span className="footer__copy">© 2024 PetWorld. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
