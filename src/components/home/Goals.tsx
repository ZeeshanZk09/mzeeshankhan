import AnimationWrapper from '../utils/AnimationWrapper';
import { Target, Rocket, Globe, Users, Code, Trophy } from 'lucide-react';

const goals = [
  {
    icon: Code,
    title: 'Full-Stack Mastery',
    description:
      'Achieve expert-level proficiency in modern web technologies including React, Next.js, Node.js, and cloud platforms.',
    timeline: '2024 - 2026',
    status: 'completed',
  },
  {
    icon: Target,
    title: 'Master AI & Web 3.0',
    description:
      'Learn and apply cutting-edge technologies like AI, blockchain, and decentralized applications to build innovative solutions.',
    timeline: '2024 - 2028',
    status: 'in-progress',
  },
  {
    icon: Rocket,
    title: 'Freelance Success',
    description:
      'Grow my freelance business to serve 100+ clients, delivering high-impact web solutions and building long-term partnerships.',
    timeline: 'Ongoing',
    status: 'in-progress',
  },
  {
    icon: Globe,
    title: 'Open Source Impact',
    description:
      'Contribute to major open-source projects and create tools that help thousands of developers worldwide.',
    timeline: 'Ongoing',
    status: 'in-progress',
  },
  {
    icon: Users,
    title: 'Mentor 100+ Developers',
    description:
      'Share knowledge through content creation, mentoring, and helping junior developers grow in their careers.',
    timeline: '2024 - 2027',
    status: 'in-progress',
  },
  {
    icon: Trophy,
    title: 'Tech Conference Speaker',
    description:
      'Speak at major tech conferences and share insights on modern web development and entrepreneurship.',
    timeline: '2025 - 2026',
    status: 'planned',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-900 backdrop-blur-sm bg-green-500/10';
    case 'in-progress':
      return 'text-blue-900 backdrop-blur-sm bg-blue-500/10';
    case 'near-completion':
      return 'text-yellow-900 backdrop-blur-sm bg-yellow-500/10';
    case 'planned':
      return 'text-purple-900 backdrop-blur-sm bg-purple-500/10';
    default:
      return 'text-gray-900 backdrop-blur-sm bg-gray-500/10';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'near-completion':
      return 'Near Completion';
    case 'planned':
      return 'Planned';
    default:
      return 'Unknown';
  }
};

export default function Goals() {
  return (
    <AnimationWrapper>
      <section id='goals' className='w-full py-16 px-6 sm:px-24'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-2'>
            <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
              My Goals & Vision
            </span>
          </h2>
          <p className='text-foreground/60 mb-12 max-w-3xl'>
            Here are the ambitious goals I&apos;m working towards — from mastering cutting-edge
            technologies to building impactful solutions and contributing to the developer
            community.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <div
                  key={index}
                  className='group relative p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
                >
                  <div className='flex items-start gap-4'>
                    <div className='p-3 rounded-lg bg-[#047856]/20 text-[#06a475] group-hover:bg-[#047856]/30 transition-colors flex-shrink-0'>
                      <Icon className='w-6 h-6' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between mb-2'>
                        <h3 className='text-lg font-clashDisplaySemibold text-foreground'>
                          {goal.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}
                        >
                          {getStatusText(goal.status)}
                        </span>
                      </div>
                      <p className='text-sm text-foreground/70 mb-3 leading-relaxed'>
                        {goal.description}
                      </p>
                      <div className='text-xs text-foreground/50 font-medium'>
                        Timeline: {goal.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-12 text-center'>
            <p className='text-foreground/60 text-sm max-w-2xl mx-auto'>
              These goals drive my continuous learning journey and commitment to creating meaningful
              impact in the tech industry while helping others succeed along the way.
            </p>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
