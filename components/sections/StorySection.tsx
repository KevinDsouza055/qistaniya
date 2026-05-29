'use client';

import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="py-48 sm:py-72 lg:py-96 bg-charcoal-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 arabic-pattern opacity-50" />

      <div className="site-container relative z-10 px-8 sm:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-24 sm:gap-32 lg:gap-56 items-center">
          {/* Images collage */}
          <div className="relative h-[400px] sm:h-[550px] lg:h-[600px] order-2 lg:order-1 mt-12 lg:mt-0">
            {/* Main image */}
            <div className="absolute top-0 left-0 w-[65%] h-[70%] overflow-hidden gold-border rounded-[2.5rem] shadow-2xl">
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
            <div className="absolute bottom-0 right-0 w-[55%] h-[60%] overflow-hidden gold-border rounded-[2.5rem] shadow-2xl">
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
            <div className="absolute top-[65%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 glass gold-border rounded-full flex items-center justify-center shadow-2xl">
              <span className="gold-text text-2xl">✦</span>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-8 bg-gold-300/60" />
              <span className="text-gold-300 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Our Story
              </span>
            </div>

            <h2
              className="font-serif text-cream mb-10 sm:mb-16 leading-[1.2]"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700 }}
            >
              Where Heritage
              <br />
              <span className="gold-text italic">Meets Flavour</span>
            </h2>

            <p className="text-cream/80 text-xl sm:text-2xl leading-[1.8] mb-8 sm:mb-12 font-normal" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Nestled in the heart of Mira Road East, Qistaniya was born from a passion for preserving the rich culinary traditions of Arabia and Mughal India. Every recipe has been passed through generations, every spice carefully sourced.
            </p>

            <p className="text-cream/50 text-base sm:text-xl leading-relaxed mb-14 sm:mb-20 font-light" style={{ fontFamily: 'Raleway, sans-serif' }}>
              From our signature Mandi Lamb to the slow-cooked Dum Biryani, we invite you to embark on a journey through the royal kitchens of the ancient world, right here in Mumbai.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10">
              {[
                { num: '120+', label: 'Dishes' },
                { num: '900+', label: 'Reviews' },
                { num: '4.1★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label} className="text-center glass gold-border rounded-[2rem] sm:rounded-[3rem] py-8 px-4 sm:py-10 sm:px-6 flex flex-col justify-center transition-transform hover:-translate-y-2">
                  <p className="gold-text font-serif text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {stat.num}
                  </p>
                  <p className="text-cream/40 text-[8px] sm:text-[10px] lg:text-[11px] tracking-[0.1em] sm:tracking-[0.3em] uppercase mt-1 sm:mt-2 leading-tight" style={{ fontFamily: 'Raleway, sans-serif' }}>
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
