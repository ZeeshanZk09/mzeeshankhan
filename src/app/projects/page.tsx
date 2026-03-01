'use client';
import { motion } from 'framer-motion';
import ProjectCaseStudy from '@/components/projects/ProjectCaseStudy';
import CodeSnippet from '@/components/projects/CodeSnippet';
import ProjectLearnings from '@/components/projects/ProjectLearnings';
import FutureIdeas from '@/components/projects/FutureIdeas';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

// Mock data - replace with Sanity data
const projects = [
  {
    id: 1,
    title: `Project 1`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath: '/models/optimized/project1_optimized.glb',
    link: '#',
  },
  {
    id: 2,
    title: `Project 2`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath: '/models/optimized/project2_optimized.glb',
    link: '#',
  },
  {
    id: 3,
    title: `Project 3`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath: '/models/optimized/project3_optimized.glb',
    link: '#',
  },
  {
    id: 4,
    title: `Project 4`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath: '/models/optimized/project4_optimized.glb',
    link: '#',
  },
  {
    id: 5,
    title: `Project 5`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath: '/models/optimized/project5_optimized.glb',
    link: '#',
  },
];

interface IProjectCard {
  project: {
    id: number;
    title: string;
    description: string;
    link: string;
    tags: string[];
    modelPath: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: IProjectCard) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className=' mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'
    >
      <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
        <h2 className='text-3xl font-bold mb-4'>{project.title}</h2>
        <p className='text-lg mb-6'>{project.description}</p>
        <div className='flex flex-wrap gap-2 mb-6'>
          {project.tags.map((tag, i) => (
            <span key={i} className='px-3 py-1 text-white bg-gray-800 rounded-full text-sm'>
              {tag}
            </span>
          ))}
        </div>
        <motion.a
          href={project.link}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='inline-block px-6 py-3 text-blue-50 bg-blue-600 rounded-lg font-medium'
        >
          View Project
        </motion.a>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <section className='overflow-hidden pt-36 sm:pt-28 px-10 sm:px-24 text-foreground'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='text-center mb-20'
      >
        <h1 className='text-5xl font-bold mb-6'>Project Showcase</h1>
        <p className='text-xl max-w-3xl mx-auto'>
          Explore my portfolio of innovative projects combining cutting-edge technology with
          stunning design. Each project demonstrates my expertise in modern web development.
        </p>
      </motion.div>

      {/* Dynamic projects grid from GitHub */}
      <ProjectsGrid />

      <div className='max-w-7xl mx-auto'>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Case studies and code snippets */}
      <ProjectCaseStudy
        title='Interactive Dashboard'
        challenge='Build a responsive, data-driven dashboard with complex state management.'
        solution='Used Next.js with client-server separation, memoized rendering and virtualization to handle large lists.'
        outcome='Improved load time by 45% and reduced UI jank.'
      />

      <CodeSnippet
        code={`// Example: custom hook for fetch\nimport { useState, useEffect } from 'react'\nexport function useFetch(url){\n  const [data, setData] = useState(null)\n  useEffect(()=>{ fetch(url).then(r=>r.json()).then(setData) },[url])\n  return data\n}`}
      />

      <ProjectLearnings
        learnings={[
          'Optimized rendering with virtualization and memoization',
          'Improved accessibility across breakpoints',
          'Built resilient API error handling and retries',
        ]}
      />

      <FutureIdeas />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='mt-32 text-center'
      >
        <h2 className='text-4xl font-bold mb-6'>Ready to Start Your Project?</h2>
        <p className='text-xl mb-8 max-w-2xl mx-auto'>
          Let&apos;s collaborate to bring your ideas to life with the same level of quality and
          innovation showcased here.
        </p>
        <motion.a
          href='/#contact'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='inline-block px-8 py-4 text-white bg-gradient-to-r  from-blue-600 to-purple-600 rounded-lg font-medium text-lg'
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
}
