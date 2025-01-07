import Image from "next/image";
import React from "react";
// JavaScript | TypeScript

// React | Next JS

// Framer Motion and Zustand

// Styling libraries like Tailwind CSS and shadcn UI

// Rest APIs

// State Management libraries like Redux & redux toolkit and Context API & useContext

interface TypeMySkillsList {
  id: number;
  skillName: string;
  range: string;
  pathForImage: string;
  optionalImages: string;
}

const mySkillsList: TypeMySkillsList[] = [
  {
    id: 0,
    skillName: "HTML5 | CSS3",
    range: "w-11/12",
    pathForImage: "/assets/images/skillsSection/html.svg",
    optionalImages: "/assets/images/skillsSection/css.svg",
  },
  {
    id: 1,
    skillName: "JavaScript | TypeScript",
    range: "w-10/12",
    pathForImage: "/assets/images/skillsSection/js.svg",
    optionalImages: "/assets/images/skillsSection/typescript-96.svg",
  },
  {
    id: 2,
    skillName: "React | Next JS",
    range: "w-7/12",
    pathForImage: "/assets/images/skillsSection/react.svg",
    optionalImages: "/assets/images/skillsSection/nextjs.svg",
  },
  {
    id: 3,
    skillName: "Framer Motion and Zustand",
    range: "w-8/12",
    pathForImage: "/assets/images/skillsSection/framer-motion.svg",
    optionalImages: "/assets/images/skillsSection/zustand.svg",
  },
  {
    id: 4,
    skillName: "Styling libraries like Tailwind CSS and shadcn UI",
    range: "w-10/12",
    pathForImage: "/assets/images/skillsSection/tailwindcss.svg",
    optionalImages: "/assets/images/skillsSection/shadcn.png",
  },
  {
    id: 5,
    skillName: "Rest APIs",
    range: "w-3/12",
    pathForImage: "/assets/images/skillsSection/rest-api-100.png",
    optionalImages: "/assets/images/skillsSection/api-100.png",
  },
  {
    id: 6,
    skillName:
      "State Management libraries like Redux & redux toolkit and Context API & useContext",
    range: "w-6/12",
    pathForImage: "/assets/images/skillsSection/redux.svg",
    optionalImages: "/assets/images/skillsSection/react.svg",
  },
];

const SkillsSection = () => {
  return (
    <section className="min-h-screen w-screen h-fit bg-green-100 flex flex-col justify-start gap-10 items-center sm:items-start p-10">
      <h2 className="font-clashDisplayMedium text-3xl sm:text-4xl">
        My Skills:
      </h2>
      <p className="text-justify">
        I have a strong foundation in HTML5, CSS3, and JavaScript. I&apos;ve
        also learned React, React Form, TypeScript, Tailwind CSS, Redux, Redus
        Tool kit & RTK Query, Context API, Advance Data Fetching, REST APIs,
        headless CMS (sanity), Framer Motion, Zustand and Next.js, building
        projects to apply my skills. While I lack formal experience, I&apos;m
        eager to gain practical knowledge and expand into database management.
      </p>
      {/* Skills List */}
      <div className="space-y-4 w-full">
        <h2 className=" text-center sm:text-start font-clashDisplayMedium text-3xl sm:text-4xl">
          Currently Working On:
        </h2>
        <p className="mb-10 text-justify">
          I am currently focused on mastering frontend development skills and
          building hands-on experience in this domain. However, I plan to expand
          my expertise to backend development and database management in the
          future. Once I have a solid foundation in these areas, I aim to
          explore DevOps and delve into the field of artificial intelligence to
          further enhance my skill set and broaden my career opportunities. I am
          at intermediate level in:
        </p>
        {/* Skill Bar 1 */}

        {mySkillsList.map(
          ({ id, skillName, range, pathForImage, optionalImages }) => (
            <div
              key={id}
              className="space-y-3 flex flex-col items-start justify-between"
            >
              <div className="flex items-center gap-2">
                <h4 className=" text-sm sm:text-base text-black">
                  {skillName}
                </h4>
                <Image
                  src={pathForImage}
                  alt={skillName}
                  className="w-5 h-5"
                  width={100}
                  height={100}
                />
                <Image
                  src={optionalImages}
                  alt={skillName}
                  className="w-5 h-5"
                  width={100}
                  height={100}
                />
              </div>
              <div className="w-3/5 sm:w-4/5 relative">
                <div className="h-2 bg-gray-50 rounded-full">
                  <div
                    className={`h-2 bg-[#04AF70] rounded-full ${range}`}
                  ></div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
