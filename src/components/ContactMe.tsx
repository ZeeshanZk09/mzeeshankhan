"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";

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
          "service_t46jpx9", // Replace with your service ID
          "template_0wte7wb", // Replace with your template ID
          form.current,
          "fy4iif1-KN8OHGhu6" // Replace with your public key
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
    <section className="py-10 font-satoshiRegular flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold font-clashDisplayRegular text-center text-gray-800">
          Contact Me
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Have questions? Fill out the form below.
        </p>
        <form ref={form} onSubmit={sendEmail} className="mt-6 space-y-4">
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
              className="w-full px-4 py-2 mt-1  border rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              data-has-listeners="true"
              rows={4}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring focus:ring-indigo-300 focus:outline-none"
          >
            Send Email
          </Button>
        </form>
      </div>
    </section>
  );
};
