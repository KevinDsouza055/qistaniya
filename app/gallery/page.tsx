'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', alt: 'Qistaniya Interior', category: 'Interior', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', alt: 'Mixed Grill Platter', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1563379091339-03246963d651?w=800', alt: 'Dum Biryani', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', alt: 'Mandi Lamb', category: 'Food', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', alt: 'Lamb Curry', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800', alt: 'Restaurant Ambience', category: 'Ambience', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800', alt: 'Chicken Tikka', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800', alt: 'Paneer Dish', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800', alt: 'Desserts', category: 'Desserts', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800', alt: 'Arabic Coffee', category: 'Beverages', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800', alt: 'Special Soup', category: 'Food', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', alt: 'Fresh Salad', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800', alt: 'Freshly Baked Naan', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800', alt: 'Lamb Chops', category: 'Food', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800', alt: 'Rice Dishes', category: 'Food', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', alt: 'Vegetarian Spread', category: 'Food', span: 'normal' },
];

const filterTabs = ['All', 'Interior', 'Food', 'Ambience', 'Desserts', 'Beverages'];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(i => i.category === activeFilter);

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      {/* Hero */}
      <div className="relative h-52 sm:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 to-charcoal-900/95" />
        <div className="absolute inset-0 arabic-pattern opacity-30" />
        <div className="relative z-10 px-4 sm:px-8 pb-8 max-w-7xl mx-auto w-full">
          <h1 className="font-serif text-cream" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Our <span className="gold-text italic">Gallery</span>
          </h1>
          <p className="text-cream/50 text-sm mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
            A visual journey through our flavours and spaces
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-16 z-30 bg-charcoal-800/95 backdrop-blur-xl border-b border-gold-300/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`shrink-0 px-4 py-2 rounded-sm text-xs tracking-[0.1em] uppercase transition-all ${
                activeFilter === tab
                  ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold'
                  : 'border border-gold-300/20 text-cream/60 hover:border-gold-300/40'
              }`}
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="masonry-grid">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="masonry-item cursor-pointer group overflow-hidden rounded-sm gold-border hover:border-gold-300/50 transition-all duration-300"
              onClick={() => setLightbox(i)}
            >
              <div className={`relative overflow-hidden ${img.span === 'tall' ? 'h-80' : 'h-52'}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-gold-300 text-2xl">✦</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-cream/80 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>{img.alt}</p>
                  <p className="text-gold-300/70 text-[10px] tracking-wider">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 glass gold-border rounded-full flex items-center justify-center text-cream/70 hover:text-cream transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/50 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {filtered[lightbox].alt}
          </p>
        </div>
      )}
    </div>
  );
}
