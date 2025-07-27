'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Suspense } from 'react';
// 3D Model Component (replace with your actual models)
import type { FC } from 'react';

interface ProjectModelProps {
  modelPath: string;
}
const modelPath = `/models/optimized/workspace_optimized.glb`; // Replace with actual model paths
useGLTF.preload(modelPath);

const ProjectModel: FC<ProjectModelProps> = (props) => {
  // @ts-expect-error: useGLTF type issue for scene
  const { scene } = useGLTF(modelPath) as { scene: THREE.Object3D };

  // Make a fresh clone per render
  const sceneClone = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive
      object={sceneClone}
      scale={[3, 3, 3]} // adjust size
      position={[0, 0, 0]} // shift model if needed
      {...props}
    />
  );
};

// Mock data - replace with Sanity data
const projects = [
  {
    id: 1,
    title: `Project 1`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath,
    link: '#',
  },
  {
    id: 2,
    title: `Project 2`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath,
    link: '#',
  },
  {
    id: 3,
    title: `Project 3`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath,
    link: '#',
  },
  {
    id: 4,
    title: `Project 4`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath,
    link: '#',
  },
  {
    id: 5,
    title: `Project 5`,
    description: `This is a detailed description of this Project. It showcases innovative solutions and cutting-edge technology.`,
    tags: ['React', 'Three.js', 'Framer Motion'],
    modelPath,
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
      <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className='h-96 w-full rounded-xl overflow-hidden shadow-2xl'>
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              <Environment preset='city' />
              <ProjectModel key={project.id} modelPath={project.modelPath} />
            </Suspense>
          </Canvas>
        </div>
      </div>

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
    <section className='overflow-hidden pt-36 sm:pt-28 px-10 sm:px-24 text-black'>
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

      <div className='max-w-7xl mx-auto'>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

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
