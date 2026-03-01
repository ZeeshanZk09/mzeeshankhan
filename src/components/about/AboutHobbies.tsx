import React from 'react';
import { BookOpen, Gamepad2, Users, Coffee, Camera, Dumbbell, Music, Plane } from 'lucide-react';

const hobbies = [
  {
    icon: Users,
    title: 'Teaching & Mentoring',
    description:
      'Passionate about sharing knowledge and helping fellow developers grow. I actively mentor junior developers and create educational content.',
  },
  {
    icon: BookOpen,
    title: 'Reading & Learning',
    description:
      'Always curious about new technologies, design patterns, and industry trends. Currently reading about AI/ML and Web3 innovations.',
  },
  {
    icon: Camera,
    title: '3D & Visual Experiments',
    description:
      'Love exploring creative coding, 3D animations with Three.js, and experimenting with modern CSS animations and micro-interactions.',
  },
  {
    icon: Gamepad2,
    title: 'Gaming & Strategy',
    description:
      'Enjoy strategy games and multiplayer experiences. Gaming helps me think critically about user experience and problem-solving.',
  },
  {
    icon: Coffee,
    title: 'Coffee & Conversations',
    description:
      'Believer in the power of good coffee and meaningful conversations. Love discussing tech trends, startup ideas, and life perspectives.',
  },
  {
    icon: Dumbbell,
    title: 'Fitness & Health',
    description:
      'Maintaining work-life balance through regular exercise. A healthy mind and body lead to better productivity and creativity.',
  },
  {
    icon: Music,
    title: 'Music & Creativity',
    description:
      'Music fuels my creativity during coding sessions. From lo-fi beats to electronic music, the right soundtrack enhances focus.',
  },
  {
    icon: Plane,
    title: 'Travel & Culture',
    description:
      'Exploring different cultures and places inspires new perspectives on design and problem-solving approaches in development.',
  },
];

export default function AboutHobbies() {
  return (
    <section id='about-beyond' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4 text-foreground'>
          Beyond Coding
        </h2>
        <p className='text-foreground/60 mb-8 max-w-3xl leading-relaxed'>
          While I&apos;m passionate about coding and technology, I believe in maintaining a
          well-rounded life. These interests keep me creative, motivated, and help me bring fresh
          perspectives to my work.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon;
            return (
              <div
                key={index}
                className='group p-5 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
              >
                <div className='flex flex-col items-start gap-3'>
                  <div className='p-2 rounded-lg bg-[#047856]/20 text-[#06a475] group-hover:bg-[#047856]/30 transition-colors'>
                    <Icon className='w-5 h-5' />
                  </div>
                  <div>
                    <h3 className='font-clashDisplaySemibold text-foreground text-sm mb-2'>
                      {hobby.title}
                    </h3>
                    <p className='text-xs text-foreground/60 leading-relaxed'>
                      {hobby.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-8 p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm'>
          <h3 className='font-clashDisplaySemibold text-foreground mb-3'>Life Philosophy</h3>
          <p className='text-foreground/70 text-sm leading-relaxed'>
            I believe that the best developers are those who experience life beyond screens. Every
            hobby, conversation, and experience shapes how I approach problems, design solutions,
            and connect with people. It&apos;s about building not just better code, but a better
            understanding of the world we&apos;re creating technology for.
          </p>
        </div>
      </div>
    </section>
  );
}
