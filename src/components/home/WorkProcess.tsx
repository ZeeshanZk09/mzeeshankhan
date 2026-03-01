import AnimationWrapper from '../utils/AnimationWrapper';
import { PhoneCall, FileText, Code2, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    icon: PhoneCall,
    number: '01',
    title: 'Discovery Call',
    description:
      'We discuss your goals, requirements, and vision to make sure I fully understand what you need.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Proposal & Plan',
    description:
      'I prepare a clear scope, timeline, and quote so you know exactly what to expect — no surprises.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Development',
    description:
      'I build your project with clean code, modern tools, and regular progress updates along the way.',
  },
  {
    icon: MessageSquare,
    number: '04',
    title: 'Feedback & Revisions',
    description:
      'You review the work, share feedback, and I iterate until everything is exactly right.',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Delivery & Support',
    description:
      'I deploy the final product, hand over all assets, and stay available for post-launch support.',
  },
];

export default function WorkProcess() {
  return (
    <AnimationWrapper>
      <section id='work-process' className='w-full py-16 px-6 sm:px-24'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-2'>
            <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
              How I Work
            </span>
          </h2>
          <p className='text-foreground/60 mb-10 max-w-3xl'>
            A structured, transparent process so you always know what&apos;s happening and when to
            expect results.
          </p>

          {/* Timeline */}
          <div className='relative'>
            {/* Connector line (hidden on mobile, shown md+) */}
            <div
              aria-hidden='true'
              className='hidden md:block absolute top-10 left-[calc(10%+12px)] right-[calc(10%+12px)] h-0.5 bg-gradient-to-r from-[#047856]/40 via-[#06a475]/30 to-[#047856]/40'
            />

            <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className='relative flex flex-col items-center text-center group'
                  >
                    {/* Circle icon */}
                    <div className='relative z-10 flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#11e3a4]/40 bg-white/5 dark:bg-white/5 backdrop-blur-sm group-hover:border-[#06a475] group-hover:bg-[#047856]/10 transition-all duration-300'>
                      <Icon className='w-7 h-7 text-[#06a475]' />
                    </div>

                    {/* Step number */}
                    <span className='mt-3 text-xs font-mono tracking-widest text-[#11e3a4]'>
                      STEP {step.number}
                    </span>

                    {/* Title */}
                    <h3 className='mt-1 text-base font-clashDisplayBold text-foreground'>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className='mt-1.5 text-sm leading-relaxed text-foreground/80 max-w-[200px]'>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
