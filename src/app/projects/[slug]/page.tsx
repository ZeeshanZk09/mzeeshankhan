import { fetchProjectBySlug } from '@/lib/actions/projects.server';

export async function generateViewport({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug); // Replace with actual fetching logic

  if (!project) {
    return {
      width: 800,
      height: 600,
    };
  }
  return {
    width: 1200,
    height: 630,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `Project: ${slug}`,
    description: `Details and information about the project ${slug}.`,
  };
}

export default async function ProjectBySlug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(slug);
  return <div className='pt-36 sm:pt-28'></div>;
}

export async function generateStaticParams() {
  // Fetch all project slugs from your data source (e.g., database, API)
  const slugs = ['project-1', 'project-2', 'project-3']; // Replace with actual fetching logic
  return slugs.map((slug) => ({ slug }));
}
