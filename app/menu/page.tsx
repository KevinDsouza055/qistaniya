'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Plus, Minus, Flame, Leaf } from 'lucide-react';
import { menuItems, categories } from '@/lib/menu-data';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const { addItem, items, updateQuantity } = useCart();

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchVeg = !vegOnly || item.is_veg;
      return matchCat && matchSearch && matchVeg;
    });
  }, [activeCategory, search, vegOnly]);

  const getQty = (name: string) => {
    const cartItem = items.find(i => i.name === name);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/hero1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 to-charcoal-900/95" />
        <div className="absolute inset-0 arabic-pattern opacity-30" />
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-gold-300/50" />
            <span className="text-gold-300 text-[11px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Our Offerings</span>
            <div className="h-px w-8 bg-gold-300/50" />
          </div>
          <h1 className="font-serif text-cream" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.75rem, 8vw, 4.5rem)', fontWeight: 800 }}>
            The Royal <span className="gold-text italic">Menu</span>
          </h1>
        </div>
      </div>

      {/* Sticky controls */}
      <div className="sticky top-16 z-30 border-b border-gold-300/10 backdrop-blur-xl bg-charcoal-900/90 shadow-2xl">
        <div className="site-container py-6 sm:py-8">
          {/* Search + Veg filter */}
          <div className="flex flex-col sm:flex-row gap-5 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-charcoal-800/50 border border-gold-300/20 rounded-sm pl-12 pr-4 py-4 text-cream text-sm placeholder:text-cream/40 focus:outline-none focus:border-gold-300/50 transition-all shadow-inner"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-sm border transition-all text-xs sm:text-sm font-bold uppercase tracking-[0.1em] ${
                vegOnly
                  ? 'border-green-500/60 bg-green-500/10 text-green-400'
                  : 'border-gold-300/20 bg-charcoal-800/50 text-cream/60'
              }`}
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Leaf size={13} />
              <span>Veg Only</span>
            </button>
          </div>

          {/* Category pills */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-8 py-3 rounded-sm text-xs sm:text-sm tracking-[0.15em] uppercase transition-all snap-start ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold'
                  : 'border border-gold-300/20 text-cream/60 hover:border-gold-300/40'
              }`}
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              All
            </button>
            {categories.map((cat, idx) => (
              <button
                key={`${cat.slug}-${idx}`}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-sm text-[11px] sm:text-sm tracking-[0.1em] uppercase transition-all flex items-center gap-2 ${
                  activeCategory === cat.slug
                    ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold'
                    : 'border border-gold-300/20 text-cream/60 hover:border-gold-300/40'
                }`}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="site-container page-section py-12 sm:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-cream/30 text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No dishes found for your search.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); setVegOnly(false); }} className="btn-outline mt-6 text-xs px-8 py-3">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, idx) => { // Added idx to key for uniqueness
              const qty = getQty(item.name);
              const itemId = `menu-${idx}`;
              return (
                <div key={itemId} className="menu-card glass gold-border rounded-sm overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div className={`w-4.5 h-4.5 border-2 flex items-center justify-center rounded-sm ${item.is_veg ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    </div>
                    {item.is_spicy && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[11px] bg-red-900/70 text-red-300 px-2 py-0.5 rounded-sm flex items-center gap-1">
                          <Flame size={10} /> Spicy
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-cream text-base font-semibold mb-1.5 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {item.name}
                    </h3>
                    <p className="text-cream/40 text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="gold-text font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>₹{item.price}</span>

                      {qty === 0 ? (
                        <button
                          onClick={() => {
                            addItem({ id: itemId, name: item.name, price: item.price, quantity: 1, image_url: item.image_url, is_veg: item.is_veg });
                            toast.success(`${item.name} added!`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs transition-all hover:scale-105"
                          style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)', color: '#0a0a08', fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                        >
                          <Plus size={12} /> Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(itemId, qty - 1)}
                            className="w-8 h-8 rounded-sm border border-gold-300/40 flex items-center justify-center text-gold-300 hover:bg-gold-300/10 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-cream text-base font-semibold w-6 text-center">{qty}</span>
                          <button
                            onClick={() => updateQuantity(itemId, qty + 1)}
                            className="w-8 h-8 rounded-sm flex items-center justify-center transition-all"
                            style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)', color: '#0a0a08' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Result count */}
        <div className="mt-8 text-center">
          <p className="text-cream/30 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Showing {filtered.length} of {menuItems.length} dishes
          </p>
        </div>
      </div>
    </div>
  );
}
