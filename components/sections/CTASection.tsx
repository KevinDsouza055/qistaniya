import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative pt-[20vh] pb-64 sm:pt-[35vh] sm:pb-96 overflow-hidden">
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

      <div className="relative z-10 site-container max-w-4xl mx-auto text-center px-6">
        <div className="flex items-center justify-center gap-4 mb-24">
          <div className="h-px w-8 bg-gold-300/50" />
          <span className="text-gold-300 text-[9px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Experience Royalty</span>
          <div className="h-px w-8 bg-gold-300/50" />
        </div>

        <h2
          className="font-serif text-cream leading-tight mb-20 sm:mb-24"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800 }}
        >
          Reserve Your Table
          <br />
          <span className="gold-text italic">Tonight</span>
        </h2>

        <p className="text-cream/60 text-xl sm:text-3xl leading-relaxed mb-32 max-w-3xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Join us for an unforgettable evening of royal Arabic and Mughlai cuisine.
          Private dining rooms available for special occasions.
        </p>

        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
          <Link href="/reservations" className="btn-gold px-12 py-4 text-xs relative z-10 min-w-[200px]">
            Book a Table
          </Link>
          <Link href="/order" className="btn-outline px-12 py-4 text-xs min-w-[200px]">
            Order Online
          </Link>
        </div>

        <p className="text-cream/30 text-[11px] sm:text-xs mt-32 tracking-[0.2em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Or call us at{' '}
          <a href="tel:09987370880" className="text-gold-300/60 hover:text-gold-300 transition-colors border-b border-gold-300/20 pb-0.5">09987370880</a>
        </p>
      </div>
    </section>
  );
}
