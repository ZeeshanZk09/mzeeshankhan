import Link from 'next/link';
import { services } from '@/lib/data/services';

export default function ServicesMarquee() {
  return (
    <section className='w-full py-12 overflow-hidden'>
      <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-6 px-6 sm:px-24'>
        <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
          What I Offer
        </span>
      </h2>

      <div className='overflow-hidden'>
        <div className='flex min-w-[200%] animate-[marqueeScroll_30s_linear_infinite] hover:[animation-play-state:paused] gap-6'>
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className='flex-shrink-0 w-72 sm:w-80 p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 group'
            >
              <h3 className='text-lg font-clashDisplayMedium text-foreground group-hover:text-[#06a475] transition-colors mb-2'>
                {service.title}
              </h3>
              <p className='text-sm text-foreground/60 line-clamp-2'>{service.description[0]}</p>
            </Link>
          ))}
          {/* Duplicate for seamless loop */}
          {services.map((service) => (
            <Link
              key={`${service.id}-dup`}
              href={`/services/${service.slug}`}
              className='flex-shrink-0 w-72 sm:w-80 p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 group'
              aria-hidden
              tabIndex={-1}
            >
              <h3 className='text-lg font-clashDisplayMedium text-foreground group-hover:text-[#06a475] transition-colors mb-2'>
                {service.title}
              </h3>
              <p className='text-sm text-foreground/60 line-clamp-2'>{service.description[0]}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
