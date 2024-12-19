"use client";
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Blinkingtext from "@/components/BlinkingText";
import { services } from "@/services";
import { TypeService } from "@/services";
function Services() {
  const [serviceInput, setServiceInput] = useState("");
  const [filteredServices, setFilteredServices] =
    useState<TypeService[]>(services);
  const [titleBg, setTitileBg] = useState("");
  // let indexBg: string;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServiceInput(inputValue);

    if (inputValue.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) => {
        for (let i = 0; i < inputValue.length; i++) {
          const findChar = service.title
            .toLowerCase()
            .includes(inputValue.toLowerCase()[i]);
          // if (findChar && service.title.toLowerCase()[i] ===inputValue.toLowerCase()[i] ) {
          //   indexBg = service.title[i]
          // }
          if (findChar) {
            // document.getElementById(service.title[i])!.style.backgroundColor =  '#04af7085'
            setTitileBg("bg-[#04af7049] rounded-full px-3");
          }
          if (findChar) {
            return service.title
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          }
        }
      });
      setFilteredServices(filtered);
      if (serviceInput === "") {
        setTitileBg("");
      }
    }
  };

  return (
    <section id="services" className="h-full w-screen flex flex-col  ">
      {/* Header Section */}
      <section className="py-16 px-9 h-fit flex flex-col sm:flex-row w-screen  sm:justify-between  sm:items-center space-y-6">
        <div className="flex flex-col  sm:justify-center sm:w-2/4   h-fit items-start">
          <div className="flex flex-col   sm:justify-center">
            <h2 className="text-3xl sm:text-4xl text-gray-800 font-clashDisplayRegular">
              My Services:
            </h2>
            <p className="text-lg indent-10 text-justify text-gray-600  max-w-3xl font-satoshiRegular">
              I provide a wide range of professional services in the web
              development domain, ensuring high-quality, modern, and functional
              solutions tailored to your needs.
            </p>
          </div>
          <div className="flex flex-col-reverse w-full space-y-10">
            <div className="bg-white w-full flex items-center sm:gap-4 rounded-full px-4 py-2 shadow-lg max-w-lg">
              <input
                type="search"
                className="text-sm sm:text-base bg-transparent flex-grow outline-none placeholder-gray-400"
                value={serviceInput}
                placeholder="Search a service"
                onChange={handleInputChange}
              />
              <button
                type="button"
                className={`py-1 px-2 font-satoshiBold tracking-wider rounded-full transition ${
                  serviceInput
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!serviceInput}
              >
                Search
              </button>
              <style jsx>{`
                input[type="search"]::-webkit-search-cancel-button {
                  -webkit-appearance: none;
                  appearance: none;
                }
              `}</style>
            </div>
            <div>
              <h2 className="text-3xl font-clashDisplayRegular">
                What I serve:
              </h2>
              <Blinkingtext texts={services.map((s) => s.title)} />
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <video
            src="/assets/videos/workingVideo.mp4"
            autoPlay
            loop
            muted
            height={360}
            width={640}
            className="w-[260px] h-500px] "
          >
            Your browser does not support video tag
          </video>
        </div>
      </section>

      {/* Services List */}
      <div className="flex  flex-col w-screen h-fit ">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <section
              key={service.id}
              id={service.title}
              className="bg-white  px-4 py-2  border-b-8 h-screen flex items-center border-gray-500  w-screen"
            >
              <div className="sm:w-2/4">
                <h3
                  className={`${titleBg} w-fit text-2xl font-clashDisplayMedium text-gray-800 mb-4`}
                >
                  {service.title}
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 text-base">
                  {service.description.map((desc, index) => (
                    <li key={index} className={`font-satoshiRegular`}>
                      {desc}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${service.id}`}>
                  <button
                    type="button"
                    className="mt-6 bg-green-500 font-satoshiBold hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </section>
          ))
        ) : (
          <div className="py-16 flex flex-col items-center justify-center h-fit bg-gray-700 text-white text-center">
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
                onClick={() => setServiceInput("")}
              >
                Back to Services
              </button>

              <button
                type="button"
                onClick={() => alert("Error reported to the fun police! 🚓")}
                className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded-full text-lg font-normal transition-transform transform hover:scale-110"
              >
                Report This!
              </button>
            </div>
            <div className="mt-12 ">
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
        )}
      </div>
    </section>
  );
}

export default Services;
