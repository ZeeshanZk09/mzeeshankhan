"use client";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import QuickLinks from "./QuickLinks";

export default function Header() {
  const [open, setOpen] = React.useState(false);



  return (
    <header className="absolute w-screen h-28 sm:px-5  bg-transparent z-50">
      {/* Desktop view version */}

      <div
        className="flex w-full p-4 items-center justify-end  lg:justify-between  "
        aria-label="Global"
      >
        <div className="flex items-center flex-row-reverse lg:flex-row lg:w-fit w-screen justify-between h-5   ">
          <Link href="/" className=" w-max lg:w-fit">
            <span className="sr-only">Zk Muhammad Zeeshan Khan</span>
            <h2 className=" w-max font-clashDisplayRegular  text-3xl sm:text-4xl justify-self-end">
              M Zeeshan Khan
            </h2>
          </Link>
          <SidebarProvider
            open={open}
            onOpenChange={setOpen}
            className="block lg:hidden top-0"
          >
            <AppSidebar />
            <SidebarTrigger />
          </SidebarProvider>
        </div>
        {/* Center Links - Fixed */}
        <QuickLinks navClassName={`w-2/4  hidden  lg:flex md:items-center  `} ulClassName={` gap-20 items-center` } />

        <div className="hidden lg:flex w-fit lg:justify-end ">
          <Link
            href="/assets/docs/ZK Resume.pdf"
            target="_blank"
            download="ZK_Resume.pdf"
            id="loginBtn"
            className="relative w-fit px-2 py-1 lg:text-[1.278rem] xl:text-[1.556rem] 2xl:text-[1.944rem] font-semibold bg-[#04AF70] border-none rounded-lg text-white font-satoshiRegular cursor-pointer  z-50 overflow-hidden"
          >
            Download CV
          </Link>
        </div>
      </div>
    </header>
  );
}
