import ServiceNotFoundPage from '@/components/utils/ServiceNotFoundPage';
import serviceDetails from '@/lib/data/serviceDB.json';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDetails.serviceDetails.find((s) => s.slug === slug);
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }
  return {
    title: service.title,
    description: `${service.details.introduction.slice(0, 155)}…`,
    openGraph: {
      title: `${service.title} — M Zeeshan Khan`,
      description: service.details.introduction.slice(0, 155),
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const service = serviceDetails.serviceDetails.find((s) => s.slug === slug);

  if (!service) return <ServiceNotFoundPage />;

  return (
    <section className='min-h-screen pt-36 sm:pt-28 py-28 space-y-8 px-10 sm:px-24'>
      <Link
        href='/services'
        className='inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors'
        aria-label='Back to services'
      >
        <ArrowLeft className='w-5 h-5' />
        <span className='text-sm font-medium'>Back to Services</span>
      </Link>

      <div>
        <h1 className='text-3xl font-bold text-[#06a475]'>{service.title}</h1>
        <p className='text-foreground/70 mt-4'>{service.details.introduction}</p>

        <h2 className='text-2xl font-semibold mt-8 text-foreground'>Features</h2>
        <ul className='list-disc pl-6 space-y-2 text-foreground/70'>
          {service.details.features.map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <h2 className='text-2xl font-semibold mt-8 text-foreground'>Technologies</h2>
        <ul className='list-disc pl-6 space-y-2 text-foreground/70'>
          {service.details.technologies.map((tech: string, index: number) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <h3 className='mt-8 text-lg font-semibold text-foreground'>
          Duration: {service.details.duration}
        </h3>
        <h3 className='text-lg font-semibold text-foreground'>Price: {service.details.price}</h3>

        <div className='mt-8'>
          <Link
            href='/#contact'
            className='inline-block px-6 py-3 bg-[#047856] text-white rounded-md hover:bg-[#03603d] transition-colors'
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const serviceSlugs = serviceDetails.serviceDetails.map((s: { slug: string }) => s.slug);
  return serviceSlugs.map((slug: string) => ({ slug }));
}
