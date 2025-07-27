'use client';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { TypeService } from '@/services';

type CarouselProps = {
  services: TypeService[];
  serviceInput?: string;
};

export default function Carousel({ services }: CarouselProps) {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const autoScrollInterval = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const totalScrollWidth = carouselRef.current.scrollWidth;
      const visibleWidth = carouselRef.current.offsetWidth;
      setWidth(totalScrollWidth - visibleWidth);
    }
  }, [services]);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 100); // Change slide every 3 seconds
    };

    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [services.length]);

  // Animate to the current index
  useEffect(() => {
    const itemWidth = 300 + 24; // width + gap
    const newX = -currentIndex * itemWidth;

    controls.start({
      x: newX,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  }, [currentIndex, controls]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  return (
    <AnimatePresence>
      <div className='relative'>
        <motion.div
          ref={carouselRef}
          className='overflow-hidden cursor-grab'
          whileTap={{ cursor: 'grabbing' }}
        >
          <motion.div
            className='flex gap-6 pb-6'
            drag='x'
            dragConstraints={{ right: 0, left: -width }}
            animate={controls}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 50 || velocity.x > 800) {
                setCurrentIndex(Math.max(currentIndex - 1, 0));
              } else if (offset.x < -50 || velocity.x < -800) {
                setCurrentIndex(Math.min(currentIndex + 1, services.length - 1));
              }
            }}
          >
            {services.map((service) => (
              <motion.section
                key={service.id}
                className='min-w-[300px] bg-white rounded-2xl p-6 shadow-lg'
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className='text-2xl font-bold mb-4'>{service.title}</h3>
                <ul className='list-disc pl-5 mb-4'>
                  {service.description.slice(0, 3).map((d, i) => (
                    <li key={i} className='text-gray-600'>
                      {d}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${service.id}`}>
                  <motion.button
                    className='mt-auto bg-green-500 text-white py-2 px-4 rounded-full'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.section>
            ))}
          </motion.div>
        </motion.div>

        {/* Navigation Dots */}
        <div className='flex justify-center gap-2 mt-6'>
          {services.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => goToIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                opacity: index === currentIndex ? 1 : 0.6,
              }}
              transition={{ type: 'spring', stiffness: 500 }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          className='h-1 bg-gray-200 rounded-full mt-4'
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          key={currentIndex}
        />
      </div>
    </AnimatePresence>
  );
}
