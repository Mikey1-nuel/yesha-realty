"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import "../../style/create-property-form.css";

const CreateProperty = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    estate: "",
    landSize: "",
    bedroom: "",
    houseType: "",
    price: "",
    location: "",
    featured: false,
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

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, String(value));
  });

  if (image) {
    data.append("image", image);
  }

  try {
    const res = await fetch("https://yesha-reality-backend-staging.up.railway.app/properties", {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Failed to create property");

    const result = await res.json();
    console.log("Upload result:", result);

    // ✅ Show success toast
    toast.success("Property created successfully!", {
  style: {
    borderRadius: '8px',
    background: '#333',
    color: '#fff',
  },
});

    // ⏳ Wait 1.5 seconds before redirecting
    setTimeout(() => {
      router.push("/page/properties");
    }, 1500);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <main>
      <Navbar />
      <section className="create-property-container">
        <h1>Welcome To Yesha Reality</h1>
        <h2 className="text-2xl font-bold mb-4">Create New Property</h2>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="price" className="label">
            Estate Name
          </label>
          <input name="estate" onChange={handleChange} placeholder="Estate" />

          <label htmlFor="landSize" className="label">
            Land Size
          </label>
          <input
            id="landSize"
            name="landSize"
            type="number"
            onChange={handleChange}
            placeholder="Land Size (eg 100, 150, 200, ...)"
            className="input"
          />

          <label htmlFor="price" className="label">
            Bedroom
          </label>
          <input
            name="bedroom"
            type="number"
            onChange={handleChange}
            placeholder="Bedrooms"
          />

          <label htmlFor="price" className="label">
            House Type
          </label>
          <input
            name="houseType"
            onChange={handleChange}
            placeholder="House Type"
          />

          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={handleChange}
            placeholder="Price (e.g. 1000000, 10000000, ...)"
            className="input"
            required
          />

          <div className="select-option-container">
            <div className="label-select-cont">
              <label htmlFor="location" className="label">
                Location
              </label>
              <select
                id="location"
                name="location"
                className="select"
                required
                onChange={handleChange}
              >
                <option value="">Select Location</option>
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
              <label htmlFor="featured" className="label">
                Featured
              </label>
              <input
                name="featured"
                type="checkbox"
                className="check"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
            </div>
          </div>

          <div className="custom-file-upload">
            <label
              htmlFor="property-image"
              className="upload-button bg-blue-600 py-2 rounded hover:bg-blue-700"
            >
              Choose Property Image
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

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Add Property
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default CreateProperty;
