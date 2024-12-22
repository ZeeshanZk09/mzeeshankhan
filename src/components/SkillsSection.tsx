import React from "react";

const SkillsSection = () => {
  return (
    <section className="w-screen h-fit bg-green-100 flex flex-col justify-start gap-10 items-center sm:items-start p-10">
      <h2 className="font-clashDisplayMedium text-3xl sm:text-4xl">
        My Skills:
      </h2>
      <p className="text-justify">
        I have a strong command of modern web development technologies,
        including HTML, CSS, JavaScript, and frameworks like React and Next.js.
        My expertise also extends to styling tools like Tailwind CSS and backend
        technologies such as Node.js. These skills allow me to build responsive,
        dynamic, and user-friendly websites and applications tailored to client
        needs.
      </p>
      {/* Skills List */}
      <div className="space-y-4 w-full">
        <h2 className="mb-10 text-center sm:text-start font-clashDisplayMedium text-3xl sm:text-4xl">Currently Working On:</h2>
        {/* Skill Bar 1 */}
        <div className="flex items-center justify-between">
          <span className="font-satoshiRegular text-sm sm:text-base text-black">
            UX
          </span>
          <div className="w-3/5 sm:w-4/5 relative">
            <div className="h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-[#04AF70] rounded-full w-1/5"></div>
            </div>
          </div>
        </div>

        {/* Skill Bar 2 */}
        <div className="flex items-center justify-between">
          <span className="font-satoshiRegular text-sm sm:text-base text-black">
            Website Design
          </span>
          <div className="w-3/5 sm:w-4/5 relative">
            <div className="h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-[#04AF70] rounded-full w-9/12"></div>
            </div>
          </div>
        </div>

        {/* Skill Bar 3 */}
        <div className="flex items-center justify-between">
          <span className="font-satoshiRegular text-sm sm:text-base text-black">
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
          <span className="font-satoshiRegular text-sm sm:text-base text-black">
            Graphic Design
          </span>
          <div className="w-3/5 sm:w-4/5 relative">
            <div className="h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-[#04AF70] rounded-full w-2/4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
