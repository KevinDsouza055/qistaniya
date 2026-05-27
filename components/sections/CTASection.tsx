import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative page-section-lg overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-charcoal-900/80" />
      <div className="absolute inset-0 arabic-pattern opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

      <div className="relative z-10 site-container-3xl text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-gold-300/50" />
          <span className="text-gold-300 text-[9px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Experience Royalty</span>
          <div className="h-px w-8 bg-gold-300/50" />
        </div>

        <h2
          className="font-serif text-cream leading-tight mb-6"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}
        >
          Reserve Your Table
          <br />
          <span className="gold-text italic">Tonight</span>
        </h2>

        <p className="text-cream/60 text-sm leading-relaxed mb-10 max-w-md mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
          Join us for an unforgettable evening of royal Arabic and Mughlai cuisine.
          Private dining rooms available for special occasions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservations" className="btn-gold px-10 py-4 text-xs relative z-10">
            Book a Table
          </Link>
          <Link href="/order" className="btn-outline px-10 py-4 text-xs">
            Order Online
          </Link>
        </div>

        <p className="text-cream/30 text-xs mt-8 tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Or call us at{' '}
          <a href="tel:09987370880" className="text-gold-300/60 hover:text-gold-300 transition-colors">09987370880</a>
        </p>
      </div>
    </section>
  );
}
