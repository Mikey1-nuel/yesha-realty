"use client";
import { useState } from "react";
import "../style/contact.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send formData to an API or service
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="name-container">
        <div className="input-cont name">
          <label htmlFor="firstName" className="label">
            First Name<span>(required)</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-cont name">
          <label htmlFor="lastName" className="label">
            Last Name<span>(required)</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="input-cont">
        <label htmlFor="phone_number" className="label">
          Phone Number<span>(required)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-cont">
        <label htmlFor="email" className="label">
          Email<span>(required)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-cont">
        <label htmlFor="message" className="label">
          Message<span>(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
