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
    <section className="section-pad bg-charcoal-700 relative overflow-hidden">
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

      <div className="site-container-6xl relative z-10">
        {/* Header */}
        <div className="section-heading">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="text-gold-300 text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>What Guests Say</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300/50" />
          </div>
          <h2
            className="font-serif text-cream"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
          >
            Stories of <span className="gold-text italic">Delight</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} />
            <span className="text-cream/50 text-sm ml-2" style={{ fontFamily: 'Raleway, sans-serif' }}>4.1 · 855 Reviews on Google</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className={`glass gold-border rounded-sm p-6 transition-all duration-500 ${
                idx === active ? 'border-gold-300/50 shadow-lg shadow-gold-300/10 scale-[1.02]' : 'hover:border-gold-300/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)', color: '#0a0a08', fontFamily: 'Raleway, sans-serif' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="text-cream/90 text-sm font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>{review.name}</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-cream/30 text-[10px]">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
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
