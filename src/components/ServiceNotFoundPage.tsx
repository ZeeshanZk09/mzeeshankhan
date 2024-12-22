"use client";
// import Link from "next/link";
import React from "react";

const ServiceNotFoundPage = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <div className="py-28 flex px-2 flex-col items-center justify-center h-fit  text-black text-center">
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
        {/* <Link  href={`/services`} > */}
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white py-1 px-2 rounded-full text-lg font-normal transition-transform transform hover:scale-110"
            onClick={handleClick}
          >
            Back to Services
          </button>
        {/* </Link> */}
        <button
          type="button"
          className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded-full text-lg font-normal transition-transform transform hover:scale-110"
          onClick={() => alert("Error reported to the fun police! 🚓")}
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
};

export default ServiceNotFoundPage;
