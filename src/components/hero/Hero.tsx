import Link from "next/link";
import "./Hero.css";
import NavigationLinksToSocialMediaProfiles from "../NavigationLinksToSocialMediaProfiles";


function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col md:flex-row-reverse items-center min-h-screen justify-between bg-[aliceblue] py-28  px-6 md:px-10 z-50 "
    >
      {/* Image Section */}
      <div className="justify-self-end z-50">
        <div className=" w-full  md:w-1/2 flex flex-col items-center  lg:items-start z-50">
          <div className="hero-img w-48 z-50 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-t-slate-400 border-b-[#04AF70] border-r-[#04AF70] border-l-[#04AF70] shadow-black shadow-inner"></div>

          {/* Social Icons */}

          <NavigationLinksToSocialMediaProfiles className={`pl-0  lg:pl-24 `} />
        </div>
      </div>
      {/* Text Section */}
      <div className="mt-8 md:mt-0 w-full z-50 md:w-1/2 flex flex-col text-center md:text-left items-center md:items-start">
        <p className="text-lg font-light text-black font-satoshiRegular">
          Hi I am
        </p>
        <span className="text-[#04AF70] font-clashDisplayRegular text-2xl md:text-4xl 2xl:text-5xl">
          Muhammad Zeeshan Khan
        </span>
        <br />
        <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold">
          <span className="block font-satoshiBold text-black">Web App</span>
          <span className="block font-satoshiBold text-black">Developer</span>
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg max-w-lg text-justify font-satoshiRegular">
          Driven by a passion for continuous learning and innovation, I strive
          to create impactful and meaningful solutions. With every step rooted
          in dedication and perseverance, I am committed to delivering
          excellence and shaping a successful future in the ever-evolving tech
          landscape.
        </p>
        <Link href="#contact">
          <button
            type="button"
            className="mt-6 bg-[#04AF70] text-white py-2 px-8 rounded-md hover:bg-[#04af70cb] hover:text-black font-satoshiRegular"
          >
            Hire Me
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
