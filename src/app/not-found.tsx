// import Image from 'next/image';
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-fit py-40 text-black text-center px-6">
      <h1 className="text-6xl font-bold animate-bounce">404</h1>
      <h2 className="text-2xl mt-4">Hang tight! 🚧</h2>
      <p className="mt-2 text-lg">
        I am working on creating this page. Check back soon, or explore
        something else in the meantime!
      </p>
      <iframe src="https://lottie.host/embed/6b40397d-4f1a-4abf-970d-3f9c927f887a/PL1lgS4Rji.lottie" title="Lottie Animation" width="400" height="200" frameBorder="0" className="w-full h-full"></iframe>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
      >
        Take Me Home 🏠
      </Link>
    </section>
  );
}
