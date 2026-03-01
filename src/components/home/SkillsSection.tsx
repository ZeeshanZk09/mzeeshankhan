'use client';

// import Image from 'next/image';
// import React from 'react';
import { motion } from 'framer-motion';

// interface TypeMySkillsList {
//   id: number;
//   skillName: string;
//   mastery: number; // New field for % width
//   pathForImage: string;
//   optionalImages: string | null;
// }

// const mySkillsList: TypeMySkillsList[] = [
//   {
//     id: 0,
//     skillName: 'HTML5 | CSS3',
//     mastery: 70,
//     pathForImage: '/assets/images/skillsSection/html.svg',
//     optionalImages: '/assets/images/skillsSection/css.svg',
//   },
//   {
//     id: 1,
//     skillName: 'JavaScript | TypeScript',
//     mastery: 75,
//     pathForImage: '/assets/images/skillsSection/js.svg',
//     optionalImages: '/assets/images/skillsSection/typescript-96.svg',
//   },
//   {
//     id: 2,
//     skillName: 'React | Next JS',
//     mastery: 65,
//     pathForImage: '/assets/images/skillsSection/react.svg',
//     optionalImages: '/assets/images/skillsSection/nextjs.svg',
//   },
//   {
//     id: 3,
//     skillName: 'Framer Motion and animations',
//     mastery: 15,
//     pathForImage: '/assets/images/skillsSection/framer-motion.svg',
//     optionalImages: '/assets/images/skillsSection/threejs.png',
//   },
//   {
//     id: 4,
//     skillName: 'Tailwind CSS and shadcn UI',
//     mastery: 50,
//     pathForImage: '/assets/images/skillsSection/tailwindcss.svg',
//     optionalImages: '/assets/images/skillsSection/shadcn.png',
//   },
//   {
//     id: 5,
//     skillName: 'Node JS and Express JS',
//     mastery: 40,
//     pathForImage: '/assets/images/skillsSection/nodejs.png',
//     optionalImages: '/assets/images/skillsSection/expressjs.png',
//   },
//   {
//     id: 6,
//     skillName: 'Redux Toolkit, Context API',
//     mastery: 20,
//     pathForImage: '/assets/images/skillsSection/redux.svg',
//     optionalImages: '/assets/images/skillsSection/react.svg',
//   },
// ];

const SkillsSection = () => {
  // deterministic pseudo-random generator so SSR and client produce same values

  return (
    <section className=' min-h-screen w-full  px-6 py-16 sm:px-24 z-10'>
      {/* Section content */}
      <div className=' z-10 space-y-6'>
        <motion.h2
          className='font-clashDisplayMedium text-3xl sm:text-4xl text-center sm:text-left'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
            My Skills
          </span>
        </motion.h2>

        <div className='flex justify-center sm:justify-start gap-3 items-center mt-3'>
          <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold'>
            Junior / Mid-level MERN · PERN · Full Stack
          </span>
          <span className='px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm'>
            Frontend Developer — Karsaaz EBS PVT LTD
          </span>
        </div>

        <motion.p
          className='text-justify text-white/70'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: false }}
        >
          By now I have 2 years of learning and teaching experience in web development, the MERN
          stack, and frontend engineering. I am currently working as a Frontend Developer at Karsaaz
          EBS PVT LTD. I focus on building modern, maintainable apps with React and Next.js, and I
          work across the stack with TypeScript, Node.js, and databases to deliver performant,
          accessible user experiences.
        </motion.p>

        {/* Skill chips with animated entrance and hover effects */}

        <motion.h3
          className='text-xl sm:text-2xl font-semibold '
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          Technologies I Use:
        </motion.h3>
        {(() => {
          const skills = [
            'TypeScript',
            'JavaScript',
            'React',
            'Redux Toolkit',
            'React Query',
            'Next.js',
            'Node.js',
            'Tailwind',
            'Schadcn UI',
            'Framer Motion',
            'MongoDB',
            'PostgreSQL',
            'Prisma',
            'Neon',
          ];

          const container = {
            hidden: { opacity: 1 },
            show: { opacity: 1, transition: { staggerChildren: 0.06 } },
          };

          const item = {
            hidden: { opacity: 0, y: 8, scale: 0.98 },
            show: { opacity: 1, y: 0, scale: 1 },
          };

          return (
            <motion.ul
              className='flex flex-wrap gap-2 list-none p-0'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: false, amount: 0.2 }}
              aria-label='Skills list'
            >
              {skills.map((s) => (
                <motion.li
                  key={s}
                  variants={item}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  className='px-3 py-1 rounded-full text-sm text-white/90 bg-white/10 backdrop-blur-sm border border-white/10 hover:shadow-lg transition-shadow'
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          );
        })()}

        <motion.h3
          className='text-xl sm:text-2xl font-semibold '
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          Currently Working On:
        </motion.h3>

        <motion.p
          className='text-white/70 text-justify'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: false }}
        >
          I&apos;m currently building full-featured web applications (including e‑commerce and
          backend integrations), improving app performance and accessibility, and contributing to
          open-source. I continue to expand my backend skills with Node.js, Express, and relational
          databases so I can work effectively across both frontend and backend.
        </motion.p>

        {/* Skills Grid */}
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
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
                {optionalImages && (
                  <Image src={optionalImages} alt={skillName} width={24} height={24} />
                )}
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
        </div> */}
      </div>
    </section>
  );
};

export default SkillsSection;
