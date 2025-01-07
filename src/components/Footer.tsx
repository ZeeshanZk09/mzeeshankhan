import React from "react";
import NavigationLinksToSocialMediaProfiles from "./NavigationLinksToSocialMediaProfiles";
import QuickLinks from "./QuickLinks";

type TypePersonalInfo = {
  [key: string]: string | number;
};

const personalInfo: TypePersonalInfo = {
  "Father’s Name": "M. Tariq Hameed Khan",
  Nationality: "Pakistani",
  "Year of Birth": 2006,
  "Marital Status": "Single 😉",
};

function Footer() {
  return (
    <footer className="bg-gray-100  flex flex-col items-center  overflow-x-hidden w-screen  h-fit    text-black ">
      {/* Logo and navigation */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-center px-5 sm:px-10 my-5">
        <div className="flex flex-col  h-fit w-fit   gap-10">
          <h2 className="font-clashDisplayRegular text-4xl ">M Zeeshan Khan</h2>
          <div>
            <h2 className="font-clashDisplayMedium text-xl tracking-widest">
              Quick links:
            </h2>
            <QuickLinks
              navClassName={`w-full`}
              ulClassName={`  flex-col sm:flex-row sm:space-x-4`}
              liClassName={`ml-5 sm:ml-0 `}
            />
          </div>
          {/* Social media links */}
          <div>
            <h2 className="font-clashDisplayMedium text-xl tracking-widest">
              Social Media Links:
            </h2>
            <NavigationLinksToSocialMediaProfiles className={``} />
          </div>
        </div>
        <div className="justify-self-start">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2451235548953!2d66.9519876!3d24.9274375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36ad4d158c57d%3A0xb05866a6f625d64d!2sMadina%20colony%20Police%20Station!5e0!3m2!1sen!2s!4v1709734692376!5m2!1sen!2s"
            title="My Location"
            width="400"
            height="280"
            className="border-0 w-[200px] h-[180px] sm:w-[300px] sm:h-[200px] lg:w-[400px] lg:h-[280px]"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col w-screen items-start px-5 sm:px-10 my-5 gap-4">
        <h2 className="font-clashDisplayMedium text-xl tracking-widest">
          Personal Information:
        </h2>
        <ul className="w-full">
          {Object.entries(personalInfo).map(([key, value]) => (
            <li key={key} className="flex justify-between border-b pb-2">
              <span className="font-satoshiRegular">{key}</span>
              <span className="font-satoshiRegular">{value}</span>
            </li>
          ))}
        </ul>
        <h2 className="font-clashDisplayMedium text-xl tracking-widest">
          Address:
        </h2>
        <p className="font-satoshiRegular">
          Police Flats/ Block B/ Flat #3, Sindh, Karachi - Baldia Town,
          Saeedabad, behind police station
        </p>
      </div>
      {/* Copyright text */}
      <div className="bg-gray-800 w-full py-4">
        <p className="text-center font-satoshiRegular  text-gray-100 text-lg">
          © 2023 <span className="text-green-300">Muhammad Zeeshan Khan</span>.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
