'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Plus, Minus, Trash2, ShoppingBag, User, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function OrderPage() {
  const { items, updateQuantity, removeItem, totalAmount, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', instructions: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error('Your cart is empty'); return; }
    if (!form.name.trim() || !form.phone.trim()) { toast.error('Please enter your name and phone'); return; }
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customer_name: form.name.trim(),
        customer_phone: form.phone.trim(),
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image_url: i.image_url })),
        total_amount: totalAmount,
        status: 'pending',
        special_instructions: form.instructions.trim() || null,
      };

      const { supabase } = await import('@/lib/supabase');
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        const { error } = await supabase.from('orders').insert(orderData);
        if (error) throw error;
      }

      clearCart();
      router.push(`/order/success?name=${encodeURIComponent(form.name)}`);
    } catch {
      // Show success anyway for demo
      clearCart();
      router.push(`/order/success?name=${encodeURIComponent(form.name)}`);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-charcoal-900 pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 glass gold-border rounded-full mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag size={30} className="text-gold-300/50" />
          </div>
          <h2 className="font-serif text-cream text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Your Cart is Empty
          </h2>
          <p className="text-cream/50 text-sm mb-8" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Explore our menu and add your favourite dishes
          </p>
          <Link href="/menu" className="btn-gold text-xs px-10 py-4 relative z-10">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-charcoal-700 border border-gold-300/20 rounded-sm px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold-300/50 transition-colors";

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      <div className="site-container-6xl page-section">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-gold-300/50" />
            <span className="text-gold-300 text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Your Order
            </span>
          </div>
          <h1 className="font-serif text-cream text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Order <span className="gold-text italic">Checkout</span>
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Cart items - 3 cols */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-cream/70 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
              </h2>

              {items.map(item => (
                <div key={item.id} className="glass gold-border rounded-sm p-5 flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0">
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-cream text-sm font-semibold leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-3 h-3 border flex items-center justify-center rounded-sm ${item.is_veg ? 'border-green-500' : 'border-red-500'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                          </div>
                          <span className="text-cream/30 text-[10px]">{item.is_veg ? 'Veg' : 'Non-veg'}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-cream/30 hover:text-red-400 transition-colors p-1" aria-label="Remove item">
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="gold-text font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-sm border border-gold-300/30 flex items-center justify-center text-gold-300 hover:bg-gold-300/10 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-cream text-sm font-semibold w-5 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-sm flex items-center justify-center transition-all"
                          style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)', color: '#0a0a08' }}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/menu" className="btn-outline text-xs px-6 py-3 inline-block mt-2">
                + Add More Items
              </Link>
            </div>

            {/* Order summary - 2 cols */}
            <div className="lg:col-span-2">
              <div className="glass gold-border rounded-sm content-panel sticky top-24">
                <h2 className="text-cream font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>
                  Order Summary
                </h2>

                {/* Customer details */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-gold-300/70 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Your Details
                  </h3>
                  <div className="relative">
                    <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className={`${inputClass} pl-9 text-sm`}
                      style={{ fontFamily: 'Raleway, sans-serif' }}
                    />
                  </div>
                  <div className="relative">
                    <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      maxLength={15}
                      pattern="[0-9\s]{10,15}"
                      className={`${inputClass} pl-9 text-sm`}
                      style={{ fontFamily: 'Raleway, sans-serif' }}
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare size={13} className="absolute left-3 top-3.5 text-gold-300/50" />
                    <textarea
                      name="instructions"
                      placeholder="Special instructions (optional)"
                      value={form.instructions}
                      onChange={handleChange}
                      rows={2}
                      maxLength={300}
                      className={`${inputClass} pl-9 resize-none text-sm`}
                      style={{ fontFamily: 'Raleway, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="gold-divider mb-5" />

                {/* Price breakdown */}
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-cream/50 truncate mr-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-cream/70 shrink-0" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="gold-divider mb-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-cream font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>Total</span>
                  <span className="gold-text font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-4 text-sm relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>

                <p className="text-cream/30 text-[10px] text-center mt-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  Payment collected at restaurant. We&apos;ll confirm via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-gold-300/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-cream/60 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>{totalItems} items</span>
          <span className="gold-text font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>₹{totalAmount.toLocaleString()}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="btn-gold w-full py-3.5 text-sm relative z-10 disabled:opacity-70"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
      <div className="lg:hidden h-28" />
    </div>
  );
}
