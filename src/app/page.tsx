import * as React from "react";
import Hero from "@/components/hero/Hero";
import Link from "next/link";
// import Projects from '@/components/Projects'
// import Testimonials from '@/components/Testimonials'
// import ContactMe from '@/components/ContactMe'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className=" h-screen  overflow-hidden flex items-center space-y-10 flex-col justify-center ">
        <div className="absolute  h-screen  w-screen welcome-img"/>
        <div className="absolute transform scale-[1.09] lg:scale-[1.064] -translate-y-10  h-screen overflow-x-hidden w-[91.5vw] bg-slate-200 opacity-65 z-10" />
        <h1 className="font-clashDisplayMedium tracking-widest text-center text-4xl px-2 sm:p-0 sm:text-6xl z-50">
          Welcome to visit my portfolio
        </h1>
        <div className=" sm:items-center  w-2/3 gap-10 sm:gap-0 lg:w-1/3 flex flex-col sm:flex-row items-start sm:justify-between z-50">
          <p className="text-lg justify-self-start font-satoshiBold underline">
            Scroll down to see more:
          </p>
          <Link href={`#hero`}>see more</Link>
        </div>
      </section>
      <Hero />
      {/* <ContactMe /> */}
    </main>
  );
}
