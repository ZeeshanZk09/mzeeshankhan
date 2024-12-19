import React from "react";
import "./About.css";

function About() {
  return (
    <section
      id="about"
      className="flex flex-col min-h-screen md:flex-row justify-between  py-24 px-6 "
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2  flex justify-start">
        <div className="about-img w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-t-slate-400 border-b-[#04AF70] border-r-[#04AF70] border-l-[#04AF70] shadow-black shadow-inner"></div>
      </div>

      {/* Text and Skill Bars Section */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl mb-4 text-black">
          About Me
        </h2>
        <p className="text-gray-600 mb-6 text-justify">
          Hello! I’m Zeeshan Khan, a passionate and self-motivated web developer
          based in Karachi, Pakistan. With a strong foundation in programming
          and a keen interest in AI, I specialize in creating modern,
          responsive, and user-friendly web solutions. My expertise lies in
          HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS. I
          am the founder of Zebotix, a growing software agency, and
          Apna Campus, an educational platform designed to empower learners with
          cutting-edge tech skills. My journey from a pre-medical background to
          the tech industry reflects my adaptability and determination to
          explore new horizons. I bring a unique perspective and problem-solving
          mindset to my work, always seeking to deliver impactful results. In
          addition to my technical skills, I’m an enthusiastic teacher who
          believes in the power of sharing knowledge. I’m dedicated to not only
          building innovative solutions but also mentoring others to achieve
          their goals.  
        </p>
        <hr />
        <p><br /> Let’s create something amazing together! 🚀</p>
        {/* Skills List */}
        <div className="space-y-4">
          {/* Skill Bar 1 */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm sm:text-base text-black">
              UX
            </span>
            <div className="w-3/5 sm:w-4/5 relative">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-[#04AF70] rounded-full w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Skill Bar 2 */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm sm:text-base text-black">
              Website Design
            </span>
            <div className="w-3/5 sm:w-4/5 relative">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-[#04AF70] rounded-full w-3/5"></div>
              </div>
            </div>
          </div>

          {/* Skill Bar 3 */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm sm:text-base text-black">
              App Design
            </span>
            <div className="w-3/5 sm:w-4/5 relative">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-[#04AF70] rounded-full w-2/5"></div>
              </div>
            </div>
          </div>

          {/* Skill Bar 4 */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm sm:text-base text-black">
              Graphic Design
            </span>
            <div className="w-3/5 sm:w-4/5 relative">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-[#04AF70] rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
