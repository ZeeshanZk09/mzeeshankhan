import React from 'react';
import { Heart, BookOpen, Users2, Lightbulb, Compass, Smile, Leaf, Handshake } from 'lucide-react';

const personalValues = [
  {
    icon: Heart,
    title: 'Authentic Impact',
    description:
      'Build technology that genuinely solves real problems for real people, not just for the sake of innovation.',
  },
  {
    icon: BookOpen,
    title: 'Lifelong Learning',
    description:
      "Stay curious and humble. There's always something new to learn from every project, person, and mistake.",
  },
  {
    icon: Users2,
    title: 'Community First',
    description:
      "Success means nothing if it's not shared. Helping others grow multiplies the impact we can make together.",
  },
  {
    icon: Lightbulb,
    title: 'Creative Problem Solving',
    description:
      'Approach challenges with creativity and empathy. The best solutions often come from thinking differently.',
  },
];

const personalGrowthAreas = [
  {
    icon: Compass,
    title: 'Leadership Through Service',
    category: 'Personal Development',
    description:
      'Develop leadership skills not through authority, but by serving others and enabling their success. True leaders create more leaders.',
    focus: 'Building empathy, active listening, and creating psychological safety for teams.',
  },
  {
    icon: Smile,
    title: 'Work-Life Harmony',
    category: 'Life Balance',
    description:
      'Maintain sustainable productivity while nurturing relationships, health, and personal interests outside of tech.',
    focus: 'Setting healthy boundaries and being fully present in each moment.',
  },
  {
    icon: Leaf,
    title: 'Mindful Technology',
    category: 'Philosophy',
    description:
      'Build technology that enhances human connection rather than replacing it. Consider the ethical implications of every decision.',
    focus: 'Understanding the social impact of technology and building responsibly.',
  },
  {
    icon: Handshake,
    title: 'Cross-Cultural Understanding',
    category: 'Global Perspective',
    description:
      'Work with diverse teams and understand different perspectives to build more inclusive and accessible products.',
    focus: 'Learning from different cultures and incorporating diverse viewpoints into solutions.',
  },
];

export default function AboutGoals() {
  return (
    <section id='about-goals' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4 text-foreground'>
          Personal Values & Growth
        </h2>
        <p className='text-foreground/60 mb-8 max-w-3xl leading-relaxed'>
          Beyond professional achievements, I&apos;m focused on personal growth, meaningful
          relationships, and building technology that serves humanity. Here are the values that
          guide my journey and the areas where I&apos;m actively growing as a person.
        </p>
        {/* Core Values */}
        <div className='mb-12'>
          <h3 className='text-xl font-clashDisplaySemibold text-foreground mb-6 flex items-center gap-2'>
            <Heart className='w-5 h-5 text-[#06a475]' />
            Core Values That Drive Me
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {personalValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className='group p-5 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
                >
                  <div className='flex items-start gap-4'>
                    <div className='p-2 rounded-lg bg-[#047856]/20 text-[#06a475] group-hover:bg-[#047856]/30 transition-colors'>
                      <Icon className='w-5 h-5' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-clashDisplaySemibold text-foreground text-sm mb-2'>
                        {value.title}
                      </h4>
                      <p className='text-xs text-foreground/60 leading-relaxed'>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Growth Areas */}
        <div className='mb-8'>
          <h3 className='text-xl font-clashDisplaySemibold text-foreground mb-6 flex items-center gap-2'>
            <Compass className='w-5 h-5 text-[#06a475]' />
            Areas of Personal Growth
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {personalGrowthAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className='group p-5 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
                >
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 rounded-lg bg-[#047856]/20 text-[#06a475] group-hover:bg-[#047856]/30 transition-colors'>
                        <Icon className='w-5 h-5' />
                      </div>
                      <div>
                        <h4 className='font-clashDisplaySemibold text-foreground text-sm'>
                          {area.title}
                        </h4>
                        <span className='text-xs text-[#06a475] font-medium'>{area.category}</span>
                      </div>
                    </div>
                    <div>
                      <p className='text-xs text-foreground/60 leading-relaxed mb-2'>
                        {area.description}
                      </p>
                      <p className='text-xs text-foreground/50 italic'>Focus: {area.focus}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Life Philosophy */}
        <div className='p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm'>
          <h3 className='font-clashDisplaySemibold text-foreground mb-3 flex items-center gap-2'>
            <Lightbulb className='w-5 h-5 text-[#06a475]' />
            Life Philosophy
          </h3>
          <p className='text-foreground/70 text-sm leading-relaxed mb-3'>
            I believe that technology is only as good as the humans behind it. My goal isn&apos;t
            just to build great software, but to become a better human being in the process. Every
            interaction, every project, and every challenge is an opportunity to grow in empathy,
            understanding, and wisdom.
          </p>
          <p className='text-foreground/70 text-sm leading-relaxed'>
            Success, for me, is measured not just by career achievements, but by the positive impact
            I have on others, the relationships I build, and the legacy I leave behind. I want to be
            remembered as someone who used their skills to make the world a little bit better.
          </p>
        </div>
      </div>
    </section>
  );
}
