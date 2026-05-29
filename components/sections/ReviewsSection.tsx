'use client';

import React from 'react';

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
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3 sm:w-4 h-3 sm:h-4 ${i <= rating ? 'fill-gold-300' : 'fill-gold-300/10'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-24 sm:py-40 bg-charcoal-950 relative overflow-hidden">
      {/* Refined Background Decor */}
      <div className="absolute inset-0 arabic-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-charcoal-950 to-transparent z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-charcoal-950 to-transparent z-0" />

      <div className="site-container relative z-10 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 sm:mb-32 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="text-gold-300 text-[10px] sm:text-[12px] tracking-[0.4em] sm:tracking-[0.6em] uppercase font-medium" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Guest Experiences
            </span>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold-300/50" />
          </div>
          <h2
            className="font-serif text-cream"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700 }}
          >
            What Our <span className="gold-text italic">Guests Say</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <StarRating rating={4} /> {/* Rounded for component logic */}
            <span className="text-cream/40 text-sm sm:text-base border-l border-gold-300/20 pl-3" style={{ fontFamily: 'Raleway, sans-serif' }}>
              4.1 Avg Rating · 855+ Reviews
            </span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative flex flex-col h-full glass gold-border rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-16 transition-all duration-500 hover:-translate-y-3 hover:border-gold-300 hover:shadow-[0_40px_80px_rgba(212,168,67,0.12)] overflow-hidden"
            >
              {/* Subtle Overlay Texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-300/[0.03] to-transparent pointer-events-none" />
              
              {/* Ornament */}
              <div className="flex justify-center mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-300/20 self-center" />
                <span className="mx-4 text-gold-300/30 text-2xl">“</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-300/20 self-center" />
              </div>

              {/* Review Text Area - Vertically Centered */}
              <div className="flex-1 flex items-center justify-center mb-14 min-h-[140px]">
                <p className="text-cream/90 text-center text-lg sm:text-xl leading-relaxed italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {review.text}
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-col items-center pt-10 border-t border-gold-300/10 gap-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold shadow-2xl border border-gold-300/30"
                  style={{ background: 'linear-gradient(135deg, #1a1a15, #0a0a08)', color: '#d4a843' }}>
                  {review.avatar}
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className="text-cream text-base font-semibold tracking-wide" style={{ fontFamily: 'Raleway, sans-serif' }}>{review.name}</p>
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center" title="Verified Guest">
                      <svg className="w-2 h-2 fill-white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-gold-300/30 text-[11px] uppercase tracking-widest">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
