'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, LogOut, Clock, User, Phone, ChevronDown, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';
import type { Order } from '@/types';

const STATUS_OPTIONS = ['pending', 'preparing', 'ready', 'delivered'] as const;
type OrderStatus = typeof STATUS_OPTIONS[number];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  delivered: 'Delivered',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'status-pending',
  preparing: 'status-preparing',
  ready: 'status-ready',
  delivered: 'status-delivered',
};

// Demo orders for when Supabase is not configured
const DEMO_ORDERS: Order[] = [
  {
    id: 'demo-1',
    customer_name: 'Arjun Mehta',
    customer_phone: '9876543210',
    items: [
      { id: '1', name: 'Mandi Lamb', price: 850, quantity: 1 },
      { id: '2', name: 'Hummus Special', price: 220, quantity: 2 },
    ],
    total_amount: 1290,
    status: 'pending',
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    customer_name: 'Fatima Siddiqui',
    customer_phone: '9123456789',
    items: [
      { id: '3', name: 'Dum Biryani', price: 520, quantity: 2 },
      { id: '4', name: 'Chicken Tikka', price: 380, quantity: 1 },
    ],
    total_amount: 1420,
    status: 'preparing',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    customer_name: 'Rohan Sharma',
    customer_phone: '9988776655',
    items: [
      { id: '5', name: 'Kunafa', price: 260, quantity: 1 },
      { id: '6', name: 'Arabic Qahwa', price: 120, quantity: 2 },
    ],
    total_amount: 500,
    status: 'ready',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'YOUR_SUPABASE_URL';

  const fetchOrders = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      setOrders(data || []);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [isSupabaseConfigured]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    let isActive = true;
    let channel: ReturnType<typeof import('@/lib/supabase')['supabase']['channel']> | null = null;

    void Promise.resolve().then(fetchOrders);

    void import('@/lib/supabase').then(({ supabase }) => {
      if (!isActive) {
        return;
      }

      channel = supabase
        .channel('orders-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          void fetchOrders();
          toast.info('Orders updated');
        })
        .subscribe();
    });

    return () => {
      isActive = false;
      if (channel) {
        void import('@/lib/supabase').then(({ supabase }) => supabase.removeChannel(channel!));
      }
    }
  }, [fetchOrders, isSupabaseConfigured]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId);
    try {
      if (isSupabaseConfigured) {
        const { supabase } = await import('@/lib/supabase');
        const { error } = await supabase
          .from('orders')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', orderId);
        if (error) throw error;
        await fetchOrders();
      } else {
        // Demo mode
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
      toast.success(`Order marked as ${STATUS_LABELS[newStatus]}`);
    } catch {
      toast.error('Failed to update order status');
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      const { supabase } = await import('@/lib/supabase');
      await supabase.auth.signOut();
    }
    router.push('/login');
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.status === s).length;
    return acc;
  }, {} as Record<OrderStatus, number>);

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      {/* Dashboard Header */}
      <div className="glass-dark border-b border-gold-300/10 sticky top-16 z-30">
        <div className="site-container py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-cream text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Staff <span className="gold-text">Dashboard</span>
            </h1>
            {!isSupabaseConfigured && (
              <span className="text-yellow-500/70 text-[10px] tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Demo Mode – Configure Supabase for live orders
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isSupabaseConfigured && (
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="btn-outline text-xs px-4 py-2 flex items-center gap-2"
              >
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            )}
            <button onClick={handleLogout} className="flex items-center gap-2 text-cream/50 hover:text-red-400 text-xs transition-colors px-3 py-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="site-container page-section">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {STATUS_OPTIONS.map(status => (
            <div key={status} className={`glass gold-border rounded-sm p-3 sm:p-4 text-center cursor-pointer transition-all ${filter === status ? 'border-gold-300/50' : ''}`} onClick={() => setFilter(prev => prev === status ? 'all' : status)}>
              <p className="text-xl sm:text-2xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif', color: status === 'pending' ? '#fbbf24' : status === 'preparing' ? '#60a5fa' : status === 'ready' ? '#4ade80' : '#d4a843' }}>
                {counts[status]}
              </p>
              <p className="text-cream/40 text-xs tracking-[0.15em] uppercase mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {STATUS_LABELS[status]}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-sm text-xs tracking-[0.1em] uppercase transition-all ${filter === 'all' ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold' : 'border border-gold-300/20 text-cream/60'}`}
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            All ({orders.length})
          </button>
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-sm text-xs tracking-[0.1em] uppercase transition-all ${filter === s ? 'bg-gradient-to-r from-gold-400 to-gold-300 text-charcoal-900 font-semibold' : 'border border-gold-300/20 text-cream/60'}`}
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              {STATUS_LABELS[s]} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <UtensilsCrossed size={40} className="text-cream/20 mx-auto mb-4" />
            <p className="text-cream/30 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>No orders in this category</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map(order => (
              <div key={order.id} className="glass gold-border rounded-sm p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`text-[10px] px-2.5 py-1 rounded-sm font-semibold tracking-[0.1em] uppercase ${STATUS_COLORS[order.status as OrderStatus]}`} style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {STATUS_LABELS[order.status as OrderStatus]}
                      </span>
                      <span className="text-cream/30 text-xs flex items-center gap-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        <Clock size={11} /> {timeAgo(order.created_at)}
                      </span>
                      <span className="text-cream/20 text-[10px]" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>

                    {/* Customer */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User size={13} className="text-gold-300/60" />
                        <span className="text-cream/80 text-sm font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>{order.customer_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-gold-300/60" />
                        <a href={`tel:${order.customer_phone}`} className="text-gold-300/80 text-sm hover:text-gold-300 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                          {order.customer_phone}
                        </a>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-1.5 mb-4">
                      {(order.items as Array<{ id: string; name: string; price: number; quantity: number }>).map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-cream/60" style={{ fontFamily: 'Raleway, sans-serif' }}>
                            {item.name} <span className="text-cream/30">× {item.quantity}</span>
                          </span>
                          <span className="text-cream/50 ml-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.special_instructions && (
                      <div className="bg-charcoal-700/50 rounded-sm px-3 py-2 mb-4">
                        <p className="text-cream/40 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>
                          📝 {order.special_instructions}
                        </p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <span className="text-cream/40 text-xs" style={{ fontFamily: 'Raleway, sans-serif' }}>Total</span>
                      <span className="gold-text font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                        ₹{order.total_amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Status updater */}
                  <div className="sm:w-44 shrink-0">
                    <p className="text-cream/30 text-[10px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      Update Status
                    </p>
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value as OrderStatus)}
                        disabled={updating === order.id}
                        className="w-full bg-charcoal-700 border border-gold-300/30 rounded-sm px-3 py-2.5 text-cream text-sm appearance-none cursor-pointer focus:outline-none focus:border-gold-300/60 transition-colors pr-8 disabled:opacity-60"
                        style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gold-300/50 pointer-events-none" />
                    </div>
                    <a
                      href={`https://wa.me/91${order.customer_phone}?text=Hi%20${encodeURIComponent(order.customer_name)}!%20Your%20order%20from%20Qistaniya%20is%20${STATUS_LABELS[order.status as OrderStatus].toLowerCase()}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-sm text-xs text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-colors"
                      style={{ fontFamily: 'Raleway, sans-serif' }}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.476 2 2 6.476 2 12.004c0 1.791.47 3.467 1.291 4.92L2 22l5.232-1.272A9.924 9.924 0 0012.004 22C17.528 22 22 17.528 22 12.004 22 6.476 17.528 2 12.004 2zm0 18.207a8.18 8.18 0 01-4.162-1.138l-.298-.177-3.097.811.825-3.014-.194-.31A8.2 8.2 0 013.793 12c0-4.529 3.682-8.207 8.211-8.207 4.533 0 8.207 3.678 8.207 8.207 0 4.531-3.674 8.207-8.207 8.207z"/></svg>
                      Notify Customer
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
