"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import "../../style/real-estate-agent-registration-form.css";

const AgentRegistration = () => {
  const router = useRouter();
  type AgentFormData = {
    fullName: string;
    email: string;
    phoneNumber: string; // ✅ match backend
    gender: string;
    state: string;
    agency: string;
    experience: string; // ✅ use '0-1', '2-3', '4+'
    password: string;
    confirmPassword: string;
  };

  const [formData, setFormData] = useState<AgentFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    state: "",
    agency: "",
    experience: "",
    password: "",
    confirmPassword: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append("image", image); // ✅ backend expects 'image'
    }

    try {
      const res = await fetch("https://yesha-reality-backend-staging.up.railway.app/agents", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to create agent");

      const result = await res.json();
      console.log("Upload result:", result);

      toast.success("Agent created successfully!", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

      setTimeout(() => {
        router.push("/page/real-estate-agent-registration");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="form-container mx-auto p-6 bg-white rounded shadow">
        <h1>Welcome To Yesha Reality</h1>
        <h2 className="text-2xl font-bold mb-4">Agent Registration</h2>
        <form onSubmit={handleSubmit} className="form space-y-4 max-w-xl">
          <label htmlFor="fullName" className="label">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className="input email"
            onChange={handleChange}
            required
          />

          <label htmlFor="phone" className="label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phoneNumber"
            placeholder="Phone Number (e.g. 08012345678)"
            className="input"
            onChange={handleChange}
            maxLength={11} // ✅ restricts to 11 characters
            pattern="\d{11}" // ✅ ensures only 11 digits
            title="Phone number must be exactly 11 digits"
            required
          />

          <div className="select-option-container">
            <div className="label-select-cont">
              <label htmlFor="gender" className="label">
                Gender
              </label>
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
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="label-select-cont">
              <label htmlFor="state" className="label">
                State
              </label>
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
              <label htmlFor="experience" className="label">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                className="select"
                onChange={handleChange}
                required
              >
                <option value="">Experience Level</option>
                <option value="0-1">0-1 years</option>
                <option value="2-3">2-3 years</option>
                <option value="4+">4+ years</option>
              </select>
            </div>
          </div>

          <label htmlFor="agency" className="label">
            Agency Name (if any)
          </label>
          <input
            id="agency"
            name="agency"
            placeholder="Agency Name (if any)"
            className="input"
            onChange={handleChange}
          />

          <div className="custom-file-upload">
            <label
              htmlFor="property-image"
              className="upload-button bg-blue-600 py-2 rounded hover:bg-blue-700"
            >
              Choose Agent Image
            </label>

            <span className="file-name">
              {image ? image.name : "No file chosen"}
            </span>

            <input
              type="file"
              id="property-image"
              name="property-image"
              className="hidden-file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
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
