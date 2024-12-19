import React, { useState } from 'react';
import { send } from "@emailjs/browser";

function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send("service_d93pp0s", "template_z11bnvr", formData, "46sK-QU3f560s8ibF").then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");
      },
      (err) => {
        console.log("FAILED...", err);
        alert("Failed to send the message, please try again.");
      }
    );
  };

  return (
    <div
      id="contact"
      className="h-screen flex flex-col justify-center items-center p-5"
    >
      <h2 className="text-4xl mb-4">Contact Us</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          value={formData.name}
          className="mb-2 p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          value={formData.email}
          className="mb-2 p-2 w-full"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          onChange={handleChange}
          value={formData.message}
          className="mb-2 p-2 w-full h-40"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactMe;
