'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface TypeMySkillsList {
  id: number;
  skillName: string;
  mastery: number; // New field for % width
  pathForImage: string;
  optionalImages: string | '';
}

const mySkillsList: TypeMySkillsList[] = [
  {
    id: 0,
    skillName: 'HTML5 | CSS3',
    mastery: 70,
    pathForImage: '/assets/images/skillsSection/html.svg',
    optionalImages: '/assets/images/skillsSection/css.svg',
  },
  {
    id: 1,
    skillName: 'JavaScript | TypeScript',
    mastery: 60,
    pathForImage: '/assets/images/skillsSection/js.svg',
    optionalImages: '/assets/images/skillsSection/typescript-96.svg',
  },
  {
    id: 2,
    skillName: 'React | Next JS',
    mastery: 40,
    pathForImage: '/assets/images/skillsSection/react.svg',
    optionalImages: '/assets/images/skillsSection/nextjs.svg',
  },
  {
    id: 3,
    skillName: 'Framer Motion and animations',
    mastery: 15,
    pathForImage: '/assets/images/skillsSection/framer-motion.svg',
    optionalImages: '/assets/images/skillsSection/threejs.png',
  },
  {
    id: 4,
    skillName: 'Tailwind CSS and shadcn UI',
    mastery: 50,
    pathForImage: '/assets/images/skillsSection/tailwindcss.svg',
    optionalImages: '/assets/images/skillsSection/shadcn.png',
  },
  {
    id: 5,
    skillName: 'Node JS and Express JS',
    mastery: 40,
    pathForImage: '/assets/images/skillsSection/nodejs.png',
    optionalImages: '/assets/images/skillsSection/expressjs.png',
  },
  {
    id: 6,
    skillName: 'Redux Toolkit, Context API',
    mastery: 20,
    pathForImage: '/assets/images/skillsSection/redux.svg',
    optionalImages: '/assets/images/skillsSection/react.svg',
  },
];

const SkillsSection = () => {
  return (
    <section className='relative min-h-screen w-full bg-green-100 overflow-hidden px-10 py-16 sm:px-24 z-10'>
      {/* Floating background icons */}
      <div className='absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none'>
        {mySkillsList.map(({ id, pathForImage }) => (
          <Image
            key={id}
            src={pathForImage}
            alt='bg-logo'
            width={100}
            height={100}
            className='absolute opacity-50 animate-float z-0'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Section content */}
      <div className='relative z-10 space-y-6'>
        <motion.h2
          className='font-clashDisplayMedium text-3xl sm:text-4xl text-center sm:text-left'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          My Skills
        </motion.h2>

        <motion.p
          className='text-justify text-gray-900'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: false }}
        >
          I have a strong foundation in HTML5, CSS3, and JavaScript. I&apos;ve also learned React,
          TypeScript, Tailwind CSS, Redux Toolkit, Context API, REST APIs, Zustand, Framer Motion,
          and Next.js. I&apos;m building projects to apply my skills and actively improving.
        </motion.p>

        <motion.h3
          className='text-xl sm:text-2xl font-semibold'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          Currently Working On:
        </motion.h3>

        <motion.p
          className='text-gray-900 text-justify'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: false }}
        >
          I am currently focused on mastering frontend development skills. Soon, I aim to grow into
          backend, databases, and DevOps. Long-term goal is to transition into AI.
        </motion.p>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          {mySkillsList.map(({ id, skillName, mastery, pathForImage, optionalImages }) => (
            <motion.div
              key={id}
              className='p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg space-y-3'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.1 }}
              viewport={{ once: false }}
            >
              <div className='flex items-center gap-3'>
                <h4 className='text-sm sm:text-base font-semibold text-black'>{skillName}</h4>
                <Image src={pathForImage} alt={skillName} width={24} height={24} />
                <Image src={optionalImages} alt={skillName} width={24} height={24} />
              </div>
              <div className='w-full h-2 bg-gray-300 rounded-full overflow-hidden'>
                <motion.div
                  className='h-full bg-[#04AF70] rounded-full'
                  style={{ width: `${mastery}%` }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${mastery}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
