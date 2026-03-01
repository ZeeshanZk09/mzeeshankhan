import Image from 'next/image';
import AnimationWrapper from '../utils/AnimationWrapper';

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
};

export default async function FeaturedProject() {
  let featured: GitHubRepo | null = null;
  try {
    const res = await fetch('https://api.github.com/users/ZeeshanZk09/repos?per_page=100', {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const repos: GitHubRepo[] = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        featured = repos.find((repo) => repo.name.toLowerCase() === 'e-com-mlm') || repos[0];
      }
    }
  } catch (e) {
    console.error('Error fetching featured project:', e);
    featured = null;
  }

  return (
    <AnimationWrapper>
      <section id='featured-project' className='w-full py-16 px-6 sm:px-24'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-4xl font-clashDisplayRegular mb-6 text-white tracking-tight'>
              <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
                Featured Project
              </span>
            </h2>
            {featured ? (
              <div className='bg-white/10 border border-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-md'>
                <h3 className='text-2xl font-semibold text-white mb-2 flex items-center gap-2'>
                  <span>{featured.name}</span>
                  {featured.language && (
                    <span className='ml-2 px-2 py-0.5 rounded bg-[#047856]/80 text-xs text-white font-medium'>
                      {featured.language}
                    </span>
                  )}
                </h3>
                <p className='text-white/80 mb-4'>
                  {featured.description ?? 'A highlighted repository from my GitHub.'}
                </p>
                <div className='flex items-center gap-4 mb-6'>
                  <span className='flex items-center gap-1 text-yellow-400 font-semibold'>
                    <svg width='18' height='18' fill='currentColor' className='inline-block'>
                      <path d='M9 1.5l2.09 5.26L16.5 7.27l-4.18 4.07L13.18 16.5 9 13.77 4.82 16.5l.86-5.16L1.5 7.27l5.41-.51L9 1.5z' />
                    </svg>
                    {featured.stargazers_count || 5}
                  </span>
                  <span className='text-white/60 text-sm'>stars</span>
                </div>
                <div className='flex gap-3'>
                  <a
                    href={featured.html_url}
                    target='_blank'
                    rel='noreferrer'
                    className='px-5 py-2 bg-[#047856] hover:bg-[#03543f] text-white rounded-md font-medium transition'
                  >
                    View on GitHub
                  </a>
                  {featured.homepage ? (
                    <a
                      href={featured.homepage}
                      target='_blank'
                      rel='noreferrer'
                      className='text-white px-5 py-2 border border-[#047856]  hover:bg-[#047856]/10 rounded-md font-medium transition'
                    >
                      {/* text-[#047856] */}
                      Live Demo
                    </a>
                  ) : (
                    <a
                      href='#projects'
                      className='px-5 py-2 border border-gray-300 text-white hover:bg-white/10 rounded-md font-medium transition'
                    >
                      More Projects
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className='bg-white/10 border border-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-md'>
                <p className='text-white/70 mb-6'>
                  Unable to fetch featured project right now. Visit my GitHub to explore more of my
                  work!
                </p>
                <div className='flex gap-3'>
                  <a
                    href='https://github.com/ZeeshanZk09'
                    target='_blank'
                    rel='noreferrer'
                    className='px-5 py-2 bg-[#047856] hover:bg-[#03543f] text-white rounded-md font-medium transition'
                  >
                    View GitHub
                  </a>
                  <a
                    href='#contact'
                    className='px-5 py-2 border border-gray-300 text-white hover:bg-white/10 rounded-md font-medium transition'
                  >
                    Discuss a project
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className='w-full min-h-80 rounded-2xl bg-white/10 flex flex-col items-center justify-center p-8 max-sm:p-4 shadow-lg'>
            <div className='relative w-full h-48 sm:h-64 md:h-80 mb-6'>
              <Image
                src='/assets/images/projects/e-com-mlm.png'
                alt='featured project'
                fill
                className='object-contain object-center'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                priority
              />
            </div>
            <p className='text-white/90 text-lg font-medium text-center max-w-md'>
              {featured
                ? 'Check out my most popular open-source project, built with passion and modern web technologies.'
                : 'I love building robust, scalable web apps. Let’s connect if you have an idea or want to collaborate!'}
            </p>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
