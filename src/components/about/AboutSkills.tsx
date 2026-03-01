import React from 'react';
import Image from 'next/image';
import { BookOpen, Lightbulb, Target, Zap } from 'lucide-react';
import { title } from 'process';

const skillCategories = [
  {
    title: 'Frontend Mastery',
    icon: Zap,
    description: 'Creating engaging user experiences with modern technologies',
    skills: [
      {
        name: 'React & Next.js',
        icon: '/assets/images/skillsSection/react.svg',
        proficiency: 90,
        journey:
          'Started with Create React App, now building production apps with Next.js 14. Love the component-based architecture and how it makes complex UIs manageable.',
        milestone: 'Built 15+ production applications',
      },
      {
        name: 'TypeScript',
        icon: '/assets/images/skillsSection/typescript-96.svg',
        proficiency: 85,
        journey:
          "Initially resisted the extra syntax, but now can't imagine building large apps without it. Type safety has saved me countless hours of debugging.",
        milestone: 'Converted 3 major projects from JS to TS',
      },
      {
        name: 'CSS & Tailwind',
        icon: '/assets/images/skillsSection/tailwindcss.svg',
        proficiency: 88,
        journey:
          'From writing vanilla CSS to mastering Flexbox, Grid, and animations. Tailwind revolutionized my workflow with utility-first approach.',
        milestone: 'Created 20+ responsive design systems',
      },
    ],
  },
  {
    title: 'Backend & Tools',
    icon: Target,
    description: 'Building robust server-side solutions and development workflows',
    skills: [
      {
        name: 'Node.js & APIs',
        icon: '/assets/images/skillsSection/nodejs.png',
        proficiency: 75,
        journey:
          'Love how JavaScript everywhere simplifies the stack. Built RESTful APIs, GraphQL endpoints, and real-time features with Socket.io.',
        milestone: 'Deployed 10+ backend services',
      },
      {
        name: 'MongoDB & SQL Databases',
        icon: '/assets/images/skillsSection/postgresql.svg', // Replace with MongoDB icon if available
        proficiency: 70,
        journey:
          'Started with SQL, embraced NoSQL with MongoDB. Understanding data modeling and optimization patterns for real-world applications.',
        milestone: 'Designed schemas for 8+ projects',
      },
    ],
  },
  {
    title: 'Full Stack Development',
    icon: BookOpen,
    description: 'Integrating frontend and backend for seamless applications',
    skills: [
      {
        name: 'Next.js Full Stack',
        icon: '/assets/images/skillsSection/nextjs.svg',
        proficiency: 80,
        journey:
          'Next.js has been a game-changer for full-stack development. From API routes to server-side rendering, it allows me to build end-to-end solutions efficiently.',
        milestone: 'Built 5+ full-stack applications with Next.js',
      },
    ],
  },
];

const learningPhilosophy = [
  {
    icon: BookOpen,
    title: 'Learning by Building',
    description:
      "I learn best by diving into real projects. Every skill I've gained came from solving actual problems and building things that matter.",
  },
  {
    icon: Target,
    title: 'Teaching to Learn',
    description:
      'Explaining concepts to others deepens my own understanding. Mentoring junior developers has made me a better programmer.',
  },
  {
    icon: Zap,
    title: 'Staying Current',
    description:
      'The tech landscape changes rapidly. I dedicate time weekly to exploring new tools, reading docs, and experimenting with emerging tech.',
  },
];

export default function AboutSkills() {
  return (
    <section id='about-skills' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4 text-foreground'>
          My Learning Journey
        </h2>
        <p className='text-foreground/60 mb-12 max-w-3xl leading-relaxed'>
          Every skill tells a story. Here&apos;s the journey behind my technical expertise – the
          challenges I&apos;ve overcome, the breakthrough moments, and the continuous learning that
          shapes my craft.
        </p>

        {/* Skill Categories */}
        {skillCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <div key={categoryIndex} className='mb-12'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='p-2 rounded-lg bg-[#047856]/20 text-[#06a475]'>
                  <CategoryIcon className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='text-xl font-clashDisplaySemibold text-foreground'>
                    {category.title}
                  </h3>
                  <p className='text-sm text-foreground/80'>{category.description}</p>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className='group p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4 mb-4'>
                      <div className='w-12 h-12 relative flex-shrink-0'>
                        <Image src={skill.icon} alt={skill.name} fill className='object-contain' />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-clashDisplaySemibold text-foreground text-sm mb-1'>
                          {skill.name}
                        </h4>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='flex-1 bg-white/10 rounded-full h-2'>
                            <div
                              className='bg-[#06a475] h-2 rounded-full transition-all duration-500'
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className='text-xs text-[#06a475] font-medium'>
                            {skill.proficiency}%
                          </span>
                        </div>
                        <p className='text-xs text-foreground/80 leading-relaxed mb-2'>
                          {skill.journey}
                        </p>
                        <span className='text-xs text-[#45ffc7] font-medium'>
                          🎯 {skill.milestone}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Learning Philosophy */}
        <div className='mt-16'>
          <h3 className='text-xl font-clashDisplaySemibold text-foreground mb-6 flex items-center gap-2'>
            <BookOpen className='w-5 h-5 text-[#06a475]' />
            How I Learn & Grow
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {learningPhilosophy.map((philosophy, index) => {
              const PhilosophyIcon = philosophy.icon;
              return (
                <div
                  key={index}
                  className='p-5 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
                >
                  <div className='flex flex-col items-center text-center gap-3'>
                    <div className='p-3 rounded-lg bg-[#047856]/20 text-[#06a475]'>
                      <PhilosophyIcon className='w-6 h-6' />
                    </div>
                    <div>
                      <h4 className='font-clashDisplaySemibold text-foreground text-sm mb-2'>
                        {philosophy.title}
                      </h4>
                      <p className='text-xs text-foreground/80 leading-relaxed'>
                        {philosophy.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Reflection */}
        <div className='mt-12 p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm'>
          <h3 className='font-clashDisplaySemibold text-foreground mb-3 flex items-center gap-2'>
            <Lightbulb className='w-5 h-5 text-[#23fcbb]' />
            Personal Reflection
          </h3>
          <p className='text-foreground/70 text-sm leading-relaxed mb-3'>
            My journey in tech has taught me that skills are not destinations, but ongoing
            relationships. Each technology I learn changes how I think about problems and opens new
            possibilities for solutions.
          </p>
          <p className='text-foreground/70 text-sm leading-relaxed'>
            The most valuable skill I&apos;ve developed isn&apos;t any particular framework or
            language—it&apos;s the ability to learn quickly, adapt to new challenges, and find joy
            in the process of discovery. That curiosity and resilience will remain relevant no
            matter how the tech landscape evolves.
          </p>
        </div>
      </div>
    </section>
  );
}
