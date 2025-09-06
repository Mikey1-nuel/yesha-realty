import React, { useState, ChangeEvent } from "react";
import "../../style/lead-capture-form.css";

export default function LeadCaptureForm() {
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
    <section className="lead-form">
      {" "}
      <h2>Let’s Help You Find Your Dream Home</h2>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          name="firstName"
          placeholder="Name"
          onChange={handleChange}
          required
        />{" "}
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />{" "}
        <input
          type="text"
          name="message"
          placeholder="Property Interest"
          onChange={handleChange}
        />{" "}
        <button type="submit">Submit</button>{" "}
      </form>{" "}
      <p className="promise">We’ll get back to you within 24 hours.</p>{" "}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button className="btn-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
