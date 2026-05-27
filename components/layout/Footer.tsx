import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 border-t border-gold-300/10 arabic-pattern">
      <div className="site-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="gold-text font-serif text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Qistaniya
            </h3>
            <p className="text-gold-200/50 text-[10px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Restaurant
            </p>
            <p className="text-cream/50 text-sm leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
              A culinary journey through the royal kitchens of Arabia and Mughal India. Every dish tells a story of heritage and flavour.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 glass gold-border rounded-sm hover:border-gold-300/60 transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 glass gold-border rounded-sm hover:border-gold-300/60 transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#d4a843"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-300 text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Our Menu' },
                { href: '/reservations', label: 'Reservations' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/order', label: 'Order Online' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/50 hover:text-gold-300 text-sm transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-300 text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-gold-300 mt-0.5 shrink-0" />
                <span className="text-cream/50 text-sm leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  Opp. Shivar Garden, Mira Road East, Mumbai – 401105
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={15} className="text-gold-300 shrink-0" />
                <a href="tel:09987370880" className="text-cream/50 hover:text-gold-300 text-sm transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  09987370880
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="text-gold-300 mt-0.5 shrink-0" />
                <span className="text-cream/50 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  11:00 AM – 1:30 AM<br />
                  <span className="text-gold-300/60 text-xs">Open Daily</span>
                </span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-gold-300 text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Book a Table
            </h4>
            <p className="text-cream/50 text-sm mb-5 leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Reserve your royal dining experience today.
            </p>
            <Link href="/reservations" className="btn-gold text-xs block text-center py-3 relative z-10">
              Reserve Now
            </Link>
            <a
              href="https://wa.me/919987370880"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs block text-center py-3 mt-3"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="gold-divider mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>
            © 2024 Qistaniya Restaurant. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Mira Road East, Mumbai, Maharashtra 401105
          </p>
        </div>
      </div>
    </footer>
  );
}
