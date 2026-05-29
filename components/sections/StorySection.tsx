'use client';

import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 arabic-pattern opacity-50" />

      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Images collage */}
          <div className="relative h-[450px] sm:h-[550px] lg:h-[600px] order-2 lg:order-1 mt-12 lg:mt-0">
            {/* Main image */}
            <div className="absolute top-0 left-0 w-[65%] h-[70%] overflow-hidden gold-border rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                alt="Qistaniya interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              <div className="absolute inset-0 bg-charcoal-900/20" />
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[60%] overflow-hidden gold-border rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
                alt="Food at Qistaniya"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-charcoal-900/20" />
            </div>
            {/* Gold accent dot */}
            <div className="absolute top-[65%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 glass gold-border rounded-full flex items-center justify-center">
              <span className="gold-text text-2xl">✦</span>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold-300/60" />
              <span className="text-gold-300 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Our Story
              </span>
            </div>

            <h2
              className="font-serif text-cream mb-8 leading-[1.2]"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
            >
              Where Heritage
              <br />
              <span className="gold-text italic">Meets Flavour</span>
            </h2>

            <p className="text-cream/80 text-lg sm:text-xl leading-relaxed mb-6 font-normal" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Nestled in the heart of Mira Road East, Qistaniya was born from a passion for preserving the rich culinary traditions of Arabia and Mughal India. Every recipe has been passed through generations, every spice carefully sourced.
            </p>

            <p className="text-cream/50 text-base leading-relaxed mb-10" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
              From our signature Mandi Lamb to the slow-cooked Dum Biryani, we invite you to embark on a journey through the royal kitchens of the ancient world, right here in Mumbai.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { num: '120+', label: 'Dishes' },
                { num: '900+', label: 'Reviews' },
                { num: '4.1★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label} className="text-center glass gold-border rounded-sm p-4">
                  <p className="gold-text font-serif text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {stat.num}
                  </p>
                  <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
