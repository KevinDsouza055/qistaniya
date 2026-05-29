'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const featured = [
  {
    id: 'feat-1',
    name: 'Mandi Lamb',
    description: 'Slow-cooked whole lamb on fragrant basmati with saffron and Arabic spices',
    price: 850,
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    is_veg: false,
    is_spicy: false,
    tag: 'Chef\'s Choice',
  },
  {
    id: 'feat-2',
    name: 'Dum Biryani',
    description: 'Fragrant basmati sealed with slow-cooked lamb, saffron milk and rose water',
    price: 520,
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600',
    is_veg: false,
    is_spicy: true,
    tag: 'Bestseller',
  },
  {
    id: 'feat-3',
    name: 'Chicken Tikka',
    description: 'Succulent boneless chicken marinated in yoghurt-spice blend and charred in the clay tandoor',
    price: 380,
    image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600',
    is_veg: false,
    is_spicy: true,
    tag: 'Popular',
  },
  {
    id: 'feat-4',
    name: 'Kunafa',
    description: 'Crispy shredded pastry with sweet cream cheese and rose water syrup',
    price: 260,
    image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600',
    is_veg: true,
    is_spicy: false,
    tag: 'Must Try',
  },
];

export default function FeaturedMenu() {
  const { addItem } = useCart();

  return (
    <section className="pt-64 pb-[30vh] sm:pt-80 sm:pb-[40vh] bg-charcoal-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

      <div className="site-container px-8 sm:px-16 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="section-heading mb-40 sm:mb-64">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="text-gold-300 text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Curated Selection
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/50" />
          </div>
          <h2
            className="font-serif text-cream"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', fontWeight: 700 }}
          >
            Royal <span className="gold-text italic">Favourites</span>
          </h2>
          <p className="text-cream/50 mt-12 text-xl sm:text-3xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Dishes our guests return for, again and again
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 sm:gap-32 lg:gap-40">
          {featured.map((dish) => (
            <div key={dish.id} className="menu-card glass gold-border rounded-[5rem] sm:rounded-[7rem] overflow-hidden group transition-all duration-700 hover:-translate-y-8 hover:border-gold-300 hover:shadow-[0_60px_120px_rgba(212,168,67,0.18)]">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={dish.image_url}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />

                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase px-3 py-2 rounded-lg backdrop-blur-md border border-gold-300/20 shadow-lg"
                    style={{ background: 'rgba(212,168,67,0.85)', color: '#0a0a08', fontFamily: 'Raleway, sans-serif', fontWeight: 700 }}>
                    {dish.tag}
                  </span>
                </div>

                {/* Veg indicator */}
                <div className="absolute top-6 right-6">
                  <div className={`w-6 h-6 border-2 flex items-center justify-center rounded-lg backdrop-blur-md ${dish.is_veg ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${dish.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-14 sm:p-20">
                <div className="flex items-start justify-between mb-8">
                  <h3
                    className="text-cream font-serif text-2xl sm:text-3xl font-semibold leading-tight pr-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {dish.name}
                  </h3>
                  {dish.is_spicy && <span title="Spicy" className="text-3xl shrink-0">🌶️</span>}
                </div>
                <p className="text-cream/40 text-lg leading-[1.8] mb-14 h-20 line-clamp-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  {dish.description}
                </p>
                <div className="flex items-center justify-between pt-10 border-t border-gold-300/10">
                  <span className="gold-text font-serif text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ₹{dish.price}
                  </span>
                  <button
                    onClick={() => {
                      addItem({ id: dish.id, name: dish.name, price: dish.price, quantity: 1, image_url: dish.image_url, is_veg: dish.is_veg });
                      toast.success(`${dish.name} added to cart!`);
                    }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <Plus size={24} color="#0a0a08" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu CTA */}
        <div className="text-center mt-48 sm:mt-[20vh]">
          <Link href="/menu" className="btn-outline inline-block px-24 py-8 text-lg tracking-[0.4em] font-medium transition-all hover:px-32">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
