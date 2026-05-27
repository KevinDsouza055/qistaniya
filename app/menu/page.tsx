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
      <div className="page-hero">
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
        <div className="page-hero-content">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-gold-300/50" />
            <span className="text-gold-300 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Our Offerings</span>
          </div>
          <h1 className="font-serif text-cream" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            The Royal <span className="gold-text italic">Menu</span>
          </h1>
        </div>
      </div>

      {/* Sticky controls */}
      <div className="control-bar">
        <div className="site-container py-4">
          {/* Search + Veg filter */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full field-control bg-charcoal-700 border border-gold-300/20 rounded-sm pl-9 pr-4 py-2.5 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold-300/50 transition-colors"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border transition-all text-xs shrink-0 ${
                vegOnly
                  ? 'border-green-500/60 bg-green-500/10 text-green-400'
                  : 'border-gold-300/20 bg-charcoal-700 text-cream/60'
              }`}
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Leaf size={13} />
              <span className="hidden sm:inline">Veg Only</span>
            </button>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-2 rounded-sm text-xs tracking-[0.1em] uppercase transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold'
                  : 'border border-gold-300/20 text-cream/60 hover:border-gold-300/40'
              }`}
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-sm text-xs tracking-[0.08em] uppercase transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.slug
                    ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold'
                    : 'border border-gold-300/20 text-cream/60 hover:border-gold-300/40'
                }`}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="site-container page-section">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-cream/30 text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No dishes found for your search.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); setVegOnly(false); }} className="btn-outline mt-6 text-xs px-8 py-3">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, idx) => {
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
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <div className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm ${item.is_veg ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        <div className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    </div>
                    {item.is_spicy && (
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] bg-red-900/70 text-red-300 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                          <Flame size={9} /> Spicy
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-cream text-sm font-semibold mb-1 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {item.name}
                    </h3>
                    <p className="text-cream/40 text-xs leading-relaxed mb-3 line-clamp-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="gold-text font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>₹{item.price}</span>

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
                            className="w-7 h-7 rounded-sm border border-gold-300/40 flex items-center justify-center text-gold-300 hover:bg-gold-300/10 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-cream text-sm font-semibold w-5 text-center">{qty}</span>
                          <button
                            onClick={() => updateQuantity(itemId, qty + 1)}
                            className="w-7 h-7 rounded-sm flex items-center justify-center transition-all"
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
        <div className="mt-6 text-center">
          <p className="text-cream/30 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Showing {filtered.length} of {menuItems.length} dishes
          </p>
        </div>
      </div>
    </div>
  );
}
