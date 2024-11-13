// src/Pages/AuthPage/SignupPage.js
import React, { useState } from "react";
import { auth } from "../../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Set loading state

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setLoading(false);
      // Optionally redirect after a short delay
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      // Display Firebase error message
      setError(error.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>Signup successful! Redirecting...</p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
