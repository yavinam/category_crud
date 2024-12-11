import { request } from "@/api";
import React from "react";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/token-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let user = Object.fromEntries(formData);

    request.post("/auth/signup-admin", user).then((res) => {
      console.log(res);
      dispatch(signIn(res.data.access_token));
      navigate("/admin");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <input
            className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            type="password"
            name="password"
            placeholder="Create a password"
          />
          <input
            className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            type="password"
            name="confirm_password"
            placeholder="Confirm your password"
          />
          <button
            className="w-full p-3 text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
