import * as React from 'react';
import Hero from '@/components/home/Hero';
import SkillsSection from '@/components/home/SkillsSection';
import SkillsSnapshot from '@/components/home/SkillsSnapshot';
import FeaturedProject from '@/components/home/FeaturedProject';
import ContactMe from '@/components/home/ContactMe';
import Welcome from '@/components/home/Welcome';
import AnimationWrapper from '@/components/utils/AnimationWrapper';
import RecentProjects from '@/components/home/RecentProjects';
import Achievements from '@/components/home/Achievements';
import Goals from '@/components/home/Goals';
import WorkProcess from '@/components/home/WorkProcess';

export default function Home() {
  return (
    <AnimationWrapper>
      <Welcome />
      <Hero />
      <SkillsSnapshot />
      <Achievements />
      <Goals />
      <WorkProcess />
      <FeaturedProject />
      <SkillsSection />
      <RecentProjects />
      <ContactMe />
    </AnimationWrapper>
  );
}
