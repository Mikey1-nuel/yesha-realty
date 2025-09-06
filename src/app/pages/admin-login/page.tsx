"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/admin-login.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  type SignInFormData = {
    email: string;
    password: string;
  };

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://yesha-reality-backend-staging.up.railway.app/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("userRole", "admin");
      toast.success("Signed in successfully!", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        router.push("/properties");
      }, 1500);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid credentials or expired token.";
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
        <h1>yesha reality admin login</h1>
        <form className="form space-y-4 max-w-xl" onSubmit={handleLogin}>
          <label htmlFor="email" className="label">
            Email Address
          </label>
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

          <label htmlFor="password" className="label">
            Password
          </label>
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
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>

          <div className="no-account">
            <p>Don't have an account?</p>
            <a href="/pages/admin-signup">Sign Up</a>
          </div>

          <div className="forget-password">
            <p>Forgot Password?</p>
            <a href="/forgot-password">Click Here</a>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
