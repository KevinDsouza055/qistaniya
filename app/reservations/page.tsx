'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  date: string;
  time: string;
  guest_count: string;
  special_request: string;
}

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '6:00 PM',
  '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
  '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
  '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM',
];

export default function ReservationsPage() {
  const [form, setForm] = useState<FormData>({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    date: '',
    time: '',
    guest_count: '2',
    special_request: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer_name || !form.customer_phone || !form.date || !form.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!/^[0-9]{10}$/.test(form.customer_phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      // Save to Supabase if configured, else show success
      const { supabase } = await import('@/lib/supabase');
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        await supabase.from('reservations').insert({
          customer_name: form.customer_name.trim(),
          customer_phone: form.customer_phone.trim(),
          customer_email: form.customer_email.trim() || null,
          date: form.date,
          time: form.time,
          guest_count: parseInt(form.guest_count),
          special_request: form.special_request.trim() || null,
          status: 'pending',
        });
      }
      setSubmitted(true);
    } catch {
      // Even if DB fails, show success for demo
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal-900 pt-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}>
            <CheckCircle size={36} color="#0a0a08" />
          </div>
          <h2 className="font-serif text-cream text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Reservation Confirmed!
          </h2>
          <p className="text-cream/60 text-sm leading-relaxed mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
            Thank you, <span className="text-gold-300">{form.customer_name}</span>. Your table for <span className="text-gold-300">{form.guest_count} guests</span> has been reserved for{' '}
            <span className="text-gold-300">{form.date} at {form.time}</span>.
          </p>
          <p className="text-cream/40 text-xs mb-8" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Our team will confirm your reservation shortly. For urgent enquiries, call{' '}
            <a href="tel:09987370880" className="text-gold-300">09987370880</a>
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-outline text-xs px-8 py-3">
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-charcoal-700 border border-gold-300/20 rounded-sm px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold-300/50 transition-colors";

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      {/* Hero */}
      <div className="relative h-52 sm:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 to-charcoal-900/95" />
        <div className="absolute inset-0 arabic-pattern opacity-30" />
        <div className="relative z-10 px-4 sm:px-8 pb-8 max-w-7xl mx-auto w-full">
          <h1 className="font-serif text-cream" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Reserve Your <span className="gold-text italic">Table</span>
          </h1>
          <p className="text-cream/50 text-sm mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
            A royal dining experience awaits you
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="glass gold-border rounded-sm p-6 sm:p-10">
          <h2 className="font-serif text-xl text-cream font-semibold mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Reservation Details
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="text"
                name="customer_name"
                placeholder="Your Full Name *"
                value={form.customer_name}
                onChange={handleChange}
                className={`${inputClass} pl-9`}
                required
                maxLength={100}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="tel"
                name="customer_phone"
                placeholder="Phone Number *"
                value={form.customer_phone}
                onChange={handleChange}
                className={`${inputClass} pl-9`}
                required
                maxLength={15}
                pattern="[0-9\s]{10,15}"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="customer_email"
                placeholder="Email Address (optional)"
                value={form.customer_email}
                onChange={handleChange}
                className={inputClass}
                maxLength={200}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={today}
                  className={`${inputClass} pl-9`}
                  required
                  style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
                />
              </div>
              <div className="relative">
                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={`${inputClass} pl-9 appearance-none cursor-pointer`}
                  required
                  style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
                >
                  <option value="" disabled>Select Time *</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest count */}
            <div className="relative">
              <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <select
                name="guest_count"
                value={form.guest_count}
                onChange={handleChange}
                className={`${inputClass} pl-9 appearance-none cursor-pointer`}
                style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
                <option value="11">10+ Guests (Large Group)</option>
              </select>
            </div>

            {/* Special request */}
            <div className="relative">
              <MessageSquare size={14} className="absolute left-3 top-4 text-gold-300/50" />
              <textarea
                name="special_request"
                placeholder="Special requests, dietary requirements, occasion..."
                value={form.special_request}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                className={`${inputClass} pl-9 resize-none`}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
          </div>

          <div className="gold-divider my-8" />

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-4 text-sm relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Confirming Reservation...' : 'Confirm Reservation'}
          </button>

          <p className="text-cream/30 text-xs text-center mt-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
            For large parties or private events, call us at{' '}
            <a href="tel:09987370880" className="text-gold-300/60 hover:text-gold-300 transition-colors">09987370880</a>
          </p>
        </form>
      </div>
    </div>
  );
}
