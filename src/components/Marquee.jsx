import './Marquee.css'

const items = [
  '🐾 Premium Nutrition',
  '✦ Artisan Accessories',
  '🌿 Natural Wellness',
  '✦ Free Shipping Above ₹999',
  '🐾 Vet Approved Formulas',
  '✦ 2400+ Happy Pets',
  '🌱 Sustainably Sourced',
  '✦ New Arrivals Weekly',
]

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee__item">{item}</span>
        ))}
      </div>
    </div>
  )
}
