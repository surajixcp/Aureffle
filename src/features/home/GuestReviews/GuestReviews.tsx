import React from 'react';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import TestimonialMarqueeDemo from '@/components/ui/marquee-01';

export const GuestReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#080d1a] relative border-t border-[#c6a252]/15 overflow-hidden">
      <Container size="lg">
        <SectionHeading
          eyebrow="Critical Accolades"
          title="Endorsed by Culinary Critics &amp; Connoisseurs"
          subtitle="Honored to be featured among Singapore’s premier luxury dining destinations."
        />

        {/* Live Testimonial Marquee Stream */}
        <div className="pt-4">
          <TestimonialMarqueeDemo />
        </div>
      </Container>
    </section>
  );
};
