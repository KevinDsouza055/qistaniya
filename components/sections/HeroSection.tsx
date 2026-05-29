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
          <div className="flex gap-4 w-full sm:w-auto">
            <Link href="/order" className="btn-gold flex-1 sm:flex-none text-xs sm:text-sm px-8 py-3.5 sm:py-4 relative z-10 text-center shadow-2xl">
              Order Now
            </Link>
            <Link href="/reservations" className="btn-outline flex-1 sm:flex-none text-xs sm:text-sm px-8 py-3.5 sm:py-4 text-center">
              Reserve Table
            </Link>
          </div>
          <Link href="/menu" className="text-cream/60 hover:text-gold-300 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all py-2 px-6 border-b border-transparent hover:border-gold-300/30"
            style={{ fontFamily: 'Raleway, sans-serif' }}>
            Explore Menu →
          </Link>
        </div>

        {/* Rating badge */}
        <div className="mt-12 sm:mt-20 flex items-center justify-center opacity-0" style={{ animation: 'fadeIn 1.5s ease-out 1.2s both' }}>
          <div className="glass gold-border rounded-sm px-4 py-2.5 flex items-center gap-3 backdrop-blur-md">
            <div className="hidden xs:block">
              <div className="flex gap-0.5 sm:gap-1 mb-0.5">
                {[1,2,3,4].map(i => (
                  <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-gold-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 20 20" style={{ fill: 'url(#half)' }}>
                  <defs>
                    <linearGradient id="half">
                      <stop offset="50%" stopColor="#d4a843"/>
                      <stop offset="50%" stopColor="#3a3a30"/>
                    </linearGradient>
                  </defs>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p className="text-cream/40 text-[10px] tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>855 Google Reviews</p>
            </div>
            <div className="hidden xs:block h-6 w-px bg-gold-300/20" />
            <div>
              <p className="gold-text font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>4.1</p>
              <p className="text-cream/40 text-[9px]" style={{ fontFamily: 'Raleway, sans-serif' }}>Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: 'fadeIn 2s ease-out 1.5s both' }}>
        <span className="text-cream/30 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-300/40 to-transparent animate-float" />
      </div>
    </section>
  );
}
