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
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden flex items-center justify-center">
      {/* Background image with parallax */}
      <div
        ref={videoRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url('/images/hero1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/90" />
      <div className="absolute inset-0 arabic-pattern" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,8,0.7) 100%)'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Ornament top */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/60" />
          <span className="text-gold-300/70 text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Est. Mira Road, Mumbai
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/60" />
        </div>

        {/* Main headline */}
        <h1
          className="font-serif text-cream leading-none mb-6"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 800,
            lineHeight: 0.95,
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
          className="text-cream/60 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            animation: 'slideUp 1s ease-out 0.6s both',
          }}
        >
          Royal Arabic & Mughlai cuisine crafted from centuries-old recipes,
          served in the heart of Mira Road East, Mumbai
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'slideUp 1s ease-out 0.9s both' }}
        >
          <Link href="/order" className="btn-gold text-xs sm:text-sm px-8 py-4 relative z-10 w-full sm:w-auto text-center">
            Order Now
          </Link>
          <Link href="/reservations" className="btn-outline text-xs sm:text-sm px-8 py-4 w-full sm:w-auto text-center">
            Reserve Table
          </Link>
          <Link href="/menu" className="text-cream/60 hover:text-gold-300 text-xs sm:text-sm tracking-[0.15em] uppercase transition-colors py-2 px-4"
            style={{ fontFamily: 'Raleway, sans-serif' }}>
            Explore Menu →
          </Link>
        </div>

        {/* Rating badge */}
        <div className="mt-12 flex items-center justify-center gap-6" style={{ animation: 'fadeIn 1.5s ease-out 1.2s both' }}>
          <div className="glass gold-border rounded-sm px-5 py-3 flex items-center gap-3">
            <div>
              <div className="flex gap-1 mb-0.5">
                {[1,2,3,4].map(i => (
                  <svg key={i} className="w-3 h-3 fill-gold-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
                <svg className="w-3 h-3" viewBox="0 0 20 20" style={{ fill: 'url(#half)' }}>
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
            <div className="h-8 w-px bg-gold-300/20" />
            <div>
              <p className="gold-text font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>4.1</p>
              <p className="text-cream/40 text-[10px]" style={{ fontFamily: 'Raleway, sans-serif' }}>Rating</p>
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
