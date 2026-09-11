import React from 'react';
import { ArrowLeft, Coffee, Sparkles, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotFoundPageProps {
  onNavigateHome?: () => void;
}

export function NotFound404Page({ onNavigateHome }: NotFoundPageProps) {
  let navigate: ReturnType<typeof useNavigate> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const handleBack = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (navigate) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080d1a] flex flex-col items-center justify-center p-6 text-center text-[#f4f1ea] relative overflow-hidden">
      {/* Background Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c6a252]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* 404 Vector SVG Graphic from public/assets/svg/Error 404.svg */}
      <div className="relative z-10 w-full max-w-lg h-64 sm:h-80 md:h-[380px] mx-auto flex items-center justify-center mb-6">
        <img
          src="/assets/svg/Error 404.svg"
          alt="404 Page Not Found"
          className="w-full h-full object-contain max-h-[380px] drop-shadow-2xl select-none"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#ffe600] font-semibold px-4 py-1.5 rounded-full bg-[#0c1426] border border-[#ffe600]/40 backdrop-blur-md">
          <Compass className="w-4 h-4" />
          <span>Page Not Found • Lost Extraction</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
          Uncharted Territory
        </h1>
        <p className="text-sm sm:text-base text-[#ded5c0]/80 font-light leading-relaxed">
          The sanctuary or extraction profile you requested does not exist or has been moved to our private reserve.
        </p>

        {/* Back Button */}
        <div className="pt-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 bg-[#c6a252] text-[#080d1a] px-6 py-3.5 rounded-xl font-semibold uppercase tracking-wider hover:bg-[#ffe600] transition-all shadow-xl cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Salon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
