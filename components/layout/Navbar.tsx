'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reservations', label: 'Reserve' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div
        className="site-container"
        style={{
          width: 'min(calc(100% - 4rem), 80rem)',
          marginInline: 'auto',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="gold-text font-serif text-xl md:text-2xl font-bold tracking-wide"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Qistaniya
            </span>
            <span
              className="text-gold-200/60 text-[9px] tracking-[0.35em] uppercase"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              Restaurant
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-gold-300 text-sm tracking-[0.12em] uppercase transition-colors duration-300"
                style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link href="/order" className="relative">
              <div className="flex items-center gap-2 btn-outline text-sm px-4 py-2 hidden sm:flex">
                <ShoppingCart size={15} />
                <span>Order</span>
                {totalItems > 0 && (
                  <span className="cart-badge absolute -top-2 -right-2">{totalItems}</span>
                )}
              </div>
              <div className="sm:hidden relative p-2">
                <ShoppingCart size={20} className="text-gold-300" />
                {totalItems > 0 && (
                  <span className="cart-badge absolute -top-1 -right-1">{totalItems}</span>
                )}
              </div>
            </Link>

            <Link href="/reservations" className="btn-gold text-xs px-4 py-2 hidden md:block relative z-10">
              Reserve Table
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-cream/70 hover:text-gold-300 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass-dark border-t border-gold-300/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-cream/80 hover:text-gold-300 text-sm tracking-[0.15em] uppercase transition-colors"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
            <div className="gold-divider" />
            <Link href="/reservations" onClick={() => setOpen(false)} className="btn-gold text-center text-xs py-3 relative z-10">
              Reserve Table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
