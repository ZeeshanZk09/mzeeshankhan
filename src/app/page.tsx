import * as React from "react";
import Hero from "@/components/hero/Hero";
import Link from "next/link";
import Image from "next/image";
// import Projects from '@/components/Projects'
// import Testimonials from '@/components/Testimonials'
// import ContactMe from '@/components/ContactMe'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className=" h-screen  overflow-hidden flex items-center space-y-10 flex-col justify-center ">
        <div className="absolute   h-screen  w-screen bg-white opacity-40 " >
            <Image src={`/assets/images/welcome-bg-img.jpg`} alt="welcome-bg-img" fill className="object-cover w-full h-full" />
        </div>
        <h1 className="font-clashDisplayMedium tracking-widest text-center text-4xl px-2 sm:p-0 sm:text-6xl z-50">
          Welcome to visit my portfolio
        </h1>
        <div className=" sm:items-center  w-2/3 gap-10 sm:gap-0 lg:w-1/3 flex flex-col sm:flex-row items-start sm:justify-between z-50">
          <p className="text-lg justify-self-start font-satoshiBold underline">
            Scroll down to see more:
          </p>
          <Link href={`#hero`} >
            <Image src={`/assets/giffs/down.gif`} width={100} height={100} alt="down.gif" className="object-cover rounded-full w-10 h-10 bg-[aliceblue]" />
          </Link>
        </div>
      </section>
      <Hero />
      {/* <ContactMe /> */}
    </main>
  );
}
