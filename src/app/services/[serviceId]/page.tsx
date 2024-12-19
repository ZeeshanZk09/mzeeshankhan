import serviceDetails from "@/serviceDB.json";
import Image from "next/image";
import Link from "next/link";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const servicesId = +(await params).serviceId;
  const service = serviceDetails.serviceDetails.find(
    (s: { id: number }) => s.id === servicesId
  );

  if (!service)
    return (
      <div className="py-28 flex flex-col items-center justify-center h-fit  text-black text-center">
        <h1 className="text-6xl font-extrabold mb-4">404!</h1>
        <p className="text-2xl mb-6">Oops! Service not found...</p>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg">
            Looks like we couldn’t find what you were looking for. 😅
          </p>
          <p className="text-lg">
            Maybe it ran away... or got lost in the matrix! 🕶️✨
          </p>
        </div>
        <div className="mt-8 flex items-center space-x-4">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white py-1 px-2 rounded-full text-lg font-normal transition-transform transform hover:scale-110"
          >
            Back to Services
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded-full text-lg font-normal transition-transform transform hover:scale-110"
          >
            Report This!
          </button>
        </div>
        <div className="mt-12">
          <iframe
            src="https://giphy.com/embed/qUEkcv8EGkRUV4Ufl0"
            width="400"
            height="200"
            title="Funny GIF about service not found"
            frameBorder="0"
            className="justify-self-center w-40 h-40"
            allowFullScreen
          ></iframe>
          <p className="mt-4 text-sm text-gray-400">
            Don’t worry, we’ll find the missing service... someday. 🕵️‍♂️
          </p>
        </div>
      </div>
    );

  return (
      <section className="min-h-screen   py-28 space-y-8 px-10">
        <div className="w-fit p-1 bg-black   rounded-full">
          <Link href={`/services`}>
            <Image
              src={`/assets/images/back.png`}
              alt="back.png"
              height={100}
              width={100}
              className="transform -translate-x-1 object-cover invert w-8 h-8"
            />
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-green-500">{service.title}</h1>
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
          <h3 className="text-lg font-semibold">
            Price: {service.details.price}
          </h3>

          <Link href="/services/123">Go to Service 123</Link>
        </div>
      </section>
  );
}
