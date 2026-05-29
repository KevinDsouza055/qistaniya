'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please enter email and password'); return; }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      toast.error('Invalid email address');
      return;
    }
    if (password.length < 6 || password.length > 128) {
      toast.error('Invalid password');
      return;
    }

    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        const { error } = await supabase.auth.signInWithPassword({ email: sanitizedEmail, password });
        if (error) throw error;
      }
      toast.success('Welcome back!');
      router.push('/staff');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      // Don't expose internal errors
      if (message.includes('Invalid login credentials') || message.includes('Email not confirmed')) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-charcoal-700 border border-gold-300/20 rounded-sm px-4 py-3.5 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold-300/50 transition-colors";

  return (
    <div className="min-h-screen bg-charcoal-900 pt-16 flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 arabic-pattern opacity-20" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-sm w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h2 className="gold-text font-serif text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Qistaniya
          </h2>
          <p className="text-gold-200/40 text-[10px] tracking-[0.45em] uppercase mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Staff Portal
          </p>
        </div>

        <div className="glass gold-border rounded-sm p-9 sm:p-12">
          <h3 className="text-cream text-xl font-semibold mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sign In
          </h3>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type="email"
                placeholder="Staff Email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`${inputClass} pl-9`}
                required
                maxLength={254}
                autoComplete="username"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>

            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-300/50" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password *"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`${inputClass} pl-9 pr-10`}
                required
                maxLength={128}
                autoComplete="current-password"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div className="gold-divider my-2" />

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-4.5 text-base relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-cream/20 text-[10px] text-center mt-6 leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif' }}>
            This portal is for authorised Qistaniya staff only.<br />
            Unauthorised access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
