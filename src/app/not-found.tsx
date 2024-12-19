// import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-black text-center px-6">
      <h1 className="text-6xl font-bold animate-bounce">404</h1>
      <h2 className="text-2xl mt-4">Hang tight! 🚧</h2>
      <p className="mt-2 text-lg">
        I am working on creating this page. Check back soon, or explore something else in the meantime!
      </p>
      {/* <Image
        src="/assets/404-illustration.png"
        alt="Funny 404 Illustration"
        className="w-64 h-64 mt-6 rounded-full shadow-lg"
      /> */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
      >
        Take Me Home 🏠
      </Link>
    </div>
  );
}
