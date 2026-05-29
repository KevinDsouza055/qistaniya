'use client';

import { useState, useEffect } from 'react';

const reviews = [
  { id: 1, name: 'Arjun Mehta', rating: 5, text: 'Absolutely divine! The Mandi Lamb was unlike anything I\'ve tasted in Mumbai. Authentic Arabic flavours in the heart of Mira Road. Will return every week.', date: '2 weeks ago', avatar: 'AM' },
  { id: 2, name: 'Fatima Siddiqui', rating: 5, text: 'The ambience alone is worth the visit. Gold detailing, dim lighting, feels like a palace. Biryani is exceptional. Best restaurant in Mira Road, no competition.', date: '1 month ago', avatar: 'FS' },
  { id: 3, name: 'Rohan Sharma', rating: 4, text: 'Came for the Dum Biryani, stayed for the Kunafa. The portions are generous and the staff is incredibly attentive. Highly recommend for family gatherings.', date: '3 weeks ago', avatar: 'RS' },
  { id: 4, name: 'Zainab Ansari', rating: 5, text: 'Qistaniya serves some of the most authentic Arabic food I\'ve had outside the Middle East. The Nihari is slow-cooked to perfection. A hidden gem!', date: '1 week ago', avatar: 'ZA' },
  { id: 5, name: 'Priya Nair', rating: 4, text: 'Stunning interiors and phenomenal food. The Chicken Tikka is perfectly charred and the mint chutney is house-made. Definitely a premium experience at great value.', date: '2 months ago', avatar: 'PN' },
  { id: 6, name: 'Mohammed Ali', rating: 5, text: 'As someone who grew up eating Arabic food, Qistaniya brings me home. The Kabsa is the real deal. Chef clearly has deep knowledge of Middle Eastern cuisine.', date: '3 weeks ago', avatar: 'MA' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= rating ? 'fill-gold-300' : 'fill-charcoal-600'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-40 sm:py-48 bg-charcoal-700/50 relative overflow-x-hidden">
      <div className="absolute inset-0 arabic-pattern opacity-30" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
        }}
      />

      <div className="site-container relative z-10 px-4 sm:px-8 max-w-full">
        {/* Header */}
        <div className="section-heading mb-12 sm:mb-32 text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="text-gold-300 text-[11px] sm:text-[13px] tracking-[0.5em] sm:tracking-[0.7em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Testimonials</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300/50" />
          </div>
          <h2
            className="font-serif text-cream"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.85rem, 8vw, 4.5rem)', fontWeight: 700 }}
          >
            Stories of <span className="gold-text italic">Delight</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <StarRating rating={4} /> {/* Rounded for component logic */}
            <span className="text-cream/50 text-sm ml-2" style={{ fontFamily: 'Raleway, sans-serif' }}>4.1 · 855 Reviews on Google</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className={`glass gold-border rounded-[2rem] p-5 sm:p-10 transition-all duration-700 flex flex-col justify-between h-full relative ${
                idx === active ? 'border-gold-300 shadow-[0_20px_50px_rgba(212,168,67,0.1)] z-20' : 'opacity-90 md:opacity-50 grayscale-[0.3] md:grayscale-[0.8]'
              }`}
            >
              <div className="relative z-10">
                <div className="mb-3 sm:mb-6">
                  <span className="gold-text text-2xl sm:text-4xl opacity-30 font-serif leading-none">“</span>
                </div>
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold shrink-0 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)', color: '#0a0a08', fontFamily: 'Raleway, sans-serif' }}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-cream text-sm sm:text-base font-semibold tracking-wide break-words" style={{ fontFamily: 'Raleway, sans-serif' }}>{review.name}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-cream/30 text-[10px] sm:text-[12px]">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-cream/90 text-sm sm:text-base leading-relaxed italic font-light break-words" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2 bg-gold-300' : 'w-2 h-2 bg-gold-300/30'}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
