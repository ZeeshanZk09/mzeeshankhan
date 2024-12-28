"use client";
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
    <section className="  p-6 xl:p-10 bg-gray-200">
      <h2 className="font-clashDisplayMedium text-2xl xl:text-4xl text-black tracking-wide">
        My Referrals:
      </h2>

      <Carousel
        className="flex h-[calc(100vh-100px)] lg:h-[400px] min-h-[300px] rounded-xl text-black"
        placeholder="Loading images..."
        onPointerEnter={() => {}}
        onPointerLeave={() => {}}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="px-20 absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
            aria-label="Previous"
            variant="text"
            color="black"
            size="lg"
            onClick={handlePrev}
            className="hidden sm:block !absolute top-2/4 left-4 -translate-y-2/4"
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
            aria-label="Next"
            variant="text"
            color="black"
            size="lg"
            onClick={handleNext}
            className="hidden sm:block !absolute top-2/4 right-4 -translate-y-2/4"
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
        <section className=" h-full relative    font-satoshiRegular text-black py-6 px-4 lg:py-12 lg:px-20">
          <div className="h-fit absolute max-w-4xl justify-self-center inset-0 flex flex-col xl:flex-row gap-4  items-center justify-around  p-4 xl:p-6 bg-gray-200 bg-opacity-60 backdrop-blur-md rounded-xl">
            {/* Left Content */}
            <div className="px-4 xl:px-10 flex flex-col items-start ">
              <h2 className="text-lg  font-bold mb-2 font-satoshiBold">
                Most Popular Business Web Hosting
              </h2>
              <p className="text-black mb-2 ">
                Level-up with more power and enhanced features.
              </p>
              <ul className="text-xs  list-disc list-inside text-gray-700 mb-2  space-y-1 ">
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
              <p className="text-sm bg-gray-200 bg-opacity-30 text-deep-purple-700 font-bold">
                Rs. 1,199.00/mo
              </p>
              <p className="text-xs text-gray-700 line-through">
                Rs. 14,388.00
              </p>
              <p className="text-sm text-green-700 font-bold">
                Rs. 11,510.40{" "}
                <span className="text-xs text-gray-700">(-20%)</span>
              </p>
            </div>
            <div className="xl:hidden  flex items-start sm:justify-between w-11/12 gap-2 sm:items-center">
              <Button
                onClick={handleCopy}
                aria-label={isCopied ? "Link Copied" : "Copy Link"}
                className="bg-white py-3 px-4 hover:bg-deep-purple-300 text-sm text-black font-satoshiBold tracking-wide rounded place-content-center"
              >
                {isCopied ? "Link Copied!" : "Copy Link"}
              </Button>

              <Link
                target="_blank"
                href="https://cart.hostinger.com/pay/a0809e8e-fa37-40f7-b7e5-08dc8bb7302f?_ga=GA1.3.942352702.1711283207"
                className="w-2/6"
              >
                <Button className=" bg-white hover:bg-deep-purple-300 text-sm text-black font-satoshiBold py-3  px-4  rounded text-center">
                  Checkout Now!
                </Button>
              </Link>
            </div>

            {/* Right Content */}
            <div className="hidden bg-deep-purple-500  p-4  xl:flex flex-col justify-between rounded-lg shadow-lg">
              <div className="h-32 mb-2">
                <p className="text-gray-900 text-sm xl:text-lg font-clashDisplayMedium tracking-wide mb-1 ">
                  Refer to a Friend!
                </p>
                <p className="text-xs tracking-widest text-gray-300 mb-2 ">
                  Share this amazing plan and level-up your hosting experience.
                </p>
                <Button
                  onClick={handleCopy}
                  aria-label={isCopied ? "Link Copied" : "Copy Link"}
                  className="bg-white w-full hover:bg-deep-purple-300 text-sm text-black font-satoshiBold tracking-wide py-3 sm:py-6 px-4 sm:px-6 rounded place-content-center"
                >
                  {isCopied ? "Link Copied!" : "Copy Link"}
                </Button>
                <p className="sticky text-xs m-1 text-gray-500">
                  {isCopied && "You can now paste the link anywhere!"}
                </p>
              </div>
              <div>
                <h2 className="text-gray-900 text-sm sm:text-lg font-clashDisplayMedium tracking-wide mb-1">
                  Go to Hostinger and Start Hosting!
                </h2>
                <Link
                  target="_blank"
                  href="https://cart.hostinger.com/pay/a0809e8e-fa37-40f7-b7e5-08dc8bb7302f?_ga=GA1.3.942352702.1711283207"
                  className="block bg-white hover:bg-deep-purple-300 text-sm text-black font-satoshiBold tracking-wide py-2 sm:py-3 px-4 sm:px-6 rounded text-center"
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
