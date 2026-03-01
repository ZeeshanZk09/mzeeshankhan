import Image from 'next/image';
import Link from 'next/link';
import AnimationWrapper from '../utils/AnimationWrapper';

export default function SkillsSnapshot() {
  const topSkills = [
    { name: 'TS', icon: '/assets/images/skillsSection/typescript-96.svg' },
    { name: 'React', icon: '/assets/images/skillsSection/react.svg' },
    {
      name: 'Next.js',
      icon: '/assets/images/skillsSection/nextjs.svg',
    },
    {
      name: 'Nodejs',
      icon: '/assets/images/skillsSection/nodejs.png',
    },
    {
      name: 'Prisma',
      icon: '/assets/images/skillsSection/prisma.svg',
    },
    {
      name: 'PostgreSQL',
      icon: '/assets/images/skillsSection/postgresql.svg',
    },
    {
      name: 'Python',
      icon: '/assets/images/skillsSection/python.svg',
    },
  ];

  return (
    <AnimationWrapper>
      <section id='skills-snapshot' className='w-full py-12 px-6 sm:px-24'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4'>
            <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
              Key Skills
            </span>
          </h2>
          <p className='text-white/70 mb-6 max-w-3xl'>
            A quick snapshot of the technologies I use to build scalable and performant web
            applications. I&apos;m always learning and expanding my skillset, but these are the core
            tools I work with day-to-day.
          </p>

          <div className='overflow-hidden mb-6'>
            <div className='flex min-w-[100%] max-sm:min-w-[230%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-8 max-sm:gap-2'>
              {topSkills.map((s) => (
                <div
                  key={s.name}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-transform transform hover:scale-105 cursor-default`}
                  aria-hidden={false}
                >
                  <div className='w-14 h-14 relative sm:w-16 sm:h-16'>
                    <Image src={s.icon} fill alt={s.name} className='object-contain' />
                  </div>
                  {/* <div className='text-sm font-medium'>{s.name}</div> */}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {topSkills.map((s) => (
                <div
                  key={`${s.name}-dup`}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-transform transform hover:scale-105 cursor-default`}
                  aria-hidden={false}
                >
                  <div className='w-14 h-14 relative sm:w-16 sm:h-16'>
                    <Image src={s.icon} fill alt={s.name} className='object-contain' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex gap-4'>
            <Link
              className='px-4 py-2 bg-[#047856] text-white rounded-md inline-block'
              href='/projects'
            >
              See Projects
            </Link>
            <a href='#contact' className='px-4 py-2 border border-gray-300 rounded-md inline-block'>
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
