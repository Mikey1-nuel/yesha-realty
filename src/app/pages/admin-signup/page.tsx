"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../style/admin-login.css';

export default function AdminSignup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://yesha-reality-backend-staging.up.railway.app/api/admin/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        toast.error(data.error || "Signup failed", {
          style: {
            borderRadius: "8px",
            background: "#ff4d4f",
            color: "#fff",
          },
        });
        return;
      }

      toast.success("Admin account created!", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

      setTimeout(() => {
        router.push("/pages/admin-login");
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setError(message);
      toast.error(message, {
        style: {
          borderRadius: "8px",
          background: "#ff4d4f",
          color: "#fff",
        },
      });
    }
  };

  return (
    <section className="sign-in-cont">
      <div className="signinform">
        <h1>yesha reality Admin Signup</h1>
        <form className="form space-y-4 max-w-xl" onSubmit={handleSignup}>
          <label htmlFor="email" className="label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            autoComplete="off"
            className="input email"
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="input password"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>

          <div className="already-account">
            <p>Already have an account?</p>
            <a href="/admin/login">Login</a>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
