'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Repo = {
  id: number | string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at?: string;
  fork?: boolean;
};

export default function RecentProjectsClient({ data }: { data: Repo[] }) {
  const [repos, setRepos] = React.useState<Repo[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.035, when: 'beforeChildren' } },
  };

  const card = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28 } },
  };

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (repos !== undefined) {
      t = setTimeout(() => setLoading(false), 700); // shorter skeleton delay for snappier UI
    }
    return () => clearTimeout(t);
  }, [repos]);

  useEffect(() => {
    setRepos(data);
  }, [data]);

  return (
    <section id='recent-projects' className='py-12 px-6 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='font-clashDisplayMedium text-3xl sm:text-4xl text-center sm:text-left'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: false }}
        >
          <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
            Recent Projects
          </span>
        </motion.h2>

        <p className='text-white/70 mb-6 max-w-3xl'>
          A curated selection of my most notable work — concise, readable and client-friendly.
        </p>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
          variants={container}
          initial='hidden'
          whileInView={repos && !loading ? 'show' : undefined}
          viewport={{ once: false, amount: 0.4 }}
        >
          {(() => {
            switch (true) {
              // show skeletons while loading or repos undefined
              case loading || repos === undefined: {
                return Array.from({ length: Math.max(3, Math.min(6, data?.length || 3)) }).map(
                  (_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      aria-hidden
                      className='relative p-6 rounded-xl bg-gradient-to-br from-white/6 to-white/3 border border-white/6 backdrop-blur-md'
                    >
                      <div className='mb-3'>
                        <div className='h-5 w-3/4 bg-gray-700/40 rounded-md animate-pulse' />
                      </div>
                      <div className='space-y-3'>
                        <div className='h-3 w-full bg-gray-700/30 rounded animate-pulse' />
                        <div className='h-3 w-5/6 bg-gray-700/30 rounded animate-pulse' />
                        <div className='flex items-center justify-between mt-4'>
                          <div className='flex items-center gap-2'>
                            <div className='h-6 w-14 bg-gray-700/20 rounded-full animate-pulse' />
                            <div className='h-4 w-8 bg-gray-700/20 rounded animate-pulse' />
                          </div>
                          <div className='flex gap-2'>
                            <div className='h-8 w-16 bg-gray-700/20 rounded-md animate-pulse' />
                            <div className='h-8 w-12 bg-gray-700/20 rounded-md animate-pulse' />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              }

              // no repos found
              case Array.isArray(repos) && repos.length === 0: {
                return (
                  <div className='col-span-1 md:col-span-3 p-6 rounded-xl border border-white/6 bg-white/6 text-center text-white/70'>
                    No projects found.
                  </div>
                );
              }

              // default: render repo cards
              default: {
                return (repos || []).map((r) => (
                  <motion.article
                    key={r.id}
                    variants={card}
                    whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(2,6,23,0.12)' }}
                    className='relative p-6 rounded-xl bg-gradient-to-br from-white/6 to-white/3 border border-white/6 backdrop-blur-md'
                  >
                    <h3 className='text-lg font-semibold mb-2 text-black/90'>{r.name}</h3>
                    <p className='text-sm text-white/70 mb-4'>
                      {r.description ? r.description : 'Concise project summary not provided.'}
                    </p>

                    <div className='flex items-center justify-between mt-4'>
                      <div className='flex items-center gap-2'>
                        {r.language && (
                          <span className='px-2 py-1 bg-gray-100 rounded-full text-xs'>
                            {r.language}
                          </span>
                        )}
                        <span className='text-xs text-gray-500'>⭐ {r.stargazers_count}</span>
                      </div>

                      <div className='flex gap-2'>
                        <a
                          href={r.html_url}
                          target='_blank'
                          rel='noreferrer'
                          className='px-3 py-1 bg-[#047856] text-white rounded text-sm'
                        >
                          Repo
                        </a>
                        {r.homepage ? (
                          <a
                            href={r.homepage}
                            target='_blank'
                            rel='noreferrer'
                            className='px-3 py-1 border border-gray-300 rounded text-sm'
                          >
                            Demo
                          </a>
                        ) : (
                          <Link
                            href={`/projects`}
                            className='px-3 py-1 border border-gray-300 rounded text-sm'
                          >
                            More
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ));
              }
            }
          })()}
        </motion.div>
        <motion.div
          className='flex justify-center  my-6'
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <Link
            href='/projects'
            className='group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-black font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition'
            aria-label='View all projects'
          >
            <span>View All Projects</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-4 h-4 opacity-90 ml-1 transition-transform group-hover:translate-x-1'
            >
              <path
                fillRule='evenodd'
                d='M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
