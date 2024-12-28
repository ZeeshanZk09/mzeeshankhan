"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

declare module "@emailjs/browser" {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement,
    userID: string
  ): Promise<EmailJSResponseStatus>;
}

export const ContactMe = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current && form.current.checkValidity()) {
      emailjs
        .sendForm(
          "service_t46jpx9",
          "template_0wte7wb",
          form.current,
          "fy4iif1-KN8OHGhu6"
        )
        .then(
          () => {
            alert("Email sent successfully!");
          },
          (error: Error) => {
            alert("Failed to send email. Please try again later.");
            console.error("FAILED...", error.message);
          }
        );
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <section
      id="contact"
      className="py-10 px-6 font-satoshiRegular flex flex-col lg:flex-row items-center gap-20  sm:justify-between min-h-screen bg-gray-50"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="sr-only">
        Contact Me
      </h2>
      <div className="flex flex-col h-screen justify-between ">
        <div className="flex  sm:items-center gap-10">
          <Image
            src={`/assets/images/MZeeshanKhan.jpeg`}
            alt="MZeeshanKhan"
            className="clipped rounded-full w-20 h-20 sm:w-48 sm:h-48 object-cover"
            width={1000}
            height={1000}
            role="img"
            aria-label="MZeeshan Khan"
          />
          <h2 className="font-clashDisplayExtraLight sm:text-2xl tracking-widest w-8/12 ">
            Wan&apos;na discuss any project or just say Hi, My inbox is open for
            everyone.
          </h2>
        </div>
        <div className="h-fit space-y-2">
          <h2 className="text-2xl font-satoshiBold tracking-wide">
            Contact Details:
          </h2>
          <section className="flex flex-col space-y-4">
            <div className="flex flex-col  items-start gap-4">
              <h3 className="font-satoshiRegular tracking-wide mr-4">Email:</h3>
              <div className="flex items-center gap-2">
                <Image
                  src={`/assets/images/contact/email.svg`}
                  width={100}
                  height={100}
                  alt="Email icon"
                  className="object-cover rounded-full w-10 h-10"
                  role="img"
                  aria-label="Email icon"
                />
                <Link
                  href={`mailto:mzeeshankhan0988@gmail.com`}
                  className=" text-blue-600"
                  aria-label="Send an email to MZeeshan Khan"
                >
                  mzeeshankhan0988@gmail.com
                </Link>
              </div>
            </div>
            {[
              {
                index: 0,
                label: "+92 337 8568671",
                name: "Whatsapp:",
                path: "/assets/images/contact/whatsapp.svg",
              },
              {
                index: 1,
                label: "+92 329 2564066",
                name: "Phone:",
                path: "/assets/images/contact/phone.svg",
              },
            ].map(({ label, path, index, name }) => (
              <div key={index} className="flex flex-col items-start gap-4">
                <h3 className="font-satoshiRegular tracking-wide ">{name}</h3>
                <div className="flex items-center gap-2">
                  <Image
                    src={path}
                    width={100}
                    height={100}
                    alt="MZeeshanKhan"
                    className="  w-10 h-10"
                  />
                  <Link href={path} className=" text-black">
                    {label}
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className="h-fit min-h-screen w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold font-clashDisplayRegular text-center text-gray-800">
          Direct Message
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Have questions? Fill out the form below.
        </p>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col mt-6 space-y-4"
        >
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="from_name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              data-has-listeners="true"
              spellCheck="false"
              data-ms-editor="true"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="from_email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              data-has-listeners="true"
              spellCheck="false"
              data-ms-editor="true"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Enter your message"
              className="w-full h-[200px] px-4 py-2 mt-1  border rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              data-has-listeners="true"
              spellCheck="false"
              data-ms-editor="true"
              rows={4}
              required
            />
          </div>
          <Button
            type="submit"
            className="px-2 w-full py-10 text-[#f0f0f0] bg-[#047856] rounded-lg hover:bg-[#04663d] hover:text-white focus:ring focus:ring-green-300 outline-none border-none"
          >
            Send Email
          </Button>
        </form>
      </div>
    </section>
  );
};
