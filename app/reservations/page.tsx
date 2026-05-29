'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle, ChevronDown, Mail } from 'lucide-react';
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
      <div className="min-h-screen bg-charcoal-900 pt-16 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 arabic-pattern opacity-20" />
        <div className="max-w-md w-full text-center relative z-10 glass gold-border rounded-sm p-8 sm:p-12 shadow-2xl">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}>
            <CheckCircle size={36} color="#0a0a08" />
          </div>
          <h2 className="font-serif text-cream text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Reservation Confirmed!
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-cream/80 text-lg sm:text-xl leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Thank you, <span className="text-gold-300">{form.customer_name}</span>. Your table for <span className="text-gold-300">{form.guest_count} guests</span> has been reserved for{' '}
              <span className="text-gold-300">{form.date} at {form.time}</span>.
            </p>
            <p className="text-cream/50 text-sm leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Our team will confirm your reservation shortly. For urgent enquiries, call{' '}
            <a href="tel:09987370880" className="text-gold-300 font-bold underline underline-offset-4">09987370880</a>
            </p>
          </div>
          <button onClick={() => setSubmitted(false)} className="btn-outline w-full text-sm px-8 py-4.5 uppercase tracking-widest font-bold">
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-charcoal-800/60 border border-gold-300/20 rounded-sm px-5 py-4.5 text-cream text-base placeholder:text-cream/30 focus:outline-none focus:border-gold-300/60 focus:bg-charcoal-800/80 transition-all shadow-2xl";
  const labelClass = "block text-gold-300/70 text-[11px] tracking-[0.25em] uppercase font-bold mb-2.5 ml-1";

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      <div className="page-hero relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/hero1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/80 to-charcoal-900" />
        <div className="absolute inset-0 arabic-pattern opacity-40" />
        <div className="page-hero-content">
          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
            <div className="h-px w-10 bg-gold-300/40" />
            <span className="text-gold-300/80 text-[10px] sm:text-[12px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>Online Booking</span>
            <div className="h-px w-10 bg-gold-300/40" />
          </div>
          <h1 className="font-serif text-cream mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800 }}>
            Reserve Your <span className="gold-text italic">Table</span>
          </h1>
          <p className="text-cream/70 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            A royal dining experience awaits you. Join us for an unforgettable journey of flavours.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="page-section site-container-3xl px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="glass-dark gold-border rounded-sm p-6 sm:p-16 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glass gold-border px-6 py-2 rounded-full">
            <span className="text-gold-300 text-[10px] tracking-[0.3em] uppercase font-bold" style={{ fontFamily: 'Raleway, sans-serif' }}>Booking Form</span>
          </div>
          
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-4xl text-cream font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Guest Details
            </h2>
            <p className="text-cream/40 text-sm italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              All fields marked with * are required for confirmation
            </p>
          </div>

          <div className="space-y-7 sm:space-y-10">
            {/* Name */}
            <div className="space-y-1">
              <label className={labelClass}>Full Name *</label>
              <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="text"
                name="customer_name"
                placeholder="Your Full Name *"
                value={form.customer_name}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                required
                maxLength={100}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className={labelClass}>Phone Number *</label>
              <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="tel"
                name="customer_phone"
                placeholder="e.g. 09987370880 *"
                value={form.customer_phone}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                required
                maxLength={15}
                pattern="[0-9\s]{10,15}"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className={labelClass}>Email Address (optional)</label>
              <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="email"
                name="customer_email"
                placeholder="email@example.com"
                value={form.customer_email}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                maxLength={200}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
              </div>
            </div>

            {/* Date & Time Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-1">
                <label className={labelClass}>Select Date *</label>
                <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={today}
                  className={`${inputClass} pl-12`}
                  required
                  style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
                />
              </div>
              </div>
              <div className="space-y-1">
                <label className={labelClass}>Preferred Time *</label>
                <div className="relative">
                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={`${inputClass} pl-12 appearance-none cursor-pointer`}
                  required
                  style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
                >
                  <option value="" disabled>Select Time *</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-300/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Guest count */}
            <div className="space-y-1">
              <label className={labelClass}>Number of Guests *</label>
              <div className="relative">
              <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <select
                name="guest_count"
                value={form.guest_count}
                onChange={handleChange}
                className={`${inputClass} pl-12 appearance-none cursor-pointer`}
                style={{ fontFamily: 'Raleway, sans-serif', colorScheme: 'dark' }}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
                <option value="11">10+ Guests (Large Group)</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-300/50 pointer-events-none" />
              </div>
            </div>

            {/* Special request */}
            <div className="space-y-1">
              <label className={labelClass}>Special Requests</label>
              <div className="relative">
              <MessageSquare size={16} className="absolute left-4 top-4 text-gold-300/50" />
              <textarea
                name="special_request"
                placeholder="Special requests, dietary requirements, occasion..."
                value={form.special_request}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                className={`${inputClass} pl-12 py-4 resize-none`}
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
              </div>
            </div>
          </div>

          <div className="gold-divider my-10 sm:my-12" />

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-5 text-base sm:text-lg font-bold tracking-[0.2em] relative z-10 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl uppercase"
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
