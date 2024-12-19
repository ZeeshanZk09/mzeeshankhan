import serviceDetails from '@/serviceDB.json';
import Image from 'next/image';
import Link from "next/link";


export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const servicesId = +(await params).serviceId;
  const service = serviceDetails.serviceDetails.find((s: { id: number }) => s.id === servicesId);

  if (!service) return <div>Service Not Found</div>;

  return (
    <section className="min-h-screen py-28 space-y-8 px-6">
      <div className='w-fit p-2 bg-slate-300 rounded-full'>
        <Link href={`/services`}>
        <Image src={`/assets/images/back.png`} alt="back.png" height={100} width={100} className="object-cover w-8 h-8"/>
        </Link>
      </div>
      <div>

      <h1 className="text-3xl font-bold text-blue-600">{service.title}</h1>
      <p className="text-gray-700 mt-4">{service.details.introduction}</p>

      <h2 className="text-2xl font-semibold mt-8">Features</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        {service.details.features.map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Technologies</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        {service.details.technologies.map((tech: string, index: number) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>

      <h3 className="mt-8 text-lg font-semibold">
        Duration: {service.details.duration}
      </h3>
      <h3 className="text-lg font-semibold">Price: {service.details.price}</h3>

      <Link href="/services/123">Go to Service 123</Link>
        </div>
    </section>
  );
}
