'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, UtensilsCrossed } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'Guest';

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Arabic ornament background */}
        <div className="absolute inset-0 arabic-pattern opacity-20 pointer-events-none" />

        {/* Icon */}
        <div
          className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)', boxShadow: '0 0 40px rgba(212,168,67,0.3)' }}
        >
          <CheckCircle size={44} color="#0a0a08" />
        </div>

        {/* Gold divider top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold-300/40" />
          <span className="text-gold-300/60 text-[9px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Order Placed
          </span>
          <div className="h-px w-10 bg-gold-300/40" />
        </div>

        <h1
          className="font-serif text-cream text-3xl sm:text-4xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Thank You,<br />
          <span className="gold-text italic">{name}!</span>
        </h1>

        <p className="text-cream/60 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
          Your order has been received and is now being prepared with care by our kitchen team.
        </p>

        <div className="glass gold-border rounded-sm p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wider" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Status: Pending Preparation
            </span>
          </div>
          <p className="text-cream/50 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Our staff will call you at your provided number to confirm the order. For inquiries, WhatsApp us at{' '}
            <a href="https://wa.me/919987370880" className="text-gold-300 hover:underline">09987370880</a>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold px-8 py-4 text-xs relative z-10 flex items-center justify-center gap-2">
            <Home size={14} /> Back to Home
          </Link>
          <Link href="/menu" className="btn-outline px-8 py-4 text-xs flex items-center justify-center gap-2">
            <UtensilsCrossed size={14} /> Order Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal-900 pt-16 flex items-center justify-center">
        <div className="text-gold-300 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
