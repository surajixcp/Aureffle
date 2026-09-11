import React, { useState } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { SEATING_AREAS, DINING_OCCASIONS, AVAILABLE_TIMESLOTS } from '@/lib/config/site-config';
import { SeatingArea, DiningOccasion, TableBooking } from '@/types/booking';
import { useBooking } from '@/context/BookingContext';
import { formatDateDisplay, formatTime12h } from '@/lib/utils/formatters';
import { SITE_CONFIG } from '@/lib/constants/site';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Wine,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const BookingPage: React.FC = () => {
  const {
    bookingDraft,
    updateDraft,
    confirmBooking,
    activeConfirmation,
    dismissConfirmation,
  } = useBooking();

  const [selectedArea, setSelectedArea] = useState<SeatingArea>(
    (bookingDraft.seatingArea as SeatingArea) || 'main-salon'
  );
  const [guestsCount, setGuestsCount] = useState<number>(
    bookingDraft.guestsCount || 2
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    bookingDraft.date ||
      new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    bookingDraft.timeSlot || '18:30'
  );
  const [selectedOccasion, setSelectedOccasion] = useState<DiningOccasion>(
    (bookingDraft.occasion as DiningOccasion) || 'casual'
  );

  // Guest details form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [sommelierTastingAddon, setSommelierTastingAddon] = useState(false);
  const [champagneAddon, setChampagneAddon] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Quick dates for next 7 days
  const quickDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: new Intl.DateTimeFormat('en-SG', { weekday: 'short' }).format(d),
      dateNum: d.getDate(),
      month: new Intl.DateTimeFormat('en-SG', { month: 'short' }).format(d),
    };
  });

  const selectedAreaObj = SEATING_AREAS.find((a) => a.id === selectedArea)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@'))
      newErrors.email = 'Please enter a valid email address';
    if (!phone.trim() || phone.length < 8)
      newErrors.phone = 'Please enter a valid mobile number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    confirmBooking({
      fullName,
      email,
      phone,
      guestsCount,
      date: selectedDate,
      timeSlot: selectedTime,
      seatingArea: selectedArea,
      occasion: selectedOccasion,
      dietaryNotes,
      specialRequests,
      sommelierTastingAddon,
      champagneAddon,
    });
  };

  // If a booking was just confirmed, render confirmation view
  if (activeConfirmation) {
    return (
      <div className="py-16 bg-[#080d1a] min-h-screen flex items-center">
        <Container size="md">
          <div className="p-8 sm:p-12 rounded-3xl luxury-glass border border-[#c6a252]/40 shadow-2xl bg-[#0c1426] text-center space-y-8">
            <div className="w-16 h-16 rounded-full bg-[#c6a252]/15 text-[#c6a252] flex items-center justify-center mx-auto border border-[#c6a252]/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold">
                Reservation Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                We Look Forward to Welcoming You
              </h1>
              <p className="text-sm text-[#ded5c0]/75 max-w-md mx-auto font-light">
                A confirmation has been dispatched to{' '}
                <strong className="text-white">{activeConfirmation.email}</strong> and SMS to{' '}
                <strong className="text-white">{activeConfirmation.phone}</strong>.
              </p>
            </div>

            {/* Confirmation Code Card */}
            <div className="p-6 rounded-2xl bg-[#101c34] border border-[#c6a252]/30 max-w-lg mx-auto text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase text-[#ded5c0]/70 font-semibold">
                  Booking Reference
                </span>
                <span className="font-mono text-lg font-bold text-[#f4ecce] tracking-widest">
                  {activeConfirmation.confirmationCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#ded5c0]/60 block uppercase">Guest Name</span>
                  <span className="text-white font-medium block">{activeConfirmation.fullName}</span>
                </div>
                <div>
                  <span className="text-[#ded5c0]/60 block uppercase">Guests</span>
                  <span className="text-white font-medium block">
                    {activeConfirmation.guestsCount} Persons
                  </span>
                </div>
                <div>
                  <span className="text-[#ded5c0]/60 block uppercase">Date &amp; Time</span>
                  <span className="text-white font-medium block">
                    {formatDateDisplay(activeConfirmation.date)} at{' '}
                    {formatTime12h(activeConfirmation.timeSlot)}
                  </span>
                </div>
                <div>
                  <span className="text-[#ded5c0]/60 block uppercase">Salon Area</span>
                  <span className="text-[#c6a252] font-medium block capitalize">
                    {activeConfirmation.seatingArea.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {activeConfirmation.sommelierTastingAddon && (
                <div className="pt-2 border-t border-white/10 text-xs text-[#f4ecce] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c6a252]" />
                  <span>Sommelier Micro-Lot Geisha Flight Included</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                variant="gold-solid"
                size="md"
                onClick={dismissConfirmation}
              >
                Make Another Reservation
              </Button>
              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#c6a252] hover:underline uppercase font-semibold tracking-wider flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Message Concierge via WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#080d1a] min-h-screen">
      <Container size="lg" className="space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold px-3.5 py-1.5 rounded-full luxury-glass border border-[#c6a252]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon &amp; Omakase Bookings</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            Reserve Your Experience
          </h1>
          <p className="text-sm sm:text-base text-[#ded5c0]/80 font-light max-w-xl mx-auto leading-relaxed">
            Select your preferred dining salon, party size, and sensory tasting options.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Seating Area Selection */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-6">
            <div className="flex items-center justify-between border-b border-[#c6a252]/15 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#c6a252] uppercase tracking-[0.2em]">
                  Step 01
                </span>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Select Your Preferred Salon
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SEATING_AREAS.map((area) => {
                const isSelected = selectedArea === area.id;
                return (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={cn(
                      'p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 bg-[#101c34]/60',
                      isSelected
                        ? 'border-[#c6a252] bg-[#c6a252]/10 ring-1 ring-[#c6a252]'
                        : 'border-white/10 hover:border-white/30'
                    )}
                  >
                    <div className="aspect-[16/10] rounded-lg overflow-hidden relative">
                      <img
                        src={area.image}
                        alt={area.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 p-1 bg-[#c6a252] text-[#080d1a] rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-base text-white font-normal">
                        {area.name}
                      </h4>
                      <p className="text-[11px] text-[#ded5c0]/70 line-clamp-2 leading-relaxed">
                        {area.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#c6a252]">
                      <span>Max {area.capacityMax} Guests</span>
                      {area.minimumSpend && <span>Min. Spend ${area.minimumSpend}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date, Time & Guests */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-6">
            <div className="flex items-center justify-between border-b border-[#c6a252]/15 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#c6a252] uppercase tracking-[0.2em]">
                  Step 02
                </span>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Date, Time &amp; Party Size
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Guests Selector */}
              <div className="lg:col-span-4 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0]">
                  Number of Guests
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => {
                    const active = guestsCount === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestsCount(num)}
                        className={cn(
                          'py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer',
                          active
                            ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252]'
                            : 'bg-[#101c34] text-[#ded5c0] border-white/10 hover:border-white/30'
                        )}
                      >
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Quick Selector */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0]">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-[#101c34] text-xs text-[#c6a252] px-2.5 py-1 rounded border border-white/10 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {quickDates.map((q) => {
                    const active = selectedDate === q.iso;
                    return (
                      <button
                        key={q.iso}
                        type="button"
                        onClick={() => setSelectedDate(q.iso)}
                        className={cn(
                          'p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-0.5',
                          active
                            ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252] shadow-md'
                            : 'bg-[#101c34] text-[#ded5c0] border-white/10 hover:border-white/30'
                        )}
                      >
                        <span className="text-[10px] uppercase font-semibold">
                          {q.dayName}
                        </span>
                        <span className="text-base font-serif font-bold">
                          {q.dateNum}
                        </span>
                        <span className="text-[9px] uppercase opacity-75">
                          {q.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0]">
                Available Time Slots ({formatDateDisplay(selectedDate)})
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-2">
                {AVAILABLE_TIMESLOTS.map((slot) => {
                  const active = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        'py-2 px-1 text-xs rounded-lg border font-mono font-medium transition-all cursor-pointer text-center',
                        active
                          ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252] font-bold shadow-md'
                          : 'bg-[#101c34]/70 text-[#ded5c0] border-white/10 hover:border-white/30'
                      )}
                    >
                      {formatTime12h(slot)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dining Occasion */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0]">
                Dining Occasion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {DINING_OCCASIONS.map((occ) => {
                  const active = selectedOccasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={cn(
                        'p-2.5 rounded-lg border text-xs text-left font-medium transition-all cursor-pointer',
                        active
                          ? 'bg-[#c6a252]/20 text-[#f4ecce] border-[#c6a252]'
                          : 'bg-[#101c34]/50 text-[#ded5c0]/80 border-white/10 hover:border-white/30'
                      )}
                    >
                      {occ.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 3: Experience Add-ons & Guest Details */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-6">
            <div className="flex items-center justify-between border-b border-[#c6a252]/15 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#c6a252] uppercase tracking-[0.2em]">
                  Step 03
                </span>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Gastronomic Add-ons &amp; Guest Details
                </h3>
              </div>
            </div>

            {/* Addons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setSommelierTastingAddon(!sommelierTastingAddon)}
                className={cn(
                  'p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5',
                  sommelierTastingAddon
                    ? 'bg-[#c6a252]/15 border-[#c6a252]'
                    : 'bg-[#101c34]/50 border-white/10 hover:border-white/20'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border',
                    sommelierTastingAddon
                      ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252]'
                      : 'border-white/30 text-transparent'
                  )}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-white">
                      Panama Geisha Tasting Flight
                    </span>
                    <span className="text-xs text-[#c6a252] font-semibold">+$35 / pax</span>
                  </div>
                  <p className="text-xs text-[#ded5c0]/70">
                    Tableside 3-stage extraction of washed, natural, and anaerobic geisha micro-lots.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setChampagneAddon(!champagneAddon)}
                className={cn(
                  'p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5',
                  champagneAddon
                    ? 'bg-[#c6a252]/15 border-[#c6a252]'
                    : 'bg-[#101c34]/50 border-white/10 hover:border-white/20'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border',
                    champagneAddon
                      ? 'bg-[#c6a252] text-[#080d1a] border-[#c6a252]'
                      : 'border-white/30 text-transparent'
                  )}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-white">
                      Welcome Ruinart Blanc de Blancs
                    </span>
                    <span className="text-xs text-[#c6a252] font-semibold">+$28 / flute</span>
                  </div>
                  <p className="text-xs text-[#ded5c0]/70">
                    Chilled artisanal French champagne served upon salon arrival.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <Input
                label="Full Name *"
                placeholder="e.g., Lord Alexander Tan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="e.g., alexander@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Mobile Number (with Country Code) *"
                placeholder="e.g., +65 9123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                leftIcon={<Phone className="w-4 h-4" />}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0] mb-1.5">
                  Dietary Restrictions &amp; Allergies
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g., Nut allergy, pescatarian, gluten-sensitive"
                  className="w-full bg-[#101c34] text-white text-xs px-4 py-2.5 rounded-lg border border-[#c6a252]/25 focus:outline-none focus:border-[#c6a252]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0] mb-1.5">
                  Special Requests (Celebration Note, Table Preference)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Anniversary flowers setup, quiet corner table"
                  className="w-full bg-[#101c34] text-white text-xs px-4 py-2.5 rounded-lg border border-[#c6a252]/25 focus:outline-none focus:border-[#c6a252]"
                />
              </div>
            </div>

            {/* Confirmation CTA */}
            <div className="pt-6 border-t border-[#c6a252]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#ded5c0]/70 font-light">
                <ShieldCheck className="w-4 h-4 text-[#c6a252]" />
                <span>No cancellation fees up to 2 hours prior to reservation.</span>
              </div>

              <Button
                type="submit"
                variant="gold-solid"
                size="lg"
                className="w-full sm:w-auto min-w-[240px]"
              >
                Confirm Table Reservation
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
