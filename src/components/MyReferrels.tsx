"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Carousel, IconButton } from "@material-tailwind/react";
import Link from "next/link";

declare module "@material-tailwind/react" {
  export interface CarouselProps {
    className?: string;
    placeholder?: string;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }
}

declare module "@material-tailwind/react" {
  export interface IconButtonProps {
    className?: string;
    onClick?: () => void;
    placeholder?: string;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }
}

const MyReferrels = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const linkToCopy =
      "https://cart.hostinger.com/pay/a0809e8e-fa37-40f7-b7e5-08dc8bb7302f?_ga=GA1.3.942352702.1711283207"; // Link to be copied
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  return (
    <section className="h-fit min-h-screen w-screen p-6 sm:p-10 bg-gray-200">
      <h2 className="font-clashDisplayMedium text-2xl sm:text-4xl text-black tracking-wide">
        My Referrals:
      </h2>

      <Carousel
        className="h-max min-h-screen rounded-xl text-black"
        placeholder="Loading images..."
        onPointerEnter={() => {}}
        onPointerLeave={() => {}}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-black" : "w-4 bg-black/25"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        <section className="relative w-full h-fit  font-satoshiRegular text-black py-6 px-4 sm:py-12 sm:px-10">
          <Image
            src={`/assets/images/Hostinger-bg.png`}
            alt="image 2"
            className="h-auto sm:h-full w-full object-cover rounded-xl"
            width={1000}
            height={1000}
          />
          <div className="h-screen absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-between  p-4 sm:p-8 bg-gray-200 bg-opacity-60 backdrop-blur-md rounded-xl">
            {/* Left Content */}
            <div className="px-4 sm:px-10 flex flex-col items-start">
              <h2 className="text-xl sm:text-3xl font-bold mb-4 font-satoshiBold">
                Most Popular Business Web Hosting
              </h2>
              <p className="text-black mb-4 sm:mb-6">
                Level-up with more power and enhanced features.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 sm:mb-6 space-y-2">
                <li className="bg-gray-200 bg-opacity-30">100 Websites</li>
                <li className="bg-gray-200 bg-opacity-30">
                  ~100,000 Visits Monthly
                </li>
                <li className="bg-gray-200 bg-opacity-30">
                  200 GB NVMe Storage
                </li>
                <li className="bg-gray-200 bg-opacity-30">
                  600,000 Files and Directories (Inodes)
                </li>
              </ul>
              <p className="text-lg bg-gray-200 bg-opacity-30 text-deep-purple-700 font-bold">
                Rs. 1,199.00/mo
              </p>
              <p className="text-sm text-gray-700 line-through">
                Rs. 14,388.00
              </p>
              <p className="text-lg text-green-700 font-bold">
                Rs. 11,510.40{" "}
                <span className="text-sm text-gray-700">(-20%)</span>
              </p>
            </div>

            {/* Right Content */}
            <div className="h-screen bg-deep-purple-500 w-full p-4 sm:p-6 flex flex-col justify-between rounded-lg shadow-lg">
              <div>
                <p className="text-gray-900 text-lg sm:text-xl font-clashDisplayMedium tracking-wide mb-2 sm:mb-4">
                  Refer to a Friend!
                </p>
                <p className="tracking-wider text-gray-300 mb-4 sm:mb-6">
                  Share this amazing plan and level-up your hosting experience.
                </p>
                <Button
                  onClick={handleCopy}
                  className="bg-white w-full hover:bg-deep-purple-300 text-black font-satoshiBold tracking-wide py-3 sm:py-6 px-4 sm:px-6 rounded place-content-center"
                >
                  {isCopied ? "Link Copied!" : "Copy Link"}
                </Button>
                <p className="mt-2 text-gray-500">
                  {isCopied && "You can now paste the link anywhere!"}
                </p>
              </div>
              <div>
                <h2 className="text-gray-900 text-lg sm:text-xl font-clashDisplayMedium tracking-wide mb-2 sm:mb-4">
                  Go to Hostinger and Start Hosting!
                </h2>
                <Link
                  target="_blank"
                  href="https://cart.hostinger.com/pay/a0809e8e-fa37-40f7-b7e5-08dc8bb7302f?_ga=GA1.3.942352702.1711283207"
                  className="block bg-white hover:bg-deep-purple-300 text-black font-satoshiBold tracking-wide py-2 sm:py-3 px-4 sm:px-6 rounded text-center"
                >
                  Checkout Now!
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Carousel>
    </section>
  );
};

export default MyReferrels;
