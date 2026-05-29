'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      el.style.transform = `translateY(${scrolled * 0.4}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background image with parallax */}
      <div
        ref={videoRef}
        className="absolute inset-0 scale-110 motion-safe:animate-slow-zoom"
        style={{
          backgroundImage: `url('/images/hero1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/40 to-charcoal-900/95" />
      <div className="absolute inset-0 arabic-pattern opacity-40" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,8,0.8) 100%)'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Ornament top */}
        <div className="flex items-center justify-center gap-4 mb-10 sm:mb-14 animate-fade-in">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold-300/60" />
          <span className="text-gold-300/70 text-[11px] sm:text-[12px] tracking-[0.5em] sm:tracking-[0.7em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Est. Mira Road, Mumbai
          </span>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold-300/60" />
        </div>

        {/* Main headline */}
        <h1
          className="font-serif text-cream leading-[1.1] sm:leading-none mb-6 sm:mb-8"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 9vw, 6rem)',
            fontWeight: 800,
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            animation: 'slideUp 1s ease-out 0.3s both',
          }}
        >
          Flavors
          <br />
          <span className="shimmer-gold italic">That Stay</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-cream/60 text-base sm:text-lg max-w-xl mx-auto mb-16 sm:mb-20 leading-relaxed"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            animation: 'slideUp 1s ease-out 0.6s both',
          }}
        >
          Royal Arabic & Mughlai cuisine crafted from centuries-old recipes,
          served in the heart of Mira Road East, Mumbai
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center items-center" style={{ animation: 'slideUp 1s ease-out 0.9s both' }}>
          <div className="flex gap-3 sm:gap-4">
            <Link href="/order" className="btn-gold text-[11px] sm:text-xs px-5 py-2.5 sm:px-7 sm:py-3 relative z-10 text-center shadow-2xl min-w-[120px] sm:min-w-[140px]">
              Order Now
            </Link>
            <Link href="/reservations" className="btn-outline text-[11px] sm:text-xs px-5 py-2.5 sm:px-7 sm:py-3 text-center min-w-[120px] sm:min-w-[140px]">
              Reserve Table
            </Link>
          </div>
          <Link href="/menu" className="text-cream hover:text-gold-300 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all py-2 px-6 border-b border-gold-300/30 hover:border-gold-300 font-medium"
            style={{ fontFamily: 'Raleway, sans-serif' }}>
            Explore Menu →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: 'fadeIn 2s ease-out 1.5s both' }}>
        <div className="w-px h-10 bg-gradient-to-b from-gold-300/40 to-transparent animate-float" />
      </div>
    </section>
  );
}
