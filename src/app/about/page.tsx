'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import Image from 'next/image';
import AboutSkills from '@/components/about/AboutSkills';
import AboutHobbies from '@/components/about/AboutHobbies';
import AboutGoals from '@/components/about/AboutGoals';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeInOut,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeInOut,
    },
  },
};

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      <section id='about'>
        <motion.section
          ref={sectionRef}
          className='flex flex-col min-h-screen md:flex-row justify-between pt-36 sm:pt-28 py-28 px-10 sm:px-24'
          variants={containerVariants}
          initial='hidden'
          animate={isVisible ? 'show' : 'hidden'}
          exit='hidden'
          key='about-section'
        >
          {/* Image Section */}
          <motion.div
            className='w-full md:w-1/2 flex justify-center md:justify-start'
            variants={fadeUp}
          >
            <motion.div
              variants={scaleIn}
              className='relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-t-slate-400 border-b-[#04AF70] border-r-[#04AF70] border-l-[#04AF70] shadow-black shadow-inner overflow-hidden'
            >
              <Image
                src='/assets/images/me.jpg'
                alt='Muhammad Zeeshan Khan — MERN Stack developer'
                fill
                className='object-cover object-top'
                sizes='(max-width: 640px) 256px, (max-width: 1024px) 288px, 384px'
              />
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className='w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left'
            variants={containerVariants}
          >
            <motion.h2 className='text-3xl sm:text-4xl mb-4 text-foreground' variants={fadeUp}>
              About Me
            </motion.h2>

            <motion.p className='text-foreground/70 mb-6 text-justify' variants={fadeUp}>
              Hello! I&apos;m Zeeshan Khan, a passionate and self-motivated MERN Stack developer
              based in Karachi, Pakistan. With a strong foundation in programming and a keen
              interest in AI, I specialize in creating modern, responsive, and user-friendly web
              solutions. My expertise lies in TypeScript, React, Next.js, Node.js, and Tailwind CSS.
              I am the founder of Zebotix, a growing software agency, and Apna Campus, an
              educational platform designed to empower learners with cutting-edge tech skills.
              Currently studying at the Governor Sindh IT Initiative for AI, Web 3.0 &amp;
              Metaverse, my journey into tech reflects my adaptability and determination to explore
              new horizons. With 37+ repositories, 130+ GitHub followers, and 400+ contributions in
              the past year, I bring a unique perspective and problem-solving mindset to every
              project. I&apos;m dedicated to not only building innovative solutions but also
              mentoring others to achieve their goals.
            </motion.p>

            <motion.hr className='border-foreground/10' variants={fadeUp} />

            <motion.p className='mb-10 text-foreground/60 mt-4' variants={fadeUp}>
              Let&apos;s create something amazing together!
            </motion.p>
          </motion.div>
        </motion.section>
        {/* Additional about sections */}
        <AboutSkills />
        <AboutHobbies />
        <AboutGoals />
      </section>
    </AnimatePresence>
  );
}
