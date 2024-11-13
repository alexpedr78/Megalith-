// src/Pages/AuthPage/AuthPage.js
import React, { useState, useEffect } from "react";
import { auth } from "../../../firebaseConfig.js"; // Firebase configuration
import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage.jsx"; // Import login component
import SignupPage from "../SignupPage/SignupPage.jsx"; // Import signup component if needed
import { onAuthStateChanged } from "firebase/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to home if already logged in
      }
    });
    return unsubscribe;
  }, [navigate]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      {isLogin ? (
        <>
          <LoginPage /> {/* Show Login component */}
          <p>
            Don't have an account?{" "}
            <button onClick={toggleAuthMode}>Sign up</button>
          </p>
        </>
      ) : (
        <>
          <SignupPage /> {/* Show Signup component if you have one */}
          <p>
            Already have an account?{" "}
            <button onClick={toggleAuthMode}>Log in</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
