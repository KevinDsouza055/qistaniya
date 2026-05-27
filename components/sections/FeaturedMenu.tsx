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
    <section className="section-pad bg-charcoal-900 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

      <div className="site-container">
        {/* Header */}
        <div className="section-heading">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300/50" />
            <span className="text-gold-300 text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Curated Selection
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300/50" />
          </div>
          <h2
            className="font-serif text-cream"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
          >
            Royal <span className="gold-text italic">Favourites</span>
          </h2>
          <p className="text-cream/50 mt-3 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Dishes our guests return for, again and again
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dish) => (
            <div key={dish.id} className="menu-card glass gold-border rounded-sm overflow-hidden group">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={dish.image_url}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-sm"
                    style={{ background: 'rgba(212,168,67,0.9)', color: '#0a0a08', fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                    {dish.tag}
                  </span>
                </div>

                {/* Veg indicator */}
                <div className="absolute top-3 right-3">
                  <div className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm ${dish.is_veg ? 'border-green-500' : 'border-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${dish.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-cream font-serif text-base font-semibold leading-tight pr-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {dish.name}
                  </h3>
                  {dish.is_spicy && <span title="Spicy" className="text-base shrink-0">🌶️</span>}
                </div>
                <p className="text-cream/50 text-xs leading-relaxed mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  {dish.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="gold-text font-serif text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ₹{dish.price}
                  </span>
                  <button
                    onClick={() => {
                      addItem({ id: dish.id, name: dish.name, price: dish.price, quantity: 1, image_url: dish.image_url, is_veg: dish.is_veg });
                      toast.success(`${dish.name} added to cart`);
                    }}
                    className="w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <Plus size={16} color="#0a0a08" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu CTA */}
        <div className="text-center mt-12">
          <Link href="/menu" className="btn-outline inline-block px-10 py-4 text-xs">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
