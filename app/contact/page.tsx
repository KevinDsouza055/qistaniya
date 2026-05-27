'use client';

import { MapPin, Phone, Clock, MessageCircle, Mail, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-charcoal-900 pt-16">
      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1600&q=80')`,
            backgroundSize: 'cover', backgroundPosition: 'center 40%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 to-charcoal-900/95" />
        <div className="absolute inset-0 arabic-pattern opacity-30" />
        <div className="page-hero-content">
          <h1 className="font-serif text-cream" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Find <span className="gold-text italic">Us</span>
          </h1>
          <p className="text-cream/50 text-sm mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
            We&apos;d love to welcome you at Qistaniya
          </p>
        </div>
      </div>

      <div className="site-container page-section-lg">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left: Info */}
          <div className="space-y-6">
            {/* Address card */}
            <div className="glass gold-border rounded-sm content-panel">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}>
                  <MapPin size={18} color="#0a0a08" />
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>
                    Our Location
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Opp. Shivar Garden, Shivar Garden,<br />
                    Mira Road East, Mira Bhayandar,<br />
                    Maharashtra – 401105
                  </p>
                  <a
                    href="https://maps.google.com/?q=Qistaniya+Restaurant+Mira+Road"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold-300 text-xs mt-3 hover:underline"
                    style={{ fontFamily: 'Raleway, sans-serif' }}
                  >
                    Get Directions <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass gold-border rounded-sm content-panel">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}>
                  <Phone size={18} color="#0a0a08" />
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>
                    Phone
                  </h3>
                  <a href="tel:09987370880"
                    className="text-gold-300 hover:text-gold-200 text-lg font-semibold transition-colors block"
                    style={{ fontFamily: 'Raleway, sans-serif' }}>
                    09987370880
                  </a>
                  <p className="text-cream/40 text-xs mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Available 11:00 AM – 1:30 AM daily
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="glass gold-border rounded-sm content-panel">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}>
                  <Clock size={18} color="#0a0a08" />
                </div>
                <div>
                  <h3 className="text-cream font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {[
                      { day: 'Monday – Sunday', hours: '11:00 AM – 1:30 AM' },
                      { day: 'Public Holidays', hours: 'Open (may vary)' },
                    ].map(row => (
                      <div key={row.day} className="flex justify-between gap-4">
                        <span className="text-cream/50 text-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>{row.day}</span>
                        <span className="text-gold-300 text-sm font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>{row.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-cream/30 text-xs mt-3" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Holiday hours may differ. Call to confirm.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp & Social */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://wa.me/919987370880"
                target="_blank"
                rel="noopener noreferrer"
                className="glass gold-border rounded-sm p-5 flex flex-col items-center gap-3 hover:border-green-500/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: '#25D366' }}>
                  <MessageCircle size={18} color="white" />
                </div>
                <span className="text-cream/60 text-xs text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>WhatsApp Us</span>
              </a>
              <a
                href="mailto:info@qistaniya.com"
                className="glass gold-border rounded-sm p-5 flex flex-col items-center gap-3 hover:border-gold-300/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #d4a843, #c4922a)' }}>
                  <Mail size={18} color="#0a0a08" />
                </div>
                <span className="text-cream/60 text-xs text-center" style={{ fontFamily: 'Raleway, sans-serif' }}>Email Us</span>
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div>
            <div className="glass gold-border rounded-sm overflow-hidden h-80 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.869456735284!2d72.8631!3d19.2814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0f5e9c1c165%3A0x5b7a41f5ae87e68b!2sQistaniya%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Qistaniya Restaurant Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
