'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, Coffee, Sparkles, CheckCircle2, UserCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SignupPageProps {
  onNavigateHome?: () => void;
  onNavigateLogin?: () => void;
}

export function SignupPage({ onNavigateHome, onNavigateLogin }: SignupPageProps) {
  let navigate: ReturnType<typeof useNavigate> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

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
      setSignupSuccess(true)
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

  const handleGoLogin = () => {
    if (onNavigateLogin) {
      onNavigateLogin();
    } else if (navigate) {
      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#080d1a] flex flex-col md:flex-row text-[#f4f1ea] selection:bg-[#c6a252] selection:text-[#080d1a]">
      {/* Left Panel - Coffee Vector SVG Graphic Panel (Replaced static image with vector SVGs per request) */}
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

        {/* Hero Coffee Vector SVG Artwork from public/assets/svg/singup.svg */}
        <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-6">
          <div className="relative w-full max-w-md h-64 sm:h-80 md:h-[420px] flex items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-[#ffe600]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
            
            {/* Signup SVG Graphic */}
            <img
              src="/assets/svg/singup.svg"
              alt="Aureffle Signup"
              className="relative z-10 w-full h-full object-contain max-h-[440px] drop-shadow-2xl select-none"
            />
          </div>

          <div className="space-y-2 max-w-sm">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ffe600] font-semibold px-3 py-1 rounded-full bg-black/40 border border-[#ffe600]/30 backdrop-blur-md">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Patron Membership Invitation</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Join the Connoisseur Circle
            </h2>
            <p className="text-xs sm:text-sm text-[#ded5c0]/75 font-light leading-relaxed">
              Unlock priority seating, early access to Panama Geisha micro-lot roasts, and invitations to private sommelier cupping sessions.
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
          {signupSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#c6a252]/20 border border-[#ffe600] rounded-full flex items-center justify-center mx-auto text-[#ffe600] animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl text-white">Membership Activated</h2>
              <p className="text-xs text-[#ded5c0]/80">Welcome to Aureffle. Redirecting to your patron dashboard...</p>
            </div>
          ) : (
            <>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-2">
                  Create Account
                </h1>
                <p className="text-sm text-[#ded5c0]/80 font-light">
                  Already have a patron account?{' '}
                  <button
                    type="button"
                    onClick={handleGoLogin}
                    className="text-[#ffe600] hover:text-white font-semibold underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c6a252] font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Lady Eleanor Vance"
                    className="w-full px-4 py-3 bg-[#080d1a] border border-[#c6a252]/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600] outline-none transition-all text-sm"
                    required
                  />
                </div>

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

                {/* Terms Agreement */}
                <div className="text-xs">
                  <label className="flex items-start space-x-2 text-[#ded5c0]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="mt-0.5 w-4 h-4 text-[#c6a252] border-[#c6a252]/40 rounded bg-[#080d1a] focus:ring-[#ffe600]"
                      required
                    />
                    <span>
                      I agree to the Aureffle Patron Terms of Privileges &amp; Privacy Policy.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c6a252] text-[#080d1a] py-3.5 px-4 rounded-xl font-semibold uppercase tracking-wider hover:bg-[#ffe600] transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Activating Account...</span>
                  ) : (
                    <>
                      <Coffee className="w-4 h-4" />
                      <span>Create Patron Membership</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
