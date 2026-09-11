import React, { useState } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { SITE_CONFIG } from '@/lib/constants/site';
import { useToast } from '@/context/ToastContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  ChevronDown,
  Sparkles,
  Send,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Private Vault Soirée');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const { success, error } = useToast();

  const faqs = [
    {
      question: 'What is the recommended dress code for Aureffle?',
      answer: 'We encourage smart casual to elegant salon attire. Athletic sportswear and flip-flops are politely discouraged in our main dining salon and private vault.',
    },
    {
      question: 'Is valet parking available at Marina Bay?',
      answer: 'Yes, complimentary valet parking is provided at The Promenade Tower 1 driveway for all dining and vault guests upon presenting your reservation confirmation.',
    },
    {
      question: 'Can I bring bespoke celebration cakes or fine wines?',
      answer: 'Our in-house pastry chefs craft customized celebration entremets upon 48 hours notice. For outside cakes, a cakeage service fee of $30 applies. Sommelier corkage is $50 per standard bottle.',
    },
    {
      question: 'How do I book The Aureffle Private Vault for exclusive soirées?',
      answer: 'The Private Vault accommodates up to 12 guests with dedicated butler service, sommelier wine/coffee flights, and tailored tasting menus. Contact our concierge directly through this form.',
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      error('Please complete all required fields');
      return;
    }
    setSubmitted(true);
    success(
      'Inquiry Transmitted to Concierge',
      'Our head concierge will connect with you within 2 business hours.'
    );
  };

  return (
    <div className="py-12 sm:py-16 bg-[#080d1a] min-h-screen space-y-16">
      {/* Header */}
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c6a252] font-semibold px-3.5 py-1.5 rounded-full luxury-glass border border-[#c6a252]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Concierge &amp; Inquiries</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            Connect With Our Concierge
          </h1>
          <p className="text-sm sm:text-base text-[#ded5c0]/80 font-light max-w-xl mx-auto leading-relaxed">
            For bespoke private events, sommelier consultations, media inquiries, or general salon hospitality.
          </p>
        </div>
      </Container>

      {/* Main Grid: Form + Info */}
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-[#0c1426] border border-[#c6a252]/25 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#c6a252]/15 text-[#c6a252] flex items-center justify-center mx-auto border border-[#c6a252]/30">
                  <Send className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Thank You, {name}
                </h3>
                <p className="text-sm text-[#ded5c0]/75 max-w-md mx-auto font-light">
                  Your inquiry regarding <strong className="text-white">{topic}</strong> has been received by our head concierge desk.
                </p>
                <Button
                  variant="gold-solid"
                  size="md"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-white font-normal">
                    Send a Private Inquiry
                  </h3>
                  <p className="text-xs text-[#ded5c0]/70 font-light">
                    Our concierge desk will respond discreetly and promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name *"
                    placeholder="e.g., Katherine Lee"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="e.g., katherine@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Mobile Number (Optional)"
                    placeholder="e.g., +65 9123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0] mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[#101c34] text-white text-xs px-3 py-2.5 rounded-lg border border-[#c6a252]/25 focus:outline-none focus:border-[#c6a252]"
                    >
                      <option value="Private Vault Soirée">Private Vault Soirée (Up to 12 Pax)</option>
                      <option value="Executive Corporate Hospitality">Executive Corporate Hospitality</option>
                      <option value="Sommelier & Masterclass Request">Sommelier &amp; Masterclass Request</option>
                      <option value="Press & Media Inquiries">Press &amp; Media Inquiries</option>
                      <option value="General Dining Inquiry">General Dining Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#ded5c0] mb-1.5">
                    Your Message / Event Specifications *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify estimated guest count, dates, preferred dining style, or specific inquiries..."
                    className="w-full bg-[#101c34] text-white placeholder-[#ded5c0]/35 text-xs p-3.5 rounded-lg border border-[#c6a252]/25 focus:outline-none focus:border-[#c6a252]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold-solid"
                  size="lg"
                  className="w-full"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Transmit Inquiry to Concierge
                </Button>
              </form>
            )}
          </div>

          {/* Right: Concierge Contacts & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1426] border border-[#c6a252]/20 space-y-5">
              <h3 className="font-serif text-xl text-white font-normal">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-sm text-[#ded5c0]/85 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c6a252] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block">Aureffle Singapore</span>
                    <span>{SITE_CONFIG.location.address}</span>
                    <span className="block text-xs text-[#ded5c0]/70">{SITE_CONFIG.location.district}, {SITE_CONFIG.location.city}</span>
                    <a
                      href={SITE_CONFIG.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-[#c6a252] hover:underline mt-1 font-semibold"
                    >
                      📍 Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#c6a252] shrink-0" />
                  <div>
                    <span className="font-medium text-white block">Café Telephone &amp; WhatsApp</span>
                    <a href={`tel:${SITE_CONFIG.location.phone}`} className="text-[#c6a252] hover:underline font-semibold">
                      {SITE_CONFIG.location.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#c6a252] shrink-0" />
                  <div>
                    <span className="font-medium text-white block">Electronic Inquiries</span>
                    <span>{SITE_CONFIG.location.conciergeEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                  <Clock className="w-5 h-5 text-[#c6a252] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1 w-full">
                    <span className="font-medium text-white block">Operating Hours</span>
                    {SITE_CONFIG.operatingHours.map((h, i) => (
                      <div key={i} className="flex justify-between text-[#ded5c0]/80">
                        <span>{h.days}</span>
                        <span className={h.hours === 'Closed' ? 'text-amber-400 font-semibold' : 'text-[#f4f1ea]'}>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Transit Notice */}
            <div className="p-6 rounded-2xl bg-[#101c34] border border-[#c6a252]/25 space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#c6a252]">
                <Car className="w-4 h-4" />
                <span>Transit &amp; Parking</span>
              </div>
              <p className="text-xs text-[#ded5c0]/80 font-light leading-relaxed">
                {SITE_CONFIG.location.mrt}. {SITE_CONFIG.location.valet}.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive Map Section */}
      <Container size="lg">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c6a252] font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Interactive Location Map</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Visit Us at Kandahar Street
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={SITE_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#c6a252] text-[#080d1a] text-xs font-bold flex items-center gap-2 hover:bg-[#e6ca85] transition-all shadow-lg cursor-pointer"
              >
                <span>Get Directions in Google Maps</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="rounded-3xl overflow-hidden border border-[#c6a252]/30 bg-[#0c1426] shadow-2xl relative group h-[420px] sm:h-[480px]">
            <iframe
              title="Aureffle Cafe Google Map Location"
              src="https://maps.google.com/maps?q=26+Kandahar+Street+Singapore+198888&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Live Badge */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl luxury-glass border border-[#c6a252]/40 backdrop-blur-md text-xs text-white max-w-xs space-y-1 shadow-xl pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-[#f4ecce]">Aureffle Café • Kampong Glam</span>
              </div>
              <p className="text-[11px] text-[#ded5c0]/80">26 Kandahar St, Singapore 198888</p>
            </div>
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <Container size="md">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Guest Guidance"
            title="Frequently Asked Questions"
            subtitle="Everything you need to ensure a flawless visit to Aureffle."
          />

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#0c1426] border border-[#c6a252]/15 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base text-white font-normal">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-[#c6a252] transition-transform duration-300 shrink-0',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#ded5c0]/80 font-light leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};
