import * as React from 'react';
import Hero from '@/components/home/Hero';
import SkillsSection from '@/components/home/SkillsSection';
import ContactMe from '@/components/home/ContactMe';
import Welcome from '@/components/home/Welcome';
import AnimationWrapper from '@/components/utils/AnimationWrapper';
import UnderConstruction from '@/components/utils/UnderConstruction';

export default function Home() {
  return (
    <AnimationWrapper>
      <UnderConstruction />

      <Welcome />
      <Hero />
      <SkillsSection />
      <ContactMe />
    </AnimationWrapper>
  );
}
