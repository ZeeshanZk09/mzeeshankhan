import * as React from 'react';
import Hero from '@/components/home/Hero';
import SkillsSection from '@/components/home/SkillsSection';
import ContactMe from '@/components/home/ContactMe';
import Welcome from '@/components/home/Welcome';
import AnimationWrapper from '@/components/utils/AnimationWrapper';

export default function Home() {
  return (
    <main className='overflow-hidden block'>
      <AnimationWrapper>
        <Welcome />
        <Hero />
        <SkillsSection />
        <ContactMe />
      </AnimationWrapper>
    </main>
  );
}
