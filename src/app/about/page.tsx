'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';

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

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.section
        id='about'
        className='flex flex-col min-h-screen md:flex-row justify-between py-28 px-10 sm:px-24'
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
            className="bg-[url('/assets/images/M-Zeeshan-Khan-2.png')] bg-no-repeat bg-[length:100%] bg-[position:center_top] bg-black/10 bg-clip-border w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-t-slate-400 border-b-[#04AF70] border-r-[#04AF70] border-l-[#04AF70] shadow-black shadow-inner"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className='w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left'
          variants={containerVariants}
        >
          <motion.h2 className='text-3xl sm:text-4xl mb-4 text-black' variants={fadeUp}>
            About Me
          </motion.h2>

          <motion.p className='text-gray-800 mb-6 text-justify' variants={fadeUp}>
            Hello! I&apos;m Zeeshan Khan, a passionate and self-motivated web developer based in
            Karachi, Pakistan. With a strong foundation in programming and a keen interest in AI, I
            specialize in creating modern, responsive, and user-friendly web solutions. My expertise
            lies in HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS. I am the
            founder of Zebotix, a growing software agency, and Apna Campus, an educational platform
            designed to empower learners with cutting-edge tech skills. My journey from a
            pre-medical background to the tech industry reflects my adaptability and determination
            to explore new horizons. I bring a unique perspective and problem-solving mindset to my
            work, always seeking to deliver impactful results. In addition to my technical skills,
            I&apos;m an enthusiastic teacher who believes in the power of sharing knowledge.
            I&apos;m dedicated to not only building innovative solutions but also mentoring others
            to achieve their goals.
          </motion.p>

          <motion.hr className='invert' variants={fadeUp} />

          <motion.p className='mb-10' variants={fadeUp}>
            <br /> Let&apos;s create something amazing together! 🚀
          </motion.p>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
