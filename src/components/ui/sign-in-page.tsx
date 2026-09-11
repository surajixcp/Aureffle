'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, Coffee, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface LoginPageProps {
  onNavigateHome?: () => void;
  onNavigateSignup?: () => void;
}

export function LoginPage({ onNavigateHome, onNavigateSignup }: LoginPageProps) {
  let navigate: ReturnType<typeof useNavigate> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setLoginSuccess(true)
      setTimeout(() => {
        if (onNavigateHome) {
          onNavigateHome();
        } else if (navigate) {
          navigate('/');
        }
      }, 1200);
    }, 1000)
  }

  const handleBack = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (navigate) {
      navigate('/');
    }
  }

  const handleGoSignup = () => {
    if (onNavigateSignup) {
      onNavigateSignup();
    } else if (navigate) {
      navigate('/signup');
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#080d1a] flex flex-col md:flex-row text-[#f4f1ea] selection:bg-[#c6a252] selection:text-[#080d1a]">
      {/* Left Panel - Coffee Illustration SVG Panel (Replaced static image with vector SVGs per request) */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#0c1426] via-[#101c34] to-[#080d1a] border-r border-[#c6a252]/20 flex flex-col justify-between p-8 sm:p-12 min-h-[400px] md:min-h-screen">
        {/* Back Button */}
        <div className="relative z-20">
          <button
            onClick={handleBack}
            className="w-11 h-11 bg-black/40 backdrop-blur-md border border-[#c6a252]/30 rounded-full flex items-center justify-center hover:bg-[#c6a252]/20 text-[#c6a252] transition-all cursor-pointer shadow-lg"
            title="Return to Salon"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Coffee Vector SVG Artwork from public/assets/svg/Login Leady.svg */}
        <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-6">
          <div className="relative w-full max-w-md h-64 sm:h-80 md:h-[420px] flex items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-[#c6a252]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
            
            {/* Login Leady SVG Graphic */}
            <img
              src="/assets/svg/Login Leady.svg"
              alt="Aureffle Login"
              className="relative z-10 w-full h-full object-contain max-h-[440px] drop-shadow-2xl select-none"
            />
          </div>

          <div className="space-y-2 max-w-sm">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ffe600] font-semibold px-3 py-1 rounded-full bg-black/40 border border-[#ffe600]/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aureffle Patron Access</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Haute Gastronomy &amp; Coffee Connoisseurs
            </h2>
            <p className="text-xs sm:text-sm text-[#ded5c0]/75 font-light leading-relaxed">
              Sign in to manage bespoke vault reservations, view member tasting allocations, and access private sommelier events.
            </p>
          </div>
        </div>

        {/* Footer Brand Label */}
        <div className="relative z-20 text-center md:text-left">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c6a252] font-semibold">
            Aureffle Luxury Salon • Marina Bay Singapore
          </p>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#080d1a]">
        <div className="w-full max-w-md space-y-8 bg-[#0c1426] p-8 sm:p-10 rounded-2xl border border-[#c6a252]/25 shadow-2xl">
          {loginSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#c6a252]/20 border border-[#ffe600] rounded-full flex items-center justify-center mx-auto text-[#ffe600] animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl text-white">Welcome Back, Connoisseur</h2>
              <p className="text-xs text-[#ded5c0]/80">Authenticating patron status &amp; loading member privileges...</p>
            </div>
          ) : (
            <>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-2">
                  Welcome Back
                </h1>
                <p className="text-sm text-[#ded5c0]/80 font-light">
                  Don&apos;t have a patron account?{' '}
                  <button
                    type="button"
                    onClick={handleGoSignup}
                    className="text-[#ffe600] hover:text-white font-semibold underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c6a252] font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="patron@aureffle.com"
                    className="w-full px-4 py-3 bg-[#080d1a] border border-[#c6a252]/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] outline-none transition-all text-sm"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c6a252] font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 pr-12 bg-[#080d1a] border border-[#c6a252]/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] outline-none transition-all text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-[#101c34] rounded-lg text-gray-400 hover:text-[#ffe600] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me + Forgot Password */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-2 text-[#ded5c0]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#c6a252] border-[#c6a252]/40 rounded bg-[#080d1a] focus:ring-[#ffe600]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-[#c6a252] hover:text-[#ffe600] font-medium transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c6a252] text-[#080d1a] py-3.5 px-4 rounded-xl font-semibold uppercase tracking-wider hover:bg-[#ffe600] transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <Coffee className="w-4 h-4" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#c6a252]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#0c1426] text-[#ded5c0]/60 uppercase tracking-widest">or continue with</span>
                  </div>
                </div>

                {/* Social Google Button */}
                <div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-3 border border-[#c6a252]/30 rounded-xl bg-[#080d1a] hover:bg-[#101c34] hover:border-[#ffe600]/50 transition-all cursor-pointer shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xs font-medium text-white">Continue with Google</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
