"use client";
import React, { useState } from "react";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import "../../style/real-estate-agent-registration-form.css";

const AgentRegistration = () => {
  type AgentFormData = {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    state: string;
    agency: string;
    experience: string;
    profilePic: File | null;
    password: string;
    confirmPassword: string;
  };
  const [formData, setFormData] = useState<AgentFormData>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    agency: "",
    experience: "",
    profilePic: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as any;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Submit to API or backend logic here
    console.log(formData);
  };

  return (
    <main>
      <Navbar />
      <div className="form-container mx-auto p-6 bg-white rounded shadow">
        <h1>Welcome To Yesha Reality</h1>
        <h2 className="text-2xl font-bold mb-4">Agent Registration</h2>
        <form onSubmit={handleSubmit} className="form space-y-4 max-w-xl">
          <label htmlFor="fullName" className="label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className="input"
            onChange={handleChange}
            required
          />

          <label htmlFor="phone" className="label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number (e.g. 08012345678)"
            className="input"
            onChange={handleChange}
            required
          />

          <div className="select-option-container">
            <div className="label-select-cont">
              <label htmlFor="gender" className="label">Gender</label>
              <select
                id="gender"
                name="gender"
                className="select"
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="label-select-cont">
              <label htmlFor="state" className="label">State</label>
              <select
                id="state"
                name="state"
                className="select"
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {/* State options unchanged */}
                {[
                  "Abia",
                  "Adamawa",
                  "Akwa Ibom",
                  "Anambra",
                  "Bauchi",
                  "Bayelsa",
                  "Benue",
                  "Borno",
                  "Cross River",
                  "Delta",
                  "Ebonyi",
                  "Edo",
                  "Ekiti",
                  "Enugu",
                  "FCT - Abuja",
                  "Gombe",
                  "Imo",
                  "Jigawa",
                  "Kaduna",
                  "Kano",
                  "Katsina",
                  "Kebbi",
                  "Kogi",
                  "Kwara",
                  "Lagos",
                  "Nasarawa",
                  "Niger",
                  "Ogun",
                  "Ondo",
                  "Osun",
                  "Oyo",
                  "Plateau",
                  "Rivers",
                  "Sokoto",
                  "Taraba",
                  "Yobe",
                  "Zamfara",
                ].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="label-select-cont">
              <label htmlFor="experience" className="label">Experience Level</label>
              <select
                id="experience"
                name="experience"
                className="select"
                onChange={handleChange}
                required
              >
                <option value="">Experience Level</option>
                <option value="0-1 year">0-1 year</option>
                <option value="2-3 years">2-3 years</option>
                <option value="4+ years">4+ years</option>
              </select>
            </div>
          </div>

          <label htmlFor="agency" className="label">Agency Name (if any)</label>
          <input
            id="agency"
            name="agency"
            placeholder="Agency Name (if any)"
            className="input"
            onChange={handleChange}
          />

          <div className="custom-file-upload">
            <label htmlFor="profilePic" className="upload-button">
              Choose Profile Picture
            </label>
            <span className="file-name">
              {formData.profilePic
                ? formData.profilePic.name
                : "No file chosen"}
            </span>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              className="hidden-file-input"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default AgentRegistration;
