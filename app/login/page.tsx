'use client';

import React, { useState, useRef, useEffect } from 'react';

// --- Icons ---
const IconLock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconUser = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconShield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// --- UI Components ---
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; error?: string }>(
  ({ icon, error, className = '', ...props }, ref) => (
    <div className="relative flex flex-col gap-1 w-full">
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            {icon}
          </div>
        )}
        <input 
          ref={ref}
          className={`w-full bg-zinc-50 dark:bg-zinc-900 border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10'} rounded-xl ${icon ? 'pl-10' : 'px-4'} pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 px-1">{error}</span>}
    </div>
  )
);
Input.displayName = 'Input';

const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }: { children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; className?: string }) => (
  <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled} 
    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
  >
    {children}
  </button>
);

// --- Main Page Component ---
export default function LoginPage() {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate API call to check credentials
    setTimeout(() => {
      setIsLoading(false);
      // For demo, allowing any user/pass to pass to OTP
      setStep('otp');
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      // Focus last filled input or end
      const focusIndex = Math.min(index + pastedData.length, 5);
      otpRefs.current[focusIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => digit === '')) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate API call for OTP
    setTimeout(() => {
      setIsLoading(false);
      // Success case (could redirect here using window.location.href = '/' or next/router)
      alert("Verification successful. Forwarding to dashboard...");
    }, 1000);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-sans flex items-center justify-center p-6 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100">
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <div className="absolute w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-3xl opacity-50 -top-48 -left-48" />
        <div className="absolute w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-3xl opacity-50 -bottom-48 -right-48" />
      </div>

      <div className="w-full max-w-[400px] relative z-10">
        
        {/* Logo/Brand Area */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-lg mb-4 transform hover:scale-105 transition-transform">
            <span className="text-white dark:text-zinc-900 font-bold text-2xl leading-none">P</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio CMS</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Authenticate to access your dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 p-6 md:p-8 relative overflow-hidden transition-all duration-300">
          
          {step === 'login' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-6">
                <h2 className="text-lg font-semibold tracking-tight">Welcome back</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Please enter your details to sign in.</p>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <Input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  icon={<IconUser className="w-4 h-4" />}
                  autoComplete="username"
                />
                
                <div className="space-y-1">
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    icon={<IconLock className="w-4 h-4" />}
                    autoComplete="current-password"
                  />
                  <div className="flex justify-end pt-1">
                    <button type="button" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium">
                      Forgot password?
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Signing in...
                      </span>
                    ) : 'Sign In'}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6 flex gap-3">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <IconShield className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Two-Step Verification</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    We've sent a verification code to your device.
                  </p>
                </div>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-between gap-1 sm:gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { otpRefs.current[index] = el; }}
                      type="text"
                      maxLength={6}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(index, e)}
                      className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold bg-zinc-50 dark:bg-zinc-900 border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]`}
                    />
                  ))}
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                  <button 
                    type="button" 
                    onClick={() => { setStep('login'); setOtp(['','','','','','']); setError(''); }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <IconArrowLeft className="w-4 h-4" /> Back to sign in
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 mt-6 font-medium">
          Secure access restricted to authorized personnel.
        </p>

      </div>
    </div>
  );
}
