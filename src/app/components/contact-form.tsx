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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://yesha-reality-backend-staging.up.railway.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalMessage(
          "✅ Message Sent! Thank you for reaching out. Our team will contact you shortly."
        );
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setModalMessage("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setModalMessage("⚠️ Server error. Please try again later.");
    }

    setShowModal(true); // Always show modal
  };

  return (
    <>
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
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button className="btn-close" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
